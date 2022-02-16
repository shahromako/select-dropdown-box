export interface Users {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface SomeTestInterface {
  id: number;
  name: string;
  label?: string;
}