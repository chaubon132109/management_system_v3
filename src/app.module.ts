import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { User } from './users/user.entity';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, 
    TypeOrmModule.forRoot(typeOrmConfig), 
    TypeOrmModule.forFeature([User]), 
    AuthModule,
    JwtModule.register({
      secret: 'daf49sj3k6af94cka64jllsjf846kjc96',
      signOptions: { expiresIn: '3600s' },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}