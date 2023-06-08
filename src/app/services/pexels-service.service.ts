import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PexelsServiceService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getImages(query: string) {
    return this.http.get(`${this.apiUrl}/api/pexels/${query}`);
  }

  getImagesWithLabels(query: string, labels: string[]) {
    const params = new HttpParams()
      .set('query', query)
      .set('labels', labels.join(','));
    return this.http.get(`${this.apiUrl}/api/pexels/labels`, { params });
  }
}
