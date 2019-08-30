export interface User {
  id: number;
  created_at: string;
  email: string;
  password: string;
  visited_venues: number[];
}
