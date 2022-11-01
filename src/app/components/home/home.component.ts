import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { startWith } from 'rxjs';
import { UtilsService } from 'src/app/shared/service/utils/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showHistory = false;

  constructor(
    private utilsService: UtilsService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.chartViewListner();
  }

  showHistoryChart(bool: boolean) {
    this.utilsService.showHistoryChart.next(bool);
  }

  chartViewListner() {
    this.utilsService.showHistoryChart.subscribe((bool) => {
      this.showHistory = bool;
    });
  }
}
