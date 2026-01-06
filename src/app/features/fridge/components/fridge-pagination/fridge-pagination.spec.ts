import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgePagination } from './fridge-pagination';

describe('FridgePagination', () => {
  let component: FridgePagination;
  let fixture: ComponentFixture<FridgePagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FridgePagination]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgePagination);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
