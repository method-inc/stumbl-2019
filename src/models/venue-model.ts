export interface Venue {
  id?: number;
  name: string;
  address: string;
  address_2: string;
  city: string;
  state: string;
  zip_code: string;
  crawl_day: number; // 2 day event, could be either day (not both)
  latitude: string;
  longitude: string;
  geoRadius: number; // default 50
  website: string;
  description: string;
  spec_instructions: string;
  features: string; // What will their stop feature
  employees: number; // how many employees do they have
  company_img_url: string;
  logo_img_url: string;
  created_at?: string; // timestamp
  updated_at?: string; // timestamp
}
