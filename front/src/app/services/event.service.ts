import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  ListerEvent(): Observable<any>
  {
    return this.http.get(`${environment.url}/event/listerEvent.php`); 
  }

  AjouterEvent(_info): Observable<any>
  {
    return this.http.post(`${environment.url}/event/ajouterEvent.php`, _info);
  }

  SupprimerEvent(_info): Observable<any>
  {
    return this.http.post(`${environment.url}/event/supprimerEvent.php`, _info);
  }
}
