import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceProvider {

  // ng build --base-href "/tkm/"

  // server: string = 'https://gateway.we-builds.com/thai-kao-mai-api/';
  // server: string = 'https://www.thaikaomai.or.th/thai-kao-mai-api/';
  server: string = 'http://localhost:8600/';

  constructor(private http: HttpClient, private encryptionService: EncryptionService) { }

  get(url: string) {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.server + url, { headers: headers });
  }

  post(url: string, param: any) {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.server + url, param, { headers: headers });
  }

  postXKey(url: string, param: any) {
    const dekGenZ = (param.idcard ?? "") != "" ? this.encryptionService.encrypt(param.idcard) : "";
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers = headers.append('dek-gen-z', dekGenZ);
    return this.http.post(this.server + url, param, { headers: headers });
  }

  getUrl(url: string) {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.get(url, { headers: headers });
  }

  SendIPAddress(page: string) {
    this.http.get('https://api.ipify.org/?format=json').subscribe((res: any) => {
      this.post('ip/create', {
        ipAddress: res.ip,
        page: page,
        userName: localStorage.getItem('username') ?? '',
      }).subscribe();
    });
  }
}
