import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListeObj } from '../type/listeObj';

@Injectable({
  providedIn: 'root'
})
export class ListeService 
{
  constructor(private http: HttpClient) { }

  ListerListe(): Observable<ListeObj[]>
  {
    return this.http.get<ListeObj[]>(`${environment.url}/listeObj/listerListeObj.php`);
  }

  AjouterLister(_info): Observable<any>
  {
    return this.http.post(`${environment.url}/listeObj/ajouterListe.php`, _info);
  }

  ReduireQteItem(_info): Observable<any>
  {
    return this.http.post(`${environment.url}/listeObj/reduireQteItem.php`, _info);
  }
}
