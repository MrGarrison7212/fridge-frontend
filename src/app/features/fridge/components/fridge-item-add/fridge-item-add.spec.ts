import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeItemAdd } from './fridge-item-add';

describe('FridgeItemAdd', () => {
  let component: FridgeItemAdd;
  let fixture: ComponentFixture<FridgeItemAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FridgeItemAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeItemAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
