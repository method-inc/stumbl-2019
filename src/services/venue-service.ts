import { Venue } from '@/models/venue-model';

export interface GeoJsonFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    title: string;
    description: string;
  };
}

/**
 * Default Venue values, to overwrite just set the property.
 */
const DEFAULT_VENUE: Venue = {
  id: -1,
  address: '',
  name: 'Page Unavailable',
  latitude: 39.758117, // default to skookum coordinates
  longitude: -104.989888, // default to skookum coordinates
  geoRadius: 50,
  companyImage: require('../images/company-images/emptyVenue.jpeg'),
  url: 'https://www.google.com/',
  description: `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac quam
  lacinia, egestas libero vel, dictum eros. Etiam ut leo quis diam congue elementum
  et non mi. Maecenas ut ante ut ante rhoncus tincidunt vitae sit amet quam.
  `,
};

export class VenuesService {
  public venues = [
    {
      ...DEFAULT_VENUE,
      Id: 1,
      name: 'Signpost',
      address: '2363 Blake St',
      description: `
      Signpost is a smart CRM that helps businesses to know, grow, and strengthen their local
      customer base. Mia automatically collects and analyzes consumer data from every touchpoint,
      including email, calls and transactions.
      `,
    },
    {
      ...DEFAULT_VENUE,
      Id: 2,
      name: 'Skookum',
      address: '1801 California St.',
      latitude: 39.74767,
      longitude: -104.98982,
      url: 'https://skookum.com/',
      companyImage: require('../images/company-images/skookum.png'),
      description: `
      Skookum is a diverse team of engineers, designers, and strategists passionate about
      solving complex business problems.
      `,
    },
    {
      ...DEFAULT_VENUE,
      Id: 3,
      name: 'Super long startup name that doesnt fit on the screen in one line',
      address: '2120 Market St.',
    },
    {
      ...DEFAULT_VENUE,
      Id: 4,
      name: 'Marketo',
      address: '707 17th St.',
    },
    {
      ...DEFAULT_VENUE,
      Id: 5,
      name: 'Gusto',
      address: '1201 16th St',
    },
    {
      ...DEFAULT_VENUE,
      Id: 6,
      name: 'WeWork',
      address: '2420 17th St, Denver, CO 80202',
    },
    {
      ...DEFAULT_VENUE,
      Id: 7,
      name: 'Wurk',
      address: '2162 Market St.',
    },
  ];

  public getAllVenues = () => this.venues;

  public getSelectedVenue = (Id: number): Venue => {
    const venue = this.venues.find((v) => v.Id === Id);

    if (venue) {
      return venue;
    }
    return DEFAULT_VENUE;
  }

  public getAllVenuesAsGeoJSON = () => {
    const features: GeoJsonFeature[] = [];
    const unformattedVenues = this.getAllVenues();

    unformattedVenues.forEach((venue) => {
      const formattedVenue = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            venue.longitude,
            venue.latitude,
          ],
        },
        properties: {
          title: venue.name,
          description: venue.address,
        },
      };

      features.push(formattedVenue);
    });

    return ({
      type: 'FeatureCollection',
      features,
    });
  }

}
