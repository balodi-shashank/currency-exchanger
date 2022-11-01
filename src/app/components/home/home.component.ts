import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/service/storage/storage.service';
import { UtilsService } from 'src/app/shared/service/utils/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showHistory = false;
  pageTitle = StorageService.getItem('pageTitle');

  constructor(
    private utilsService: UtilsService
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
