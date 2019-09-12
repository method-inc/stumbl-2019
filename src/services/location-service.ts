import { distanceBetweenTwoPoints } from '@/services/util/DistanceCalculator';

export class LocationService {
  public async isWithinGeoRadius(
    currentLocation: Position,
    locationRadius: number,
    venueLatitude: number,
    venueLongitude: number,
  ): Promise<boolean> {
    return new Promise<any>((res, rej) => {
      const distance = distanceBetweenTwoPoints(
        venueLatitude,
        venueLongitude,
        currentLocation.coords.latitude,
        currentLocation.coords.longitude,
        'ft',
      );
      const isWithinRadius = distance < locationRadius;

      res(isWithinRadius);
    });
  }
}
