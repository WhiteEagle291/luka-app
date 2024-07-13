import { TestBed } from '@angular/core/testing';

import { LukaService } from './luka.service';

describe('LukaService', () => {
  let service: LukaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LukaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
