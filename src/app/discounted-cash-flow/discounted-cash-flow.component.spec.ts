import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountedCashFlowComponent } from './discounted-cash-flow.component';

describe('DiscountedCashFlowComponent', () => {
  let component: DiscountedCashFlowComponent;
  let fixture: ComponentFixture<DiscountedCashFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscountedCashFlowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscountedCashFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
