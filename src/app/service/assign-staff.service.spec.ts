import { TestBed } from '@angular/core/testing';

import { AssignStaffService } from './assign-staff.service';

describe('AssignStaffService', () => {
  let service: AssignStaffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignStaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
