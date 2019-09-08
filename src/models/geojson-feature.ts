import { LngLatLike } from 'mapbox-gl';

export interface GeoJsonFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[] | LngLatLike;
  };
  properties: {
    title: string;
    description: string;
  };
}

export interface GeoJsonVenue {
  id: string;
  geojson: GeoJsonFeature;
}
