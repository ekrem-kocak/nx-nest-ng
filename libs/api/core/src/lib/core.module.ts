import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import securityConfig from './config/security.config';
import { PrismaModule } from './prisma';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env['NODE_ENV'] || 'development'}`,
      load: [appConfig, databaseConfig, jwtConfig, securityConfig],
    }),
  ],
  exports: [PrismaModule, ConfigModule],
})
export class CoreModule {}
