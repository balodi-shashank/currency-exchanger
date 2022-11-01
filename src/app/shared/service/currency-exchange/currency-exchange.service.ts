import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConvertAPIResponse } from '../../interface/convert-api-response.model';
import { ExchangeRatesResponse } from '../../interface/exchange-rates.model';
import { HistoricalRatesAPIResponse } from '../../interface/historical-rates-api-response.model';
import { SymbolsResponse } from '../../interface/symbols.model';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeService {

  constructor(public _http: HttpClient,
    private utilsService: UtilsService  
  ) { }

  public getExchangeRates(baseCurrency: string): Observable<ExchangeRatesResponse> | Observable<any> {
    if(environment.production) {
      return this._http.get<ExchangeRatesResponse>(`${environment.baseAPIUrl}/latest?base=${baseCurrency}`);
    } else {
      return this.utilsService.getMockResponse('exchange-rates');
    }
  }

  public getSymbols(baseCurrency: string): Observable<SymbolsResponse> | Observable<any> {
    if(environment.production) {
      return this._http.get<SymbolsResponse>(`${environment.baseAPIUrl}/symbols?base=${baseCurrency}`);
    } else {
      return this.utilsService.getMockResponse('symbols');
    }
  }

  public getConvert(details: { to: string, from: string, amount: number }): Observable<ConvertAPIResponse> | Observable<any> {
    const { to, from, amount } = details;
    if(environment.production) {
      return this._http.get<ConvertAPIResponse>(`${environment.baseAPIUrl}/convert?to=${to}&from=${from}&amount=${amount}`);
    } else {
      return this.utilsService.getMockResponse('conversion');
    }
  }

  public getHistoricalRates(data: { date: string, symbol: string }): Observable<HistoricalRatesAPIResponse> | Observable<any> {
    const { date, symbol } = data;
    if(environment.production) {
      return this._http.get<HistoricalRatesAPIResponse>(`${environment.baseAPIUrl}/${date}?symbol=${symbol}`);
    } else {
      return this.utilsService.getMockResponse('historical-rates');
    }
  }

  public getTimeseriesRates(period: { start_date: string, end_date: string }): Observable<HistoricalRatesAPIResponse> | Observable<any> {
    const { start_date, end_date } = period;
    if(environment.production) {
      return this._http.get<HistoricalRatesAPIResponse>(`${environment.baseAPIUrl}/timeseries?start_date=${start_date}&end_date=${end_date}`);
    } else {
      return this.utilsService.getMockResponse('timeseries-rates');
    }
    
  }

}
