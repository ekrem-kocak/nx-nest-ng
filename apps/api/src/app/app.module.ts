import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import databaseConfig from '../config/database.config';
import jwtConfig from '../config/jwt.config';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      load: [databaseConfig, jwtConfig],
    }),

    AuthModule,
    PrismaModule,
  ],
})
export class AppModule {}
