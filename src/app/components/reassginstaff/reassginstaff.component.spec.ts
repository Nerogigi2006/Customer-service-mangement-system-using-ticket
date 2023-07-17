import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReassginstaffComponent } from './reassginstaff.component';

describe('ReassginstaffComponent', () => {
  let component: ReassginstaffComponent;
  let fixture: ComponentFixture<ReassginstaffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReassginstaffComponent]
    });
    fixture = TestBed.createComponent(ReassginstaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
