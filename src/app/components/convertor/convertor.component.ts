import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { GlobalConstants } from 'src/app/shared/constants/global-constants';
import {
  ConvertAPIResponse,
  Query,
} from 'src/app/shared/interface/convert-api-response.model';
import { Symbols } from 'src/app/shared/interface/symbols.model';
import { CurrencyExchangeService } from 'src/app/shared/service/currency-exchange/currency-exchange.service';
import { NotificationService } from 'src/app/shared/service/notification/notification.service';
import { StorageService } from 'src/app/shared/service/storage/storage.service';
import { UtilsService } from 'src/app/shared/service/utils/utils.service';

@Component({
  selector: 'app-convertor',
  templateUrl: './convertor.component.html',
  styleUrls: ['./convertor.component.scss'],
})
export class ConvertorComponent implements OnInit, OnDestroy {
  public inputValue = 0;
  fromSymbols: Array<Symbols>;
  toSymbols: Array<Symbols>;
  conversionRates = new Object();
  selectedFromCurrency = 'EUR';
  selectedToCurrency = 'USD';
  exchangeResult = 'XX.XX USD';
  selectedConversionRate = 'XX.XX';
  popularConversion: Query[] | any;
  showHistory = false;
  topCurrencies = GlobalConstants.topCurrencies;
  subscription: Subscription;
  chartData = [{ label: 'USD', data: new Array<number>() }];

  constructor(
    private currencyExchangeService: CurrencyExchangeService,
    public notificationService: NotificationService,
    private utilsService: UtilsService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.subscription = new Subscription();
    this.fromSymbols = new Array<Symbols>();
    this.toSymbols = new Array<Symbols>();
    this.popularConversion = new Array<{
      from: string;
      to: string;
      amount: number;
    }>();
    setInterval(() => this.changeDetector.detectChanges(), 1000);
  }

  ngOnInit(): void {
    this.setDefaults('EUR', 'USD');
  }

  setDefaults(from: string, to: string) {
    this.chartViewListner();
    this.loadFromSymbols(from);
    this.loadToSymbols(Object.keys(this.fromSymbols)[0]);
    this.getExchangeRates(from);
    this.updateRate(to);
    this.historyCharForListner();
    StorageService.setItem('showHistory', 'false');
    StorageService.setItem('historyChartCurr', to);  
    this.utilsService.pageTitle.next('Currency Exchange');
  }

  public setInput(value: number): void {
    this.inputValue = value;
  }

  switchFromTo(from: string, to: string) {
    const curr1 = from.split(':')[0];
    const curr2 = to.split(':')[0];
    this.fromChangeHandler(curr2);
    this.selectedToCurrency = curr1;
    this.loadFromSymbols(curr2);
    this.getExchangeRates(curr2);
    this.loadToSymbols(curr1);
    this.updateRate(curr1);
  }

  chartViewListner() {
    const historyChartFlagSubscription =
      this.utilsService.showHistoryChart.subscribe((bool) => {
        if(this.showHistory !== bool) {
          StorageService.setItem('showHistory', bool.toString());  
          this.showHistory = bool;
        }
      });
    this.subscription.add(historyChartFlagSubscription);
  }

  loadFromSymbols(base: string): void {
    const fromSymbolSubscription = this.currencyExchangeService
      .getSymbols(base)
      .subscribe((res: any) => {
        const { success, symbols } = res;
        this.fromSymbols = [];
        if (success) {
          this.fromSymbols = symbols;
        } else {
          this.notificationService.error(
            'Unable to load default currencies symbols'
          );
        }
      });
    this.subscription.add(fromSymbolSubscription);
  }

  loadToSymbols(base: string): void {
    const toSymbolsSubscription = this.currencyExchangeService
      .getSymbols(base)
      .subscribe((res: any) => {
        const { success, symbols } = res;
        this.toSymbols = [];
        if (success) {
          this.toSymbols = symbols;
        } else {
          this.notificationService.error(
            'Unable to load output currencies symbols'
          );
        }
      });
    this.subscription.add(toSymbolsSubscription);
  }

  getExchangeRates(base: string): void {
    this.selectedFromCurrency = base.split(':')[0];
    const excahngeRateSubscription = this.currencyExchangeService
      .getExchangeRates(this.selectedFromCurrency)
      .subscribe((res: any) => {
        const { success, rates } = res;
        if (success) {
          this.conversionRates = rates;
        } else {
          this.notificationService.error(
            'Unable to load conversion rates. Please contact administrator.'
          );
        }
      });
    this.subscription.add(excahngeRateSubscription);
  }

  exchangeCurrencyAction(
    from: string,
    to: string,
    amount: number
  ): Promise<void> | void {
    if (from && to && amount) {
      // direct calculation dome using available exchange rates inorder to avoid API call

      // const requestParams = { to, from, amount };
      // const singleConversion = this.currencyExchangeService
      //   .getConvert(requestParams)
      //   .subscribe((res: any) => {
      //     const { success, query, result } = res;
      //     const { to } = query;
      //     if (success) {
      //       this.exchangeResult = `${result.toFixed(2)}`;
      //       const converted = amount * +this.selectedConversionRate;
      //       this.exchangeResult = `${converted.toFixed(2)}`;
      //     } else {
      //       this.notificationService.error(
      //         'Exchanges Currency action failed. Please contact administrator.'
      //       );
      //     }
      //   });

      // this.subscription.add(singleConversion);

      const converted = amount * +this.selectedConversionRate;
      this.exchangeResult = `${converted.toFixed(2)}`;

      // this.performMultipleConversion(amount, from);
    } else {
      if (!amount) {
        this.notificationService.error('Please provide amount for conversion');
        return;
      }
      if (!from) {
        this.notificationService.error('Please provide input currency');
        return;
      }
      if (!to) {
        this.notificationService.error('Please provide output currency');
        return;
      }
    }
  }

  performMultipleConversion(amount: number, from: string) {
    const list: Observable<ConvertAPIResponse>[] = [];
    this.topCurrencies.map((to) => {
      const requestParams = { to, from, amount };
      list.push(this.currencyExchangeService.getConvert(requestParams));
    });

    const conversion = forkJoin(list).subscribe((res) => {
      this.popularConversion =
        res.map((output: ConvertAPIResponse) => {
          const { success, query, result } = output;
          if (success) {
            return {
              from: query.from,
              to: query.to,
              result: result,
            };
          } else {
            this.notificationService.error(
              'Failed to perform conversion for .'
            );
            return {
              from: query.from,
              to: query.to,
              result: null,
            };
          }
        }) || [];
    });

    this.subscription.add(conversion);
  }

  fromChangeHandler(value: string): void {
    this.selectedFromCurrency = value;
  }

  toChangeHandler(index: number): void {
    this.selectedToCurrency = Object.keys(this.fromSymbols)[index];
  }

  updateRate(toCurrency: string) {
    this.selectedToCurrency = toCurrency.split(':')[0];
    const selectedCurrencyIndex = Object.keys(this.conversionRates).indexOf(
      this.selectedToCurrency
    );
    const rateList = Object.values(this.conversionRates);
    this.selectedConversionRate = rateList[selectedCurrencyIndex] || "XX.XX";
    this.exchangeResult = "XX.XX";
  }

  getConversion(amount: number, toCurrency: string) {
    const selectedCurrencyIndex = Object.keys(this.conversionRates).indexOf(
      toCurrency
    );
    const rateList = Object.values(this.conversionRates);
    return (amount * +rateList[selectedCurrencyIndex]).toFixed(2);
  }

  getHistoricalRatesSubscriptionList(intervals: Array<string>, to: string) {
    return intervals.map((interval) => {
      const symbol = `${to}`;
      return this.currencyExchangeService.getHistoricalRates({
        date: interval,
        symbol,
      });
    });
  }

  historyCharForListner() {
    const listner = this.utilsService.historyChartFor.subscribe(
      (curr: string) => {
        StorageService.setItem('historyChartCurr', curr);
        const index = Object.keys(this.fromSymbols).indexOf(curr);
        const title = Object.values(this.fromSymbols)[index];
        this.utilsService.pageTitle.next(`${curr}: ${title}`);
        this.selectedToCurrency = curr;
        this.getHistory(curr);
      }
    );

    this.subscription.add(listner);
  }

  showHistorySection(from: string, to: string) {
    const fromKey = from.split(':')[0];
    const toKey = to.split(':')[0];
    this.utilsService.historyChartFor.next(toKey);
    this.utilsService.showHistoryChart.next(true);
    const index = Object.keys(this.fromSymbols).indexOf(fromKey);
    const title = Object.values(this.fromSymbols)[index];
    StorageService.setItem('pageTitle', `${fromKey}: ${title}`);
    this.utilsService.historyChartFor.next(toKey);
  }

  getHistory(to: string) {
    // here intervals are constants as we don't have one API for this action.

    const subscription = this.getHistoricalRatesSubscriptionList(
      GlobalConstants.intervals,
      to
    );

    const getHistorySubscription = forkJoin(subscription).subscribe((res) => {
      this.chartData = [];

      const toCurrencies = to.split(',');

      const currencies = toCurrencies.map((currency) => ({
        [currency]: res.reduce(
          (acc, next) => [...acc, next?.rates[currency]],
          []
        ),
      }))[0];

      this.chartData = Object.entries(currencies).map(([label, data]) => ({
        label,
        data,
        backgroundColor: '#0d6efd',
        borderColor: 'lightblue',
        fill: false,
        lineTension: 0,
        radius: 5,
      }));
    });
    this.subscription.add(getHistorySubscription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
