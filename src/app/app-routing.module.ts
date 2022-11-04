import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvertorComponent } from './components/convertor/convertor.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ExchangeRateResolverService } from './core/resolver/exchange-rate-resolver/exchange-rate-resolver.service';
import { SymbolsResolverService } from './core/resolver/symbols-resolver/symbols-resolver.service';
import { CustomPreLoadingStrategyService } from './shared/service/custom-pre-loading-strategy/custom-pre-loading-strategy.service';

const routes: Routes = [
  // {
  //   path: 'Module_name',
  //   data: { preload: true, loadAfter: 10000 },
  //   loadChildren: () => import('module_path').then(m => m.EmployeeModule)
  // },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: { 
      symbols: SymbolsResolverService, 
      rates: ExchangeRateResolverService 
    }
  },
  { 
    path: 'not-found', 
    component: NotFoundComponent 
  },
  { 
    path: '**', 
    redirectTo: 'not-found' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
