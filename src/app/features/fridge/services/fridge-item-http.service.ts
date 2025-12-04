import {computed, inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiUrlService} from '../../../core/services/api-url.service';
import {Observable} from 'rxjs';
import {FridgeItem} from '../interface/fridge-item';

type FridgeItemRecDto = Omit<FridgeItem, 'id'>

@Injectable({
  providedIn: 'root',
})
export class FridgeItemHttpService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrlService = inject(ApiUrlService);

  private readonly fridgeItemsRequestUrl = computed(() => this.apiUrlService.fridgeItemApiUrl());

  getAll(): Observable<FridgeItem[]> {
    return this.httpClient.get<FridgeItem[]>(this.fridgeItemsRequestUrl());
  }

  getById(id: number): Observable<FridgeItem> {
    return this.httpClient.get<FridgeItem>(`${this.fridgeItemsRequestUrl()}/${id}`);
  }

  create(item: FridgeItemRecDto): Observable<FridgeItem> {
    return this.httpClient.post<FridgeItem>(this.fridgeItemsRequestUrl(), item);
  }

  update(id: number, item: FridgeItemRecDto): Observable<FridgeItem> {
    return this.httpClient.put<FridgeItem>(`${this.fridgeItemsRequestUrl()}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.fridgeItemsRequestUrl()}/${id}`);
  }
}
