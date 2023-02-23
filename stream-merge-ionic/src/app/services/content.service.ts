/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  url = environment.url;
  token = environment.token;

  constructor(private http: HttpClient) {}

  search(keyword: string, platforms: string): Observable<any> {
    return this.http
      .get(this.url + 'search', {
        headers: {
          Authorization: this.token,
        },
        params: {
          query: keyword,
          services: platforms,
        },
      })
      .pipe(map((data: any) => data.data));
  }

  getRecommended(): Observable<any> {
    return this.http
      .get(this.url + 'recommended', {
        headers: {
          Authorization: this.token,
        },
      })
      .pipe(map((data: any) => data.data));
  }

  getRandom(): Observable<any> {
    return this.http
      .get(this.url + 'random', {
        headers: {
          Authorization: this.token,
        },
      })
      .pipe(map((data: any) => data.data));
  }

  getDetails(id: string, mvt: string): Observable<any> {
    return this.http
      .get(this.url + id + '/' + mvt, {
        headers: {
          Authorization: this.token,
        },
      })
      .pipe(map((data: any) => data.data));
  }

  getGenres(): Observable<any> {
    return this.http
      .get(this.url + 'genres', {
        headers: {
          Authorization: this.token,
        },
      })
      .pipe(map((data: any) => data));
  }

  getCast(id: string, type: string): Observable<any> {
    return this.http
      .get(this.url + 'cast', {
        headers: {
          Authorization: this.token,
        },
        params: {
          id,
          type,
        },
      })
      .pipe(map((data: any) => data.cast));
  }
}
