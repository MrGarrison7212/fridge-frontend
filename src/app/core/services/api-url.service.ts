import {computed, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiUrlService {
  private readonly apiBaseUrl = computed(() => '/api');

  fridgeItemApiUrl = computed(() => `${this.apiBaseUrl()}/items`);
}
