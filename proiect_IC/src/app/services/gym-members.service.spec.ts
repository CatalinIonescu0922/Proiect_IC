import { TestBed } from '@angular/core/testing';

import { GymMembersService } from './gym-members.service';

describe('GymMembersService', () => {
  let service: GymMembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GymMembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
