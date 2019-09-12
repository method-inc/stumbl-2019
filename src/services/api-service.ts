import { Venue } from '@/models/venue-model';

const API_URI = process.env.VUE_APP_STMBL_API_URI;
const EVENT_ID = process.env.VUE_APP_DSW_CRAWL_EVENT_ID;
const TOKEN = 'dsw_user_token';

export default class ApiService {
  /**
   * Request existing user's data.
   * If no existing user, creates new user.
   */
  public getUserData = async () => {
      const response = await fetch(API_URI + '/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
        },
      });
      const { data } = await response.json();

      return data.attributes;
  }

  /**
   * Gets array of venues and their detail
   */
  public getAllVenues = async (): Promise<Venue[]> => {
      const response = await fetch(`${API_URI}/events/${EVENT_ID}/locations`);
      const json = await response.json();

      return json.data.map((entry: any) => {
        return {
          id: entry.id,
          ...entry.attributes,
        };
      }) as Venue[];
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
}
