import { distanceBetweenTwoPoints } from '@/services/util/DistanceCalculator';

const SKOOKUM_COORDINATES = {
  // latitude: 39.758117, // default to skookum coordinates
  // longitude: -104.989888, // default to skookum coordinates

  // latitude: 32.715736, // default to san diego coordinates
  // longitude: -117.161087, // default to san diego coordinates

  latitude: 31.9686, // default to somewhere in texas
  longitude: 99.9018, // default to somewhere in texas
};

export class LocationService {

  /**
   * Request permission to get the user's location while the
   * browser page is active.
   */
  public requestLocation(): Promise<any> {
    return new Promise<any>((res, rej) => {
      res(true);
    });
  }

  /**
   * Get the user's current location, if the user
   * has accepted location permissions.
   */
  public get(): Promise<any> {
    return new Promise<any>((res, rej) => {
      res(SKOOKUM_COORDINATES);
    });
  }

  public async isWithinGeoRadius(locationRadius: number, latitude: number, longitude: number): Promise<boolean> {
    const userCoordinates = await this.get();

    return new Promise<any>((res, rej) => {
      const distance = distanceBetweenTwoPoints(
        latitude,
        longitude,
        userCoordinates.latitude,
        userCoordinates.longitude,
        'ft',
      );
      const isWithinRadius = distance < locationRadius;

      res(isWithinRadius);
    });
  }
}
