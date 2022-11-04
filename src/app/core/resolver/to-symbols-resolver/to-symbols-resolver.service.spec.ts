import { TestBed } from '@angular/core/testing';

import { ToSymbolsResolverService } from './to-symbols-resolver.service';

describe('ToSymbolsResolverService', () => {
  let service: ToSymbolsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToSymbolsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
