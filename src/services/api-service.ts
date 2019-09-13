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
  public updateVenue = async (venue: Venue) => {
    const payload = {
      data: {
        attributes: {
          ...venue
        }
      }
    }

    try {
      const response = await fetch(API_URI + '/locations/' + venue.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return data.attributes;
    } catch (error) {
      return error;
    }
  }

  public updateCompanyImage = async (id: string, file: File) => {
    const payload = {
      data: {
        attributes: {
          file
        }
      }
    }

    try {
      const response = await fetch(API_URI + '/locations/' + id + '/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return data.attributes;
    } catch (error) {
      return error;
    }
  }
}
