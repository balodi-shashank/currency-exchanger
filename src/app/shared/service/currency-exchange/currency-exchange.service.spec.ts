import { TestBed } from '@angular/core/testing';

import { CurrencrExchangeService } from './currency-exchange.service';

describe('CurrencrExchangeService', () => {
  let service: CurrencrExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencrExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
