import { TestBed } from '@angular/core/testing';

import { SymbolsResolverService } from './symbols-resolver.service';

describe('SymbolsResolverService', () => {
  let service: SymbolsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SymbolsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
