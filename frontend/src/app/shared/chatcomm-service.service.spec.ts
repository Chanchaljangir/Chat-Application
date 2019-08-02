import { TestBed } from '@angular/core/testing';

import { ChatcommServiceService } from './chatcomm-service.service';

describe('ChatcommServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatcommServiceService = TestBed.get(ChatcommServiceService);
    expect(service).toBeTruthy();
  });
});
