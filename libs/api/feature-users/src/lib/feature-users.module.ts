import { Module } from '@nestjs/common';
import { CoreModule } from '@nx-nest-ng/api-core';
import { UsersService } from './services';

@Module({
  imports: [CoreModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class FeatureUsersModule {}
