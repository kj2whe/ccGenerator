import { TestBed } from '@angular/core/testing';

import { LuhnService } from './LuhnService';

describe('LuhnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LuhnService = TestBed.get(LuhnService);
    expect(service).toBeTruthy();
  });
});
