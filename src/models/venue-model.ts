export interface Venue {
  id: string;
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
