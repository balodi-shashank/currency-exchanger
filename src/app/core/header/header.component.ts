import { Component } from '@angular/core';
import { StorageService } from 'src/app/shared/service/storage/storage.service';
import { UtilsService } from 'src/app/shared/service/utils/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private utilsService: UtilsService) {}

  showHistoryChart(bool: boolean, curr: string) {
    const showHistory = StorageService.getItem('showHistory');
    if(showHistory !== bool.toString()) {   
      this.utilsService.historyChartFor.next(bool.toString());
    }
    const historyChartCurr = StorageService.getItem('historyChartCurr');
    if(historyChartCurr !== curr) {   
      this.utilsService.historyChartFor.next(curr);
    }
  }
}
