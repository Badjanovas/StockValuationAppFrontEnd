import { TestBed } from '@angular/core/testing';

import { DividendDiscountMethodService } from './dividend-discount-method.service';

describe('DividendDiscountMethodService', () => {
  let service: DividendDiscountMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DividendDiscountMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
