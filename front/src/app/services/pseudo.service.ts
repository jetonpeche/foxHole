import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pseudo } from '../type/pseudo';

@Injectable({
  providedIn: 'root'
})
export class PseudoService 
{
  constructor(private http: HttpClient) { }

  ListerPseudo(): Observable<Pseudo[]>
  {
    return this.http.get<Pseudo[]>(`${environment.url}/pseudo/listerPseudo.php`);
  }

  AjouterPseudo(_info): Observable<any>
  {
    return this.http.post(`${environment.url}/pseudo/ajouterPseudo.php`, _info);
  }
}