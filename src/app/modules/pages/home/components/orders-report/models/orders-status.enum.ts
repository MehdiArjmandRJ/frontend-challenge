import { Enumeration } from '@dipscope/enumeration';

export class OrdersStatusEnumeration extends Enumeration<OrdersStatusEnumeration, number> {
  public static readonly NotValid: OrdersStatusEnumeration = new OrdersStatusEnumeration(
    0,
    'NotValid',
    'نامعتبر',
    '',
    'text-warning'
  );

  public static readonly SendRequest: OrdersStatusEnumeration = new OrdersStatusEnumeration(
    1,
    'SendRequest',
    'در حال ارسال درخواست',
    '',
    'text-yellow'
  );

  public static readonly PartiallyExequted: OrdersStatusEnumeration = new OrdersStatusEnumeration(
    2,
    'PartiallyExequted',
    'قسمتی معامله شده',
    '',
    'text-yellow'
  );

  public static readonly OrderPutInTheBook: OrdersStatusEnumeration = new OrdersStatusEnumeration(
    3,
    'OrderPutInTheBook',
    'ثبت در هسته معاملاتی',
    '',
    'status_1'
  );

  public static readonly OrderCancelledByTheBroker: OrdersStatusEnumeration = new OrdersStatusEnumeration(
    4,
    'OrderCancelledByTheBroker',
    'لغو شده',
    '',
    'status_2'
  );

  public static readonly OrderCancelledBySurveillance: OrdersStatusEnumeration = new OrdersStatusEnumeration(
    5,
    'OrderCancelledBySurveillance',
    'لغو شده توسط ناظر',
    '',
    'status_2'
  );

  public static readonly OrderAutomaticallyCancelledByTheCentralTradingEngine: OrdersStatusEnumeration = new OrdersStatusEnumeration(
    6,
    'OrderAutomaticallyCancelledByTheCentralTradingEngine',
    'لغو توسط هسته معاملاتی',
    '',
    'status_2'
  );

  public static readonly OrderCancelledFollowingCorporateActionOnTheInstrument: OrdersStatusEnumeration = new OrdersStatusEnumeration(
    7,
    'OrderCancelledFollowingCorporateActionOnTheInstrument',
    '?',
    '',
    'status_2'
  );

  public static readonly OrderCompletelyExecuted: OrdersStatusEnumeration = new OrdersStatusEnumeration(
    8,
    'OrderCompletelyExecuted',
    'انجام شده',
    '',
    'status_1'
  );

  public static readonly OrderRejectedBecauseOfInstrumentFreezingByItsPotentialExecution: OrdersStatusEnumeration = new OrdersStatusEnumeration(
    9,
    'OrderRejectedBecauseOfInstrumentFreezingByItsPotentialExecution',
    '?',
    '',
    'status_2'
  );

  public static readonly OrderDefinitivelyRejectedBySurveillanceFollowingTheInstrumentFreezing: OrdersStatusEnumeration = new OrdersStatusEnumeration(
    10,
    'OrderDefinitivelyRejectedBySurveillanceFollowingTheInstrumentFreezing',
    '?',
    '',
    'status_2'
  );

  public static readonly StopOrderWhichHasBeenTriggeredAtTheOpening: OrdersStatusEnumeration = new OrdersStatusEnumeration(
    11,
    'StopOrderWhichHasBeenTriggeredAtTheOpening',
    '?',
    '',
    'status_2'
  );

  public static readonly OrderEliminatedBecauseItHasReachedItsValidity: OrdersStatusEnumeration = new OrdersStatusEnumeration(
    12,
    'OrderEliminatedBecauseItHasReachedItsValidity',
    'انقضا به دلیل اتمام زمان اعتبار',
    '',
    'status_2'
  );

  public static readonly OrderError: OrdersStatusEnumeration = new OrdersStatusEnumeration(
    13,
    'OrderError',
    'خطا در سفارش',
    '',
    'status_2'
  );

  public static readonly FullTradeCancellation: OrdersStatusEnumeration = new OrdersStatusEnumeration(
    14,
    'FullTradeCancellation',
    'ابطال کامل معاملات',
    '',
    'status_2'
  );

  public static readonly PartiallyTradeCancellation: OrdersStatusEnumeration = new OrdersStatusEnumeration(
    15,
    'PartiallyTradeCancellation',
    'ابطال قسمتی از معاملات',
    '',
    'status_2'
  );

  public static readonly test: OrdersStatusEnumeration = new OrdersStatusEnumeration(
    16,
    'expired',
    'منقضی شده',
    '',
    'status_2'
  );

  public static readonly PartiallyExecutedAndExpired: OrdersStatusEnumeration = new OrdersStatusEnumeration(
    17,
    'PartiallyExecutedAndExpired',
    'مقداری انجام شده و منقضی شد',
    '',
    'status_2'
  );

  public static readonly RequestSent: OrdersStatusEnumeration = new OrdersStatusEnumeration(
    18,
    'RequestSent',
    'ارسال شد، منتظر پاسخ هسته',
    '',
    'status_2'
  );


  public readonly key: number;
  public readonly status: string;
  public readonly title: string;
  public readonly icon: string;
  public readonly color: string;

  public constructor(
    key: number,
    status: string,
    title: string,
    icon: string,
    color: string
  ) {
    super(key);
    this.status = status;
    this.title = title;
    this.icon = icon;
    this.color = color;

  }
}
