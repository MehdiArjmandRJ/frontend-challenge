import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { tap } from 'rxjs';

//Modules
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

//Services
import { AppInitService } from './config/app-init.service';
import { CustomAuthInterceptor } from './interceptor/custom-auth-interceptor';
import { GlobalErrorHandler } from './services/globalErrorHandler';

//Stores
import { HttpCancelService } from './services/httpcancel.service';


export function initializeApp(appInitService: AppInitService) {
  return () => {
    appInitService
      .InitApp()
      .pipe(
        tap({
          next: (config: boolean) => {
            if (config) {
              return true;
            }
            return false;
          },
          error: () => false
        })
      )
      .subscribe();
  };
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    // NgxsModule.forRoot([WatchlistState, InsSelectedState]),
    NgxsStoragePluginModule.forRoot({ key: 'StorageState' }),
  ],
  providers: [
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomAuthInterceptor,
      multi: true
    },
    GlobalErrorHandler,
    HttpCancelService
  ]
})
export class CoreModule { }
