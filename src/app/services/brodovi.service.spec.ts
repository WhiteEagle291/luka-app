import { TestBed } from '@angular/core/testing';

import { BrodService } from './brodovi.service';

describe('BrodoviService', () => {
  let service: BrodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
