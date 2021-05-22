import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Depot } from '../type/depot';

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  constructor(private http: HttpClient) { }

  ListerDepot(): Observable<Depot[]>
  {
    return this.http.get<Depot[]>(`${environment.url}/depot/listerDepot.php`);
  }

  AjouterDepot(_info): Observable<any[]>
  {
    return this.http.post<any[]>(`${environment.url}/depot/ajouterDepot.php`, _info);
  }

  SupprimerDepot(_info): Observable<any>
  {
    return this.http.post(`${environment.url}/depot/supprimerDepot.php`, _info)
  }

  SupprimerAllDepot(): Observable<any>
  {
    return this.http.get(`${environment.url}/depot/supprimerAllDepot.php`);
  }
}
