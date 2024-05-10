import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modules
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { SharedTabsModule } from '@shared/modules/shared-tabs/shared-tabs.module';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { IconsModule } from '@app/shared/modules/custom-icons/icons.module';

//Component
import { OrdersReportComponent } from './orders-report.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ActiveOrdersComponent } from './components/active-orders/active-orders.component';
import { TradesComponent } from './components/trades/trades.component';
import { OrderActionsComponent } from './components/order-actions/order-actions.component';
import { OrderSideComponent } from './components/order-side/order-side.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';

//Services
import { OrdersGridService } from './services/orders-grid.service';
import { TradesGridService } from './services/trades-grid.service';
import { ActiveOrdersGridService } from './services/active-orders-grid.service';

//Pipes
import { JalaliDateTimePipe } from '@app/shared/pipes';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgGridModule,
    SharedTabsModule,
    IconsModule,
    OverlayPanelModule,
    JalaliDateTimePipe,
  ],
  declarations: [
    OrdersReportComponent,
    OrdersComponent,
    TradesComponent,
    OrderActionsComponent,
    OrderSideComponent,
    ActiveOrdersComponent,
    OrderDetailComponent,
  ],
  providers: [
    ActiveOrdersGridService,
    OrdersGridService,
    TradesGridService,
  ],
  exports: [
    OrdersReportComponent,
  ]
})
export class OrderReportsModule { }
