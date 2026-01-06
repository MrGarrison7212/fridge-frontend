import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeSortBar } from './fridge-sort-bar';

describe('FridgeSortBar', () => {
  let component: FridgeSortBar;
  let fixture: ComponentFixture<FridgeSortBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FridgeSortBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeSortBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
