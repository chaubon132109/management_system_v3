import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '10.1.56.154',
  port: 5432,
  username: 'admin',
  password: 'abc',
  database: 'user-service',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
   migrations: [
      "src/migrations/*.ts",
      "dist/migrations/*{.ts,.js}"
    ],
  synchronize: true,
};