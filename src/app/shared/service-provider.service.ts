import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceProvider {
  server: string = 'http://gateway.we-builds.com/wtm-api/';

  constructor(private http: HttpClient) {}

  get(url: string) {
    return this.http.get(url);
  }

  post(url: string, param: any) {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.server + url, param, { headers: headers });
  }

  getUrl(url: string) {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.get(url, { headers: headers });
  }

  SendIPAddress(page: string) {
    this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
      this.post('ip/createCms', {
        ipAddress: res.ip,
        page: page,
        userName: localStorage.getItem('username') ?? '',
      }).subscribe();
    });
  }
}
