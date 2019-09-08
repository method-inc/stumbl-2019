import { Venue } from '@/models/venue-model';
import { User } from '@/models/user-model';

const defaultUser = {
  id: 0,
  created_at: '',
  email: '',
  name: '',
  password: '',
  visited_venues: [],
};

const API_URI = process.env.VUE_APP_STMBL_API_URI;
const EVENT_ID = process.env.VUE_APP_DSW_CRAWL_EVENT_ID;

export default class ApiService {
  public venues: Venue[] = [];
  public user: User = { ...defaultUser };

  /**
   * Request existing user's data.
   * If no existing user, creates new user.
   */
  public getUserData = async (email: string) => {
    const hasCachedUser = this.user.id !== 0;

    if (hasCachedUser) {
      return this.getCachedUser();
    } else {
      // TODO: Connect this to the API route
      const response = await fetch(API_URI + '/me');
      const data = await response.json();

      this.user = { ...data };
      return this.user;
    }
  }

  /**
   * Gets array of venues and their detail
   */
  public getAllVenues = async (): Promise<Venue[]> => {
    const hasCachedVenues = this.venues.length;

    if (hasCachedVenues) {
      return await this.getCachedVenues();
    } else {
      try {
        // TODO: Connect this to API route
        const response = await fetch(`${API_URI}/events/${EVENT_ID}/locations`);

        const json = await response.json();
        const data = json.data.map((entry: any) => entry.attributes) as Venue[];

        this.venues = data;

        return this.venues;
      } catch (error) {
        return error;
      }
    }
  }

  /**
   * Returns a single venue's detail
   *
   * @param id number
   */
  public getVenueById = async (id: string) => {
    const noCachedVenues = this.venues.length === 0;

    if (noCachedVenues) {
      await this.getAllVenues();
    }
    const matchingVenue = this.venues.find((venue) => venue.id === id);

    return matchingVenue;
  }

  /**
   * Add new venue from admin form
   */
  public addNewVenue = async (venue: Venue) => {
    // TODO: Connect this to the API route
    //
    // Docs on uploading multiple files (for venue images):
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Uploading_multiple_files

    try {
      const response = await fetch('url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(venue),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  /**
   * Add new venue from admin form
   */
  public updateVenue = async (venue: Venue) => {
    // TODO: Connect this to the API route
    //
    // Docs on uploading multiple files (for venue images):
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Uploading_multiple_files

    try {
      const response = await fetch('url', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(venue),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  public markVenueVisited = async (id: number) => {
    const alreadyVisitedVenue = this.user.visited_venues.find((venueId) => {
      return venueId === id;
    });

    if (!alreadyVisitedVenue) {
      // Add the venue to the front end immediately
      this.user.visited_venues.push(id);

      try {
        const response = await fetch('url');
        const data = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    }
  }

  /**
   * Returns array of cached venues to prevent redundant requests.
   */
  private getCachedVenues = (): Venue[] => {
    return this.venues;
  }

  /**
   * Returns cached user to prevent redundant requests
   */
  private getCachedUser = (): User => {
    return this.user;
  }
}
