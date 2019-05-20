export interface Venue {
  Id: number;
  name: string;
  url: string;
  companyImage: ImageBitmap;
  mapIcon: ImageBitmap;

  address: string;
  // Manually convert coordinates using google maps
  latitude: number;
  longitude: number;
}

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

export const emptyVenue = {
  Id: 0,
  name: 'Page Unavailable ',
  address: '',
  latitude: 0,
  longitude: 0,
  url: '',
  mapIcon: require('../images/map-icons/signpost-map-icon.svg'),
  companyImage: require('../images/company-images/emptyVenue.jpeg'),
  description: '',
};
export class VenuesService  {
  public venues = [
    {
      Id: 1,
      name: 'Signpost',
      address: '2363 Blake St',
      latitude: 39.758117,
      longitude: -104.989888,
      url: 'https://skookum.com/',
      mapIcon: require('../images/map-icons/signpost-map-icon.svg'),
      companyImage: require('../images/company-images/skookum.png'),
      description: `
      Signpost is a smart CRM that helps businesses to know, grow, and strengthen their local
      customer base. Mia automatically collects and analyzes consumer data from every touchpoint,
      including email, calls and transactions.
      `,
    },
    {
      Id: 2,
      name: 'Skookum',
      address: '1801 California St.',
      latitude: 39.74767,
      longitude: -104.98982,
      url: 'https://skookum.com/',
      mapIcon: require('../images/map-icons/skookum-map-icon.svg'),
      companyImage: require('../images/company-images/skookum.png'),
      description: `
      Signpost is a smart CRM that helps businesses to know, grow, and strengthen their local
      customer base. Mia automatically collects and analyzes consumer data from every touchpoint,
      including email, calls and transactions.
      `,
    },
    {
      Id: 3,
      name: 'Super long startup name that doesnt fit on the screen in one line',
      address: '2120 Market St.',
      latitude: 39.7545,
      longitude: -104.99217,
      url: 'https://skookum.com/',
      mapIcon: require('../images/map-icons/supperLongName-map-icon.svg'),
      companyImage: require('../images/company-images/skookum.png'),
      description: `
      Signpost is a smart CRM that helps businesses to know, grow, and strengthen their local
      customer base. Mia automatically collects and analyzes consumer data from every touchpoint,
      including email, calls and transactions.
      `,
    },
    {
      Id: 4,
      name: 'Marketo',
      address: '707 17th St.',
      latitude: 39.7471025,
      longitude: -104.9907957,
      url: 'https://skookum.com/',
      mapIcon: require('../images/map-icons/supperLongName-map-icon.svg'),
      companyImage: require('../images/company-images/skookum.png'),
      description: `
      Signpost is a smart CRM that helps businesses to know, grow, and strengthen their local
      customer base. Mia automatically collects and analyzes consumer data from every touchpoint,
      including email, calls and transactions.
      `,
    },
    {
      Id: 5,
      name: 'Gusto',
      address: '1201 16th St',
      latitude: 39.7491778,
      longitude: -104.9968469,
      url: 'https://skookum.com/',
      mapIcon: require('../images/map-icons/supperLongName-map-icon.svg'),
      companyImage: require('../images/company-images/skookum.png'),
      description: `
      Signpost is a smart CRM that helps businesses to know, grow, and strengthen their local
      customer base. Mia automatically collects and analyzes consumer data from every touchpoint,
      including email, calls and transactions.
      `,
    },
    {
      Id: 6,
      name: 'WeWork',
      address: '2420 17th St, Denver, CO 80202',
      latitude: 39.7586051,
      longitude: -105.0074086,
      url: 'https://skookum.com/',
      mapIcon: require('../images/map-icons/supperLongName-map-icon.svg'),
      companyImage: require('../images/company-images/skookum.png'),
      description: `
      Signpost is a smart CRM that helps businesses to know, grow, and strengthen their local
      customer base. Mia automatically collects and analyzes consumer data from every touchpoint,
      including email, calls and transactions.
      `,
    },
    {
      Id: 7,
      name: 'Wurk',
      address: '2162 Market St.',
      latitude: 39.755166,
      longitude: -104.990956,
      url: 'https://skookum.com/',
      mapIcon: require('../images/map-icons/supperLongName-map-icon.svg'),
      companyImage: require('../images/company-images/skookum.png'),
      description: `
      Signpost is a smart CRM that helps businesses to know, grow, and strengthen their local
      customer base. Mia automatically collects and analyzes consumer data from every touchpoint,
      including email, calls and transactions.
      `,
    },
  ];

  public getAllVenues = () => this.venues;

  public getSelectedVenue = (Id: number): Venue => {
    const venue = this.venues.find((v) => v.Id === Id);

    if (venue) {
      return venue;
    }
    return emptyVenue;
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
