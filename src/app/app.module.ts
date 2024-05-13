import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Modules
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CoreModule } from './core/core.module';

//Components
import { AppComponent } from './app.component';

//Services
import { ConfirmationService, MessageService } from 'primeng/api';

//Routing
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  providers: [
    MessageService,
    ConfirmationService,
    HttpClientModule,
  ],
  imports: [CoreModule, BrowserModule, BrowserAnimationsModule, AppRoutingModule, ConfirmDialogModule],
  bootstrap: [AppComponent],
})
export class AppModule {
}
