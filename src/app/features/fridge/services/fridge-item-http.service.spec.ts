import { TestBed } from '@angular/core/testing';

import { FridgeItemHttpService } from './fridge-item-http.service';

describe('FridgeItemHttpService', () => {
  let service: FridgeItemHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FridgeItemHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
