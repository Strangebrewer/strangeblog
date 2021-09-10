declare namespace Express {
  interface User {
    id: number;
    email: string;
    acl: string;
    categories?: any;
    tags?: any
  }
}