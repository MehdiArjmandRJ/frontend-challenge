import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withComponentInputBinding } from '@angular/router';

import { LoginRedirectComponent, LogoutRedirectComponent } from './core/auth/pages';


const routes: Routes = [
  {
    path: 'panel',
    data: {},
    loadChildren: () =>
      import('./modules/layout.module').then(( module ) => module.LayoutModule),
  },
  {
    path: 'login-redirect',
    component: LoginRedirectComponent,
  },
  {
    path: 'logout-redirect',
    component: LogoutRedirectComponent,
  },
  { path: '**', redirectTo: 'panel/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    provideRouter(routes, withComponentInputBinding()),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
