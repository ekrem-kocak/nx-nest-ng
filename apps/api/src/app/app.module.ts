import { Module } from '@nestjs/common';

import { CoreModule } from '@nx-nest-ng/api-core';
import { FeatureAuthModule } from '@nx-nest-ng/api-feature-auth';

@Module({
  imports: [FeatureAuthModule, CoreModule],
})
export class AppModule {}
