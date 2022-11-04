import { TestBed } from '@angular/core/testing';

import { CustomPreLoadingStrategyService } from './custom-pre-loading-strategy.service';

describe('CustomPreLoadingStrategyService', () => {
  let service: CustomPreLoadingStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomPreLoadingStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
