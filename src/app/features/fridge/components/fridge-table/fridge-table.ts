import {Component, input, output} from '@angular/core';
import {FridgeItem} from '../../interface/fridge-item';
import {computeExpiryStatus} from '../../utils/expiry-statys.util';
import {ExpiryStatus} from '../../enum/expiry-status';

@Component({
  selector: 'app-fridge-table',
  imports: [],
  templateUrl: './fridge-table.html',
  styleUrls: ['./fridge-table.scss', 'fridge-table.tw.css']
})
export class FridgeTable {
  items = input.required<FridgeItem[]>();

  readonly expiryStatus = computeExpiryStatus;
  readonly ExpiryStatus = ExpiryStatus;

  readonly deleteItem = output<number>();

  onDeleteClick(id: number, event: MouseEvent): void {
    event.stopPropagation();
    this.deleteItem.emit(id);
  }
}
