import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendDiscountModelComponent } from './dividend-discount-model.component';

describe('DividendDiscountModelComponent', () => {
  let component: DividendDiscountModelComponent;
  let fixture: ComponentFixture<DividendDiscountModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DividendDiscountModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DividendDiscountModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
