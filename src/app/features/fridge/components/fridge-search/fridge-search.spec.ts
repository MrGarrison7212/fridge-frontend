import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeSearch } from './fridge-search';

describe('FridgeSearch', () => {
  let component: FridgeSearch;
  let fixture: ComponentFixture<FridgeSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FridgeSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
