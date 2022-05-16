export interface IdentityEnvironment {
  production: boolean;
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUser: string;
  dbPass: string;
  dbLogging: boolean;
}
