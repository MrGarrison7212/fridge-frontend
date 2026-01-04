import {computed, inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiUrlService} from '../../../core/services/api-url.service';
import {Observable} from 'rxjs';
import {FridgeItem, FridgeItemCreateRequest} from '../interface/fridge-item';
import {FridgeItemsPage} from '../interface/fridge-items-page';

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

  getPage(
    page: number,
    size: number,
    sortBy: string,
    direction: 'asc' | 'desc',

  ): Observable<FridgeItemsPage<FridgeItem>>{
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    return this.httpClient.get<FridgeItemsPage<FridgeItem>>(
      `${this.fridgeItemsRequestUrl()}/page`, {params: params}
    );
  }

  getById(id: number): Observable<FridgeItem> {
    return this.httpClient.get<FridgeItem>(`${this.fridgeItemsRequestUrl()}/${id}`);
  }

  create(item: FridgeItemCreateRequest): Observable<FridgeItem> {
    return this.httpClient.post<FridgeItem>(this.fridgeItemsRequestUrl(), item);
  }

  update(id: number, item: FridgeItemCreateRequest): Observable<FridgeItem> {
    return this.httpClient.put<FridgeItem>(`${this.fridgeItemsRequestUrl()}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.fridgeItemsRequestUrl()}/${id}`);
  }
}
