import { Module } from '@nestjs/common';

import { CoreModule } from '@nx-nest-ng/core';
import { FeatureAuthModule } from '@nx-nest-ng/feature-auth';

@Module({
  imports: [FeatureAuthModule, CoreModule],
})
export class AppModule {}
