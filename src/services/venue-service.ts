import EventEmitter from 'events';
import { Venue } from '@/models/venue-model';
import ApiService from '@/services/api-service';
import { GeoJsonVenue } from '@/models/geojson-feature';

const API_URI = process.env.VUE_APP_STMBL_API_URI;
const TOKEN = 'dsw_user_token';
const VISITED = 'dsw_visited';

interface Checkin {
  venueId: string;
  latitude: string;
  longitude: string;
}

/**
 * Default Venue values, to overwrite just set the property.
 */
export const DEFAULT_VENUE: Venue = {
  id: '0',
  address: '',
  address_2: '',
  city: '',
  state: '',
  zip_code: '',
  employees: 0,
  crawl_day: 0,
  name: 'Page Unavailable',
  latitude: '39.758117', // default to skookum coordinates
  longitude: '-104.989888', // default to skookum coordinates
  geoRadius: 50,
  company_img_url: require('../images/company-images/emptyVenue.jpeg'),
  website: 'https://www.google.com/',
  description: 'no venue selected',
  spec_instructions: '',
  features: '',
};

class VenuesService extends EventEmitter {
  public apiSvc = new ApiService();

  // Get List of Venues and their detail, to be stored on front end
  public getAllVenues = async (): Promise<Venue[]> => {
    return await this.apiSvc.getAllVenues();
  }

  /**
   * Get the user's visited venues
   * If visitedVenues is null check localStorage else call API
   * Intended to reduce API calls to the server
   */
  public getVisitedVenues = async () => {
    const store = JSON.parse(localStorage.getItem(VISITED) || '{}');
    const stale = Math.floor(new Date().getTime() / 1000) - 600; // 5 mins old

    if (store.timestamp && store.timestamp >= stale) {
      return store.venues;
    } else {
      return this.updateVisitedVenues();
    }
  }

  /**
   * Fetch and return visited venues for user from API
   * Create store in localStorage for reference
   */
  public updateVisitedVenues = async () => {
    const request = (await fetch(API_URI + '/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      },
    }).then((res) => res.json())
      .then((res) => {
        const store = {
          timestamp: Math.floor(new Date().getTime() / 1000),
          venues: res.data.attributes.visited_venues,
        };

        localStorage.setItem(VISITED, JSON.stringify(store));

        return res.data.attributes.visited_venues;
      }));

    return request;
  }

  /**
   * Convert data structure for Mapbox to digest
   */
  public getAllVenuesAsGeoJSON = async (allVenues: Venue[]): Promise<{ type: string; features: GeoJsonVenue[] }> => {
    const features: GeoJsonVenue[] = [];

    if (allVenues.length) {
      allVenues.forEach((venue: Venue) => {
        const formattedVenue = {
          id: venue.id!,
          geojson: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [Number(venue.longitude), Number(venue.latitude)],
            },
            properties: {
              title: venue.name,
              description: venue.address,
            },
          },
        };

        features.push(formattedVenue);
      });
    }

    return {
      type: 'FeatureCollection',
      features,
    };
  }

  /**
   * Checkin to discovered venue then renew user's visited venues
   */
  public checkin = async (checkin: Checkin) => {
    const { longitude, latitude } = checkin;
    const payload = {
      data: {
        attributes: {
          lat: parseFloat(latitude),
          lng: parseFloat(longitude),
        },
      },
    };
    const response = await fetch(`${API_URI}/locations/${checkin.venueId}/check_ins`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 201) {
      const updated = await this.updateVisitedVenues();
      this.emit('visitedVenuesUpdated', updated);
      return true;
    } else {
      return false;
    }
  }
}

export default new VenuesService();
