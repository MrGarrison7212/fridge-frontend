import {CommonModule} from '@angular/common';
import {Component, computed, inject, signal} from '@angular/core';
import {FridgeItemHttpService} from '../services/fridge-item-http.service';
import {FridgeItem, FridgeItemCreateRequest} from '../interface/fridge-item';
import {FridgeTable} from '../components/fridge-table/fridge-table';
import {FridgeSearch} from '../components/fridge-search/fridge-search';
import {FridgeItemAdd} from '../components/fridge-item-add/fridge-item-add';
import {filterFridgeItems} from '../utils/fridge-filter.util';
import {FridgeSortBar} from '../components/fridge-sort-bar/fridge-sort-bar';

@Component({
  selector: 'app-fridge-view',
  standalone: true,
  imports: [CommonModule, FridgeTable, FridgeSearch, FridgeItemAdd, FridgeSortBar],
  templateUrl: './fridge-view.html',
  styleUrls: ['./fridge-view.scss', './fridge-view.tw.css']
})
export class FridgeView {
  private readonly http = inject(FridgeItemHttpService);

  private readonly _items = signal<FridgeItem[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
//search
  readonly search = signal('');
//pagging
  readonly page = signal(0);
  readonly size = signal(5);
  readonly totalPages = signal(0);
  readonly totalElements = signal(0);
//sort
  readonly sortBy = signal<'storedAt' | 'bestBefore' | 'name'>('storedAt');
  readonly direction = signal<'asc' | 'desc'>('asc');
//add
  readonly isAddOpen = signal(false);
  readonly isSaving  = signal(false);

  readonly items = computed(() => this._items());

  readonly filteredItems = computed(() =>
    filterFridgeItems(this._items(), this.search())
  );

  constructor() {
    this.reload();
  }

  reload(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.http.getAllPaged(
      this.page(),
      this.size(),
      this.sortBy(),
      this.direction(),
    ).subscribe({
      next: (page) => {
        this._items.set(page.content);
        this.totalPages.set(page.totalPages);
        this.totalElements.set(page.totalElements);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Failed to load fridge items.');
        this.isLoading.set(false);
      },
    });
  }

  onAddClick(): void {
    this.isAddOpen.set(true);
  }

  onSearchChange(value: string): void {
    this.search.set(value);
  }

  onAddCancel(): void {
    this.isAddOpen.set(false);
  }

  onAddItem(createRequest: FridgeItemCreateRequest): void {
    this.isSaving.set(true);
    this.error.set(null);

    this.http.create(createRequest).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.isAddOpen.set(false);
        this.reload();
      },
      error: (err) => {
        console.error(err);
        this.error.set('Failed to create fridge item.');
        this.isSaving.set(false);
      },
    });
  }

  onDeleteItem(id: number): void {
    const confirmed = window.confirm('Are you sure you want to remove this item from the fridge?');
    if (!confirmed) {
      return;
    }

    this.http.delete(id).subscribe({
      next: () => {
        this.reload();
      },
      error: (err) => {
        console.error(err);
        this.error.set('Failed to delete fridge item.');
      },
    });
  }

  goToPage(page: number): void {
    if(page < 0 || page >= this.totalPages()) {
      return;
    }
    this.page.set(page);
    this.reload();
  }

  nextPage(): void {
    this.goToPage(this.page() + 1);
  }

  prevPage(): void {
    this.goToPage(this.page() - 1);
  }

  onSort(field: 'storedAt' | 'bestBefore' | 'name'): void {
    // ako klikneš istifield, samo promeni smer
    if (this.sortBy() === field) {
      this.direction.set(this.direction() === 'asc' ? 'desc' : 'asc');
    } else {
      // ako je novi field, setuj ga i vrati smer na ASC
      this.sortBy.set(field);
      this.direction.set('asc');
    }

    // kod promene sort-a obično se vraćamo na prvu stranu
    this.page.set(0);
    this.reload();
  }

  toggleDirection(): void {
    this.direction.set(this.direction() === 'asc' ? 'desc' : 'asc');
    this.page.set(0);
    this.reload();
  }

}
