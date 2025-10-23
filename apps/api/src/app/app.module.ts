import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import appConfig from '../config/app.config';
import databaseConfig from '../config/database.config';
import jwtConfig from '../config/jwt.config';
import securityConfig from '../config/security.config';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      load: [appConfig, databaseConfig, jwtConfig, securityConfig],
    }),

    AuthModule,
    PrismaModule,
  ],
})
export class AppModule {}
