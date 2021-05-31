import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Historique } from '../type/historique';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService 
{

  constructor(private http: HttpClient) { }

  ListerHistoriqueJournalier(): Observable<Historique[]>
  {
    return this.http.get<Historique[]>(`${environment.url}/historique/listerHistoriqueJournalier.php`);
  }

  ListerHistoriqueGlobal(): Observable<Historique[]>
  {
    return this.http.get<Historique[]>(`${environment.url}/historique/listerHistoriqueGlobal.php`)
  }

  SupprimerHistoriqueJournalier(): Observable<any>
  {
    return this.http.get(`${environment.url}/historique/suppHistoriqueJournalier.php`);
  }

  SupprimerHistoriqueGlobal(): Observable<any>
  {
    return this.http.get(`${environment.url}/historique/suppHistoriqueGlobal.php`);
  }
}
