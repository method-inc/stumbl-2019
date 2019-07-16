export interface Venue {
  id: number;
  name: string;
  url: string;
  companyImage: ImageBitmap;

  address: string;
  // Manually convert coordinates using google maps
  latitude: number;
  longitude: number;
  geoRadius?: number;
  description: string;
}
