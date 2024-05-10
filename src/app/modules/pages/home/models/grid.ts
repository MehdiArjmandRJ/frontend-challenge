import { CPS } from '@app/shared/models';
import { ColDef } from 'ag-grid-community';

export interface IRowCPS extends CPS {
  insCode: string;
  companyName: string;
  description?: string;
  volume: number;
  lastPrice: number;
  lastPricePercent: number;
  closingPrice: number;
  closingPricePercent: number;
  priceYesterday: number;

  dailyValue?: number;
  yesterdayValue?: number;
  lastValue?: number;
  profitLossBalance?: number;
  lossLessSellingPrice?: number;

  closingPriceValue?: number;

  profitLossBalancePercentage?: number;
  portfoPercentage?: number;

  totalCPSShares?: number;
  totalICPSShares?: number;
  totalYesterdayValue?: number;
  totalDailyValue?: number;
  totalProfitLossBalance?: number;
  totalLastValue?: number;
  totalClosingPriceValue?: number;

}
export interface ColDefs<TData = any> extends ColDef<TData> {
  undisplayable?: boolean;
}
