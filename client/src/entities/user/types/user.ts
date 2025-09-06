export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
  }
  
  export interface RefreshResponse {
    message: string;
    user: User;
    accessToken: string;
  }