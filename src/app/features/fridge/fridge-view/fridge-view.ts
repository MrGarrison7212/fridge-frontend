import {CommonModule} from '@angular/common';
import {Component, computed, inject, signal} from '@angular/core';
import {FridgeItemHttpService} from '../services/fridge-item-http.service';
import {FridgeItem, FridgeItemCreateRequest} from '../interface/fridge-item';
import {FridgeTable} from '../components/fridge-table/fridge-table';
import {FridgeSearch} from '../components/fridge-search/fridge-search';
import {FridgeItemAdd} from '../components/fridge-item-add/fridge-item-add';
import {filterFridgeItems} from '../utils/fridge-filter.util';

@Component({
  selector: 'app-fridge-view',
  standalone: true,
  imports: [CommonModule, FridgeTable, FridgeSearch, FridgeItemAdd],
  templateUrl: './fridge-view.html',
  styleUrls: ['./fridge-view.scss', './fridge-view.tw.css']
})
export class FridgeView {
  private readonly http = inject(FridgeItemHttpService);

  private readonly _items = signal<FridgeItem[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  readonly search = signal('');

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

    this.http.getAll().subscribe({
      next: (items) => {
        this._items.set(items);
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
      next: (created) => {
        this._items.update((items) => [created, ...items]);
        this.isSaving.set(false);
        this.isAddOpen.set(false);
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
        this._items.update((items) =>
          items.filter((item) => item.id !== id)
        );
      },
      error: (err) => {
        console.error(err);
        this.error.set('Failed to delete fridge item.');
      },
    });
  }
}
