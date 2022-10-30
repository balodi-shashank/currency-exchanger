import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { ConvertAPIResponse, Query } from 'src/app/shared/interface/convert-api-response.model';
import { Symbols } from 'src/app/shared/interface/symbols.model';
import { CurrencyExchangeService } from 'src/app/shared/service/currency-exchange/currency-exchange.service';
import { NotificationService } from 'src/app/shared/service/notification/notification.service';

@Component({
  selector: 'app-convertor',
  templateUrl: './convertor.component.html',
  styleUrls: ['./convertor.component.scss']
})
export class ConvertorComponent implements OnInit {
  fromSymbols: Array<Symbols>;
  toSymbols: Array<Symbols>;
  conversionRates = new Object();
  selectedFromCurrency = "EUR";
  selectedToCurrency = "USD";
  exchangeResult = 'XX.XX USD';
  selectedConversionRate = 'XX.XX';
  popularConversion: Query[] | any ;

  constructor(
    private currencyExchangeService: CurrencyExchangeService,
    public notificationService: NotificationService
  ) { 
    this.fromSymbols = new Array<Symbols>();
    this.toSymbols = new Array<Symbols>();
    this.popularConversion = new Array<{ from: string; to:string; amount:number; }>();
  }

  ngOnInit(): void {
    this.loadFromSymbols('EUR');
  }

  loadFromSymbols(base: string): void {
    this.currencyExchangeService.getSymbols(base)
    .subscribe((res: any) => {
      const { success, symbols } = res;
      this.fromSymbols = [];
      if(success) {
        this.fromSymbols = symbols;
        this.loadToSymbols(Object.keys(symbols)[0]);
      } else {
        this.notificationService.error('Unable to load default currencies symbols');
      }
    });
  }

  loadToSymbols(base: string): void {
    this.currencyExchangeService.getSymbols(base)
    .subscribe((res: any) => {
      const { success, symbols } = res;
      this.toSymbols = [];
      if(success) {
        this.toSymbols = symbols;
      } else {
        this.notificationService.error('Unable to load output currencies symbols');
      }
    });
  }

  getExchangeRates(base: string): void {
    this.currencyExchangeService.getExchangeRates(base)
      .subscribe((res: any) => {
        const { success, rates } = res;
        if(success) {
          this.conversionRates = rates;
        } else {
          this.notificationService.error('Unable to load conversion rates. Please contact administrator.');  
        }
      });
  }

  exchangeCurrencyAction(from: string, to: string, amount: number): Promise<void> | void {
    if(from && to && amount) {
      const requestParams = { to, from, amount };
      this.currencyExchangeService.getConvert(requestParams)
        .subscribe((res: any) => {
          const { success, query, result } = res;
          const { to } = query;
          if(success) { 
            this.exchangeResult = `${result} ${to}`;
          } else {
            this.notificationService.error('Exchanges Currency action failed. Please contact administrator.');
          } 
        });

      this.performMultipleConversion(amount, from);  
    } else {
      if(!amount) {
        this.notificationService.error('Please provide amount for conversion');
        return;
      }
      if(!from) {
        this.notificationService.error('Please provide input currency');
        return;
      }
      if(!to) {
        this.notificationService.error('Please provide output currency');
        return;
      }
    }
  }

  performMultipleConversion(amount: number, from: string) {
    const list: Observable<ConvertAPIResponse>[] = [];
    (['USD','INR','AED','NZD','MAD','OMR','SAR','RUB','ANG']).map((to) => {
      const requestParams = { to, from, amount };
      list.push(this.currencyExchangeService.getConvert(requestParams));
    })

    forkJoin(list).subscribe((res) => {
      this.popularConversion = res.map((output: ConvertAPIResponse) => {
        const { success, query, result } = output;
        if(success) { 
          return {
            from: query.from,
            to: query.to,
            result: result
          }
        } else {
          this.notificationService.error('Failed to perform conversion for .');
          return {
            from: query.from,
            to: query.to,
            result: null
          }
        }
      }) || [];
    })
  }

  fromChangeHandler(value: string): void {
    this.selectedFromCurrency = value;
  }

  toChangeHandler(index: number): void {
    this.selectedToCurrency = Object.keys(this.fromSymbols)[index];
  }

  updateRate(toCurrency: string) {
    this.selectedToCurrency = toCurrency;
    const selectedCurrencyIndex  = Object.keys(this.conversionRates).indexOf(toCurrency);
    const rateList = Object.values(this.conversionRates);
    this.selectedConversionRate = rateList[selectedCurrencyIndex];
  }

  getConversion(amount: number, toCurrency: string) {
    const selectedCurrencyIndex  = Object.keys(this.conversionRates).indexOf(toCurrency);
    const rateList = Object.values(this.conversionRates);
    return amount * +rateList[selectedCurrencyIndex];
  }
}
