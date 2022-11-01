import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ConvertorComponent } from './components/convertor/convertor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { MainInterceptor } from './shared/service/main-interceptor/main-interceptor';
import { AppMaterialModule } from './app-material/app-material.module';
import { NotificationService } from './shared/service/notification/notification.service';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { HistoryChartComponent } from './components/history-chart/history-chart.component';
import { CommonModule } from '@angular/common';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConvertorComponent,
    HistoryChartComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppMaterialModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    AppRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    CommonModule
  ],
  providers: [
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MainInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
