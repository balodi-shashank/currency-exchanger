import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { CurrencyExchangeService } from 'src/app/shared/service/currency-exchange/currency-exchange.service';

@Injectable({
  providedIn: 'root'
})
export class ToSymbolsResolverService implements Resolve<any> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    return this.currencyExchangeService.getSymbols('EUR');
  }

  constructor(private currencyExchangeService: CurrencyExchangeService) { }

}