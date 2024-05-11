import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

//Modules
import { TooltipModule } from 'primeng/tooltip';
import { IconsModule } from '../shared/modules/custom-icons/icons.module';

//Components
import { HeaderComponent, SidebarComponent } from '../shared/components';
import { LayoutComponent } from './layout.component';

//Services

//Pipes

//Routing
import { LayoutRoutingModule } from './layout-routing.module';



@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    IconsModule,
    TooltipModule
  ],
  declarations: [LayoutComponent, HeaderComponent, SidebarComponent],
  providers: [
  ],
})
export class LayoutModule { }
