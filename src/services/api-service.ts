export interface Venue {
  id?: number;
  name: string;
  address: string;
  address_2: string;
  city: string;
  state: string;
  zip_code: string;
  latitude: string;
  longitude: string;
  website: string;
  description: string;
  links: Array<{ label: string; url: string }>; // array of links they can show on their venue detail
  company_img_url: string;
  logo_img_url: string;
  created_at?: string; // timestamp
  updated_at?: string; // timestamp
}

export interface User {
  id: number;
  created_at: string;
  email: string;
  name: string;
  password: string;
  visited_venues: number[];
}

const defaultUser = {
  id: 0,
  created_at: '',
  email: '',
  name: '',
  password: '',
  visited_venues: [],
};

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
      const response = await fetch('url');
      const data = await response.json();

      this.user = { ...data };
      return this.user;
    }
  }

  /**
   * Gets array of venues and their detail
   */
  public getAllVenues = async () => {
    const hasCachedVenues = this.venues.length;

    if (hasCachedVenues) {
      return await this.getCachedVenues();
    } else {
      try {
        // TODO: Connect this to API route
        const response = await fetch('url');

        const data = await response.json();

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
  public getVenueById = async (id: number) => {
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
    const alreadyVisitedVenue = this.user.visited_venues.find(
      (venueId) => {
          return venueId === id;
      },
    );

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
