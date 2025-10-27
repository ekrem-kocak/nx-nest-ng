import { Module } from '@nestjs/common';
import { CoreModule } from '@nx-nest-ng/core';
import { UsersService } from './services';

@Module({
  imports: [CoreModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class FeatureUsersModule {}
