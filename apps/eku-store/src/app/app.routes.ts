import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () =>
      import('@nx-nest-ng/eku-store-feature-auth').then((m) => m.authRoutes),
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];
