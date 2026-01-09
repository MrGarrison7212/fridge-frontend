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

  it('should emit searchChange when onSearchChange is called', () => {
    const emitSpy = vi.spyOn(component.searchChange, 'emit');

    component.onSearchChange('milk');

    expect(emitSpy).toHaveBeenCalledWith('milk');
  });
});
