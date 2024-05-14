import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrahamsFormulaComponent } from './grahams-formula.component';

describe('GrahamsFormulaComponent', () => {
  let component: GrahamsFormulaComponent;
  let fixture: ComponentFixture<GrahamsFormulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrahamsFormulaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrahamsFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
