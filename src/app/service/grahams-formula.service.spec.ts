import { TestBed } from '@angular/core/testing';

import { GrahamsFormulaService } from './grahams-formula.service'; 

describe('GrahamsFormulaService', () => {
  let service: GrahamsFormulaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrahamsFormulaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
