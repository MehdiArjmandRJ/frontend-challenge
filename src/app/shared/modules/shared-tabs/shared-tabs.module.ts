import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabActivationDirective } from '@shared/modules/shared-tabs/directives/tab-activation-directive';
import { TabsComponent } from './components/tabs.component';
import { TabComponent } from './components/tab/tab.component';


@NgModule({
  declarations: [
    TabsComponent,
    TabComponent,
    TabActivationDirective,
  ],
  exports: [
    TabsComponent,
    TabComponent,
  ],
  imports: [
    CommonModule,

  ]
})
export class SharedTabsModule { }
