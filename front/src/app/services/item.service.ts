import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService
{
  constructor(private http: HttpClient) { }

  AjouterItem(_info): Observable<any>
  {
    return this.http.post(`${environment.url}/item/ajouterItem.php`, _info);
  }
}
