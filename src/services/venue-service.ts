import { Venue } from '@/models/venue-model';
import ApiService from '@/services/api-service';
import { GeoJsonVenue } from '@/models/geojson-feature';

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

export class VenuesService {
  public apiSvc = new ApiService();

  // visitedVenues is an array of venue IDs
  public visitedVenues: string[] = ['1'];
  public venues: Venue[] = [];

  // Get List of Venues and their detail, to be stored on front end
  public getAllVenues = async (): Promise<Venue[]> => {
    const response = await this.apiSvc.getAllVenues();
    this.venues = response;

    return this.venues;
  }

  public getSelectedVenue = (Id: string): Venue => {
    const venue = this.venues.find((v) => v.id === Id);

    if (venue) {
      return venue;
    }
    return DEFAULT_VENUE;
  }

  public getAllVenuesAsGeoJSON = async (): Promise<{type: string; features: GeoJsonVenue[]}> => {
    const unformattedVenues = await this.getAllVenues();
    const features: GeoJsonVenue[] = [];

    if (unformattedVenues.length) {
      unformattedVenues.forEach((venue: Venue) => {
        const formattedVenue = {
          id: venue.id!,
          geojson: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [ Number(venue.longitude), Number(venue.latitude) ],
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
}
