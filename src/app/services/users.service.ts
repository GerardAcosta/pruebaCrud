import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:1234/api/users'

  register(formValue: any){
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/register`, formValue)
    )
  }

  login(formValue: any){
    console.log("Hola service")
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/login`, formValue)
    )
  }

  refreshToken() {
    const refreshToken = this.getRefreshToken();
    console.log(refreshToken)
    const body = {refreshToken: refreshToken}
    return this.httpClient.post<any>(`${this.baseUrl}/refresh`, body)
  }

  isLogged(): boolean{
    return localStorage.getItem('access_refresh') ? true : false;
  }

  getAccessToken() {
    return localStorage.getItem('access_refresh');
  };

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }
}
