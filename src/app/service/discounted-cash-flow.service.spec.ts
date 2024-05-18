import { TestBed } from '@angular/core/testing';

import { DiscountedCashFlowService } from './discounted-cash-flow.service';

describe('DiscountedCashFlowService', () => {
  let service: DiscountedCashFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountedCashFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
