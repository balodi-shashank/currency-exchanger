import { TestBed } from '@angular/core/testing';

import { ExchangeRateResolverService } from './exchange-rate-resolver.service';

describe('ExchangeRateResolverService', () => {
  let service: ExchangeRateResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangeRateResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
