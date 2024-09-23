import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginTsGuard } from './login.ts.guard';

describe('loginTsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginTsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
