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
      latitude: 39.758120,
      longitude: -104.989890,
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
      latitude: 39.747340,
      longitude: -104.989910,
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
      latitude: 39.747650,
      longitude: -105.002670,
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

    const blankFeature = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0, 0],
      },
      properties: {
        title: '',
        description: '',
      },
    };

    unformattedVenues.forEach((venue) => {
      const formattedVenue = {...blankFeature};

      formattedVenue.geometry.coordinates[0] = venue.longitude;
      formattedVenue.geometry.coordinates[1] = venue.latitude;

      formattedVenue.properties.title = venue.name;
      formattedVenue.properties.description = venue.address;

      features.push(formattedVenue);
    });

    return ({
      type: 'FeatureCollection',
      features,
    });
  }

}
