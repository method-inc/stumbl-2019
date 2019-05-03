interface Venue {
  Id: number;
  name: string;
  address: string;
  url: string;
  companyImage: ImageBitmap;
  mapIcon: ImageBitmap;
}

interface VenuesService {
  venues: Venue[];
  getAllVenues: () => Venue[];
  // getSelectedVenue: () => Venue;
}

export default class Venues implements VenuesService {
  public venues = [
    {
      Id: 1,
      name: 'Signpost',
      address: '2363 Blake St',
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

public getSelectedVenue = (Id: number) => this.venues.find((venue) => venue.Id === Id);

}
