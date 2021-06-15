import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../type/item';
import { TypeItem } from '../type/typeItem';

@Injectable({
  providedIn: 'root'
})
export class ItemService
{
  constructor(private http: HttpClient) { }

  ListerItem(): Observable<Item[]>
  {
    return this.http.get<Item[]>(`${environment.url}/item/listerItem.php`);
  }

  ListerType(): Observable<TypeItem[]>
  {
    return this.http.get<TypeItem[]>(`${environment.url}/typeItem/listerTypeItem.php`);
  }

  ListerRessource(): Observable<any[]>
  {
    return this.http.get<any[]>(`${environment.url}/item/listerRessource.php`);
  }

  ListerRecetteItem(): Observable<any[]>
  {
    return this.http.get<any[]>(`${environment.url}/item/listerRecetteItem.php`);
  }

  AjouterItem(_info): Observable<any>
  {
    return this.http.post(`${environment.url}/item/ajouterItem.php`, _info);
  }
}
