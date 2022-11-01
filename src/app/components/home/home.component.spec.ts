import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilsService } from 'src/app/shared/service/utils/utils.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let utilsService: UtilsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    utilsService = fixture.debugElement.injector.get(UtilsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate pageTitlelistener', () => {
    utilsService.pageTitle.next('hello world');
    component.pageTitlelistener();
    expect(component.pageTitle).toEqual('hello world');
  });

  it('validate pageTitlelistener', () => {
    utilsService.showHistoryChart.next(true);
    component.chartViewListner();
    expect(component.showHistory).toEqual(true);
  });
});
