interface Venue {
  Id: number;
  name: string;
  address: string;
  url: string;
  mapIcon: ImageData;
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
      url: 'www.skookum.com',
      mapIcon: require('../images/map-icons/signpost-map-icon.svg'),
    },
    {
      Id: 2,
      name: 'Skookum',
      address: '1801 California St.',
      url: 'www.skookum.com',
      mapIcon: require('../images/map-icons/skookum-map-icon.svg'),
    },
    {
      Id: 3,
      name: 'Super long startup name that doesnt fit on the screen in one line',
      address: '2120 Market St.',
      url: 'www.skookum.com',
      mapIcon: require('../images/map-icons/supperLongName-map-icon.svg'),
    },
  ];

public getAllVenues = () => this.venues;

public getSelectedVenue = (Id: number) => this.venues.find((venue) => venue.Id === Id);

}
