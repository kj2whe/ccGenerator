import { TestBed } from '@angular/core/testing';

import { FormatServiceService } from './format.service';

describe('FormatServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormatServiceService = TestBed.get(FormatServiceService);
    expect(service).toBeTruthy();
  });
});
