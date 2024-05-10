import { Component, OnDestroy, OnInit, Input, Inject } from '@angular/core';
import { OrdersStoreService } from './services/orders-store.service';
import { IOrderModel, ITradeModel } from '../../../../../shared/modules/order/models/Orders-report';
import { Observable, Subscription, interval, of, take } from 'rxjs';
import { TradesStoreService } from './services/trades-store.service';
import { OrderReportSignalrService } from '@app/shared/utils/signalR/services/order-report-signalr.service';
import { Store } from '@ngxs/store';
import { PortfolioActions } from '@app/shared/modules/portfolio/store/portfolio.action';
import { INotification } from '@shared/modules/notification-receiver/notification.interface';


@Component({
  selector: 'app-orders-report',
  templateUrl: './orders-report.component.html',
  styleUrls: ['./orders-report.component.scss']
})
export class OrdersReportComponent implements OnInit, OnDestroy {
  @Input() enabled: boolean = false;
  activeOrders$: Observable<IOrderModel[]>;
  activeOrders: IOrderModel[] = [];

  allTodayOrders$: Observable<IOrderModel[]>;
  allTodayOrders: IOrderModel[] = [];

  buyOrders$: Observable<IOrderModel[]>;
  buyOrders: IOrderModel[] = [];

  saleOrders$: Observable<IOrderModel[]>;
  saleOrders: IOrderModel[] = [];

  trades$: Observable<ITradeModel[]>;
  trades: ITradeModel[] = [];

  tabIndex = 0;

  orderHubSubscription: Subscription;
  activeOrdersSubscription: Subscription;
  allTodayOrdersSubscription: Subscription;
  buyOrdersSubscription: Subscription;
  saleOrdersSubscription: Subscription;
  tradesSubscription: Subscription;

  constructor(
    private ordersStore: OrdersStoreService,
    private tradesStore: TradesStoreService,
    private orderReportSignalrService: OrderReportSignalrService,
    @Inject('notificationToastService') private notify: INotification,
    private store: Store,
  ) { }

  ngOnInit(): void {
    if (this.enabled) {
      this.orderHubSubscription = this.orderReportSignalrService.orderHubSignalRData.subscribe(
        (data) => {
          this.checkOrderReport(data);
          this.ordersStore.getCustomerOrders();
        }
      );

      this.activeOrders$ = this.ordersStore.getAllActiveOrders();
      this.activeOrdersSubscription = this.activeOrders$.subscribe(orders => {
        this.activeOrders = orders;
      });

      this.allTodayOrders$ = this.ordersStore.getOrders();
      this.allTodayOrdersSubscription = this.allTodayOrders$.subscribe(
        orders => {
          this.allTodayOrders = orders;
        }
      );

      this.buyOrders$ = this.ordersStore.filterByOrderSide(1);
      this.buyOrdersSubscription = this.buyOrders$.subscribe(orders => {
        this.buyOrders = orders;
      });

      this.saleOrders$ = this.ordersStore.filterByOrderSide(2);
      this.saleOrdersSubscription = this.saleOrders$.subscribe(orders => {
        this.saleOrders = orders;
      });

      this.tradesStore.getCustomerTrades();
      this.trades$ = this.tradesStore.getTrades();
      this.tradesSubscription = this.trades$.subscribe(orders => {
        this.trades = orders;
      });
    } else {
      this.saleOrders = [];
      this.buyOrders = [];
      this.allTodayOrders = [];
      this.trades = [];
      this.saleOrders$ = of([]);
      this.buyOrders$ = of([]);
      this.allTodayOrders$ = of([]);
      this.trades$ = of([]);
    }
  }

  onTabChange(tabIndex) {
    this.tabIndex = tabIndex;
  }

  ngOnDestroy(): void {
    this.orderHubSubscription?.unsubscribe();
    this.activeOrdersSubscription?.unsubscribe();
    this.allTodayOrdersSubscription?.unsubscribe();
    this.buyOrdersSubscription?.unsubscribe();
    this.saleOrdersSubscription?.unsubscribe();
  }

  private checkOrderReport(data) {
    if (data) {
      switch (data.hubEventName) {
      case 'OrderSubmitInBroker':
        break;
      case 'OrderSubmitInCore':
        break;
      case 'OrderEdited':
        break;
      case 'OrderCancelled':
        break;
      case 'OrderRemoved':
        break;
      case 'TradeExecuted':
        this.notify.success('سفارش ارسالی انجام شد');
        interval(2000).pipe(take(1)).subscribe(() => {
          this.store.dispatch(new PortfolioActions.FetchAll());
          this.tradesStore.getCustomerTrades();
        });
        break;
      case 'PartiallyExequted':
        this.notify.success('قسمتی معامله شده');
        interval(2000).pipe(take(1)).subscribe(() => {
          this.store.dispatch(new PortfolioActions.FetchAll());
          this.tradesStore.getCustomerTrades();
        });
        break;
      case 'OrderError':
        this.notify.error('خطا در سفارش ارسالی');
        interval(2000).pipe(take(1)).subscribe(() => {
          this.store.dispatch(new PortfolioActions.FetchAll());
          this.tradesStore.getCustomerTrades();
        });
        break;
      case 'OrderTradeCancelled':
        break;
      case 'SystemTraded':
        break;
      case 'TradeCancelled':
        interval(2000).pipe(take(1)).subscribe(() => {
          this.store.dispatch(new PortfolioActions.FetchAll());
          this.tradesStore.getCustomerTrades();
        });
        break;
      case 'OrderCreated':
        break;
      default:
        break;
      }
    }
  }
}
