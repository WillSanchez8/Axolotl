import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PexelsServiceService {

  //se define la url de la API
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getImages(query: string) {
    return this.http.get(`${this.apiUrl}/api/pexels/${query}`);
  }
}
