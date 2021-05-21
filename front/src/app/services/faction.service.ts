import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Faction } from '../type/faction';

@Injectable({
  providedIn: 'root'
})
export class FactionService {

  constructor(private http: HttpClient) { }

  ListerFaction(): Observable<Faction[]>
  {
    return this.http.get<Faction[]>(`${environment.url}/faction/listerFaction.php`);
  }
}
