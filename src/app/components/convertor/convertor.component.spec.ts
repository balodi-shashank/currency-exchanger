import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ConvertorComponent } from './convertor.component';

describe('ConvertorComponent', () => {
  let component: ConvertorComponent;
  let fixture: ComponentFixture<ConvertorComponent>;
  let amountInput: DebugElement;
  let convertEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    amountInput  = fixture.debugElement.query(By.css('input[type=number]'));
    convertEl = fixture.debugElement.query(By.css('button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when input value is null button should be disabled', () => {
    amountInput.nativeElement.value = 0;
    expect(convertEl.nativeElement.disabled).toBeTruthy();
  });
});
