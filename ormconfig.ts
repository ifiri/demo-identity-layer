export default {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  migrationsTableName: `identity_migrations`,
  entities: [`src/app/infra/orm-entities/*{.js,.ts}`],
  migrations: [`src/generated/migrations/*{.js,.ts}`],
  cli: { migrationsDir: `src/generated/migrations` },
};
