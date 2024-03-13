import { TestBed } from '@angular/core/testing';

import { ViewaccidentsService } from './viewaccidents.service';

describe('ViewaccidentsService', () => {
  let service: ViewaccidentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewaccidentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
