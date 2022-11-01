import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  pageTitle = new BehaviorSubject<string>('CurrentExchange');

  showHistoryChart = new BehaviorSubject<boolean>(false);

  historyChartFor = new BehaviorSubject<string>('USD');

  constructor(private _http: HttpClient) {}

  public getMockResponse(filename: string) {
    return this._http.get(`../../.././../assets/mocks/${filename}.json`);
  }
}
