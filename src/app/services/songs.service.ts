import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  httpClient = inject(HttpClient);
  baseUrl = 'http://localhost:1234/api/songs'

  getAll() {
    
    return firstValueFrom(
    this.httpClient.get<any[]>(this.baseUrl)
    );
  }

  getById(songId: String){ 
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/${songId}`)
      );
  }

  create(formValues: any){
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}`, formValues)
    )
  }

  update(songId: string, formValues: any){
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/${songId}`, formValues)
    )
  }

  deleteById(songId: string){
    return firstValueFrom(
      this.httpClient.delete<any>(`${this.baseUrl}/${songId}`)
    )
  }

  // createHeaders() {
  //   return {
  //     headers: new HttpHeaders({
  //       'Authorization': localStorage.getItem('token_songs')!
  //     })};
  // }
}
