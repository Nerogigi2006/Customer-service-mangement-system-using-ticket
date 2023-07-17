import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ticketsGuard } from './tickets.guard';

describe('ticketsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => ticketsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
