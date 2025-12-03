import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeView } from './fridge-view';

describe('FridgeView', () => {
  let component: FridgeView;
  let fixture: ComponentFixture<FridgeView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FridgeView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
