import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewticketComponent } from './viewticket.component';

describe('ViewticketComponent', () => {
  let component: ViewticketComponent;
  let fixture: ComponentFixture<ViewticketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewticketComponent]
    });
    fixture = TestBed.createComponent(ViewticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
