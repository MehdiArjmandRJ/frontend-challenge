import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Modules
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

//Services
import { AppInitService } from './config/app-init.service';
import { GlobalErrorHandler } from './services/globalErrorHandler';
import { CustomAuthInterceptor } from './interceptor/custom-auth-interceptor';

//Stores
import { DataState } from './store/data.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

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
          error: () => false,
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
    NgxsModule.forRoot([DataState]),
    NgxsStoragePluginModule.forRoot({ key: 'StorageState' }),
  ],
  providers: [
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomAuthInterceptor,
      multi: true,
    },
    GlobalErrorHandler,
  ],
})
export class CoreModule {}
