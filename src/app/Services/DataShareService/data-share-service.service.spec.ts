import { TestBed } from '@angular/core/testing';

import { DataShareServiceService } from './data-share-service.service';

describe('DataShareServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataShareServiceService = TestBed.get(DataShareServiceService);
    expect(service).toBeTruthy();
  });
});
