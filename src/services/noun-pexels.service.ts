import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NounPexelsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getImages(query: string) {
    const url = `${this.apiUrl}/search`;
    const body = { query };
    return this.http.post(url, body);
  }
}
