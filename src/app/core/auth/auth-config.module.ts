// import { NgModule } from '@angular/core';

// import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
// import { environment } from 'src/environments/environment';
// import { LoginRedirectComponent, LogoutRedirectComponent } from './pages';

// @NgModule({
//   declarations: [LoginRedirectComponent, LogoutRedirectComponent],
//   imports: [
//     AuthModule.forRoot({
//       config: {
//         authority: environment.idpBaseUrl,
//         redirectUrl: `${window.location.origin}/login-redirect`,
//         postLogoutRedirectUri: `${window.location.origin}/logout-redirect`,
//         clientId: 'online_panel',
//         scope: 'openid offline_access profile',
//         responseType: 'code',
//         useRefreshToken: true,
//         silentRenew: true,
//         disableIatOffsetValidation: true,
//         historyCleanupOff: false,
//         // ignoreNonceAfterRefresh: true, // this is required if the id_token is not returned
//         logLevel: LogLevel.Error,
//         autoUserInfo: true,
//       },
//     }),
//   ],

//   exports: [AuthModule, LoginRedirectComponent, LogoutRedirectComponent],
// })
// export class AuthConfigModule { }
