import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ItemService } from 'src/app/services/item.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.css']
})
export class RecetteComponent implements OnInit 
{
  listeRecette: any[] = [];

  private listeRecetteClone: any[] = [];

  constructor(private itemService: ItemService, private toastrServ: ToastrService) { }

  ngOnInit(): void 
  {
    this.itemService.ListerRecetteItem().subscribe(
      (liste) =>
      {
        this.listeRecette = this.listeRecetteClone = liste;
      },
      () =>
      {
        this.toastrServ.error(environment.msgHttp, "Erreur réseau");
      }
    );
  }

  EstDansMassFactory(_index: number): boolean
  {
    let idType: number = +this.listeRecette[_index].idType;

    return idType == 1 || idType == 2 || idType == 3 ? true : false;
  }

  AfficherQteRecette(_index: number, _qte: number, _massFactory: boolean): string
  {
    let recette: string = "";
    const RECETTE = this.listeRecette[_index].recette;

    _qte = _qte == 0 ? 1 : _qte;

    if(!_massFactory)
    {
      for (const ELEMENT of RECETTE) 
      {
        recette += ELEMENT.qteItem * _qte + " " + ELEMENT.nomItem + " ";
      }
    }
    else
    {
      for (const ELEMENT of RECETTE) 
      {
        const PRIX_INIT: number = ELEMENT.qteItem;

        let prixFinal: number = 0;
        let pourcentage: number = 0.9;

        for (let i = 1; i <= _qte; i++) 
        {
          prixFinal += (PRIX_INIT * pourcentage);

          if(i < 5)
            pourcentage -= 0.1;

          prixFinal = Math.trunc(prixFinal);
        }

        recette += prixFinal + " " + ELEMENT.nomItem + " ";
      }
    }

    return recette;
  }

  FiltrerTableau(_text: string): void
  {
    // premiere lettre en majuscule
    _text = _text.charAt(0).toUpperCase() + _text.slice(1);
    this.listeRecette = this.listeRecetteClone.filter(recette => recette.nomItem.startsWith(_text));  
  }
}