import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NounPexelsService {
  private apiKey = 'WKbFPfeWg3ROpl8JZnyNQGbclJ8HiZkCIT4YSZm6BYhOBYXReSak3qFG';
  private apiUrl = 'https://api.pexels.com/v1';

  constructor(private http: HttpClient) { }

  getImages(query: string) {
    const url = `${this.apiUrl}/search?query=${query}`;
    const headers = new HttpHeaders({
      Authorization: this.apiKey
    });
    return this.http.get(url, { headers });
  }
}
