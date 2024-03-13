import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'user-service',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
   migrations: [
      "src/migrations/*.ts",
      "dist/migrations/*{.ts,.js}"
    ],
  synchronize: true,
};