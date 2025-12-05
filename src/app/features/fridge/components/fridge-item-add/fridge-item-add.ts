import {CommonModule} from '@angular/common';
import {Component, input, output} from '@angular/core';
import {FridgeItemCreateRequest} from '../../interface/fridge-item';
import {FridgeCategory} from '../../enum/fridge-category';

@Component({
  selector: 'app-fridge-item-add',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fridge-item-add.html',
  styleUrls: ['./fridge-item-add.scss', './fridge-item-add.tw.css']
})
export class FridgeItemAdd {
  saving = input(false);

  readonly add    = output<FridgeItemCreateRequest>();
  readonly cancel = output<void>();
  readonly FridgeCategory = FridgeCategory;

  form: FridgeItemCreateRequest = {
    name: '',
    category: FridgeCategory.Other,
    quantity: 1,
    unit: 'pcs',
    storedAt: '',
    bestBefore: '',
    notes: '',
  };

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();

    if (this.saving()) {
      return;
    }

    if (!this.form.name.trim()
      || !this.form.category
      || !this.form.unit
      || !this.form.storedAt
      || !this.form.bestBefore
      || !this.form.quantity
    ) {
      return;
    }

    const createRequest: FridgeItemCreateRequest = this.form;

    this.add.emit(createRequest);
  }

  onCancelClick(): void {
    if (this.saving()) {
      return;
    }
    this.cancel.emit();
  }
}
