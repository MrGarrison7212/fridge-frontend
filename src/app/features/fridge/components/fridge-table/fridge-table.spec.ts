import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeTable } from './fridge-table';

describe('FridgeTable', () => {
  let component: FridgeTable;
  let fixture: ComponentFixture<FridgeTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FridgeTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeTable);

    fixture.componentRef.setInput('items', []);

    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
