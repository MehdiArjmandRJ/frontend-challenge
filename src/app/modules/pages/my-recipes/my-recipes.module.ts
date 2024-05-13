import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { DialogModule } from 'primeng/dialog';

//Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedButtonComponent, SharedInputComponent, SharedTableComponent } from '@app/shared/modules';

//Component
import { HeaderMyRecipesComponent } from './components';
import { MyRecipesComponent } from './my-recipes.component';

//Pipes
import { FilterByNamePipe } from '@app/shared/pipes';

//Services

//Routing
import { MyRecipesRoutingModule } from './my-recipes-routing.module';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    DialogModule,
    FilterByNamePipe,
    MyRecipesRoutingModule,
    ReactiveFormsModule,
    SharedTableComponent,
    SharedInputComponent,
    SharedButtonComponent,
    RxReactiveFormsModule
  ],
  declarations: [
    MyRecipesComponent,
    HeaderMyRecipesComponent
  ],
  providers: []
})
export class MyRecipesModule { }
