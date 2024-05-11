import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { DialogModule } from 'primeng/dialog';

//Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedButtonComponent, SharedInputComponent, SharedTableComponent } from '@app/shared/modules';

//Component
import { HeaderHomeComponent, InsertHomeComponent } from './components';
import { HomeComponent } from './home.component';

//Pipes
import { FilterByNamePipe } from '@app/shared/pipes';

//Services

//Routing
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    DialogModule,
    FilterByNamePipe,
    HomeRoutingModule,
    ReactiveFormsModule,
    SharedTableComponent,
    SharedInputComponent,
    SharedButtonComponent,
    RxReactiveFormsModule
  ],
  declarations: [
    HomeComponent,
    InsertHomeComponent,
    HeaderHomeComponent
  ],
  providers: []
})
export class HomeModule { }
