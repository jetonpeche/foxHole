import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ListeService } from 'src/app/services/liste.service';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.css']
})

export class FactoryComponent implements OnInit 
{
  listeListeNom: any[];
  listeObj: any[] = [];

  private idListeChoisis: string;

  constructor(private toastrServ: ToastrService, private listeService: ListeService) { }

  ngOnInit(): void
  {
    this.listeListeNom = JSON.parse(sessionStorage.getItem("listeListeObj"));
  }

  ListerObj(_id: string): void
  {
    this.idListeChoisis = _id;
    this.listeObj.length = 0;

    const INDEX = this.listeListeNom.findIndex(liste => liste.idListFactory == _id);
    this.listeObj = this.listeListeNom[INDEX].listeItem;
  }

  ReduireQte(_idItem: string, _qte: number): void
  {
    // MAJ qte restante
    const ITEM = this.listeObj.find(item => item.idItem == _idItem);
    const QTE_RESTANTE = ITEM.qte - _qte;

    if(QTE_RESTANTE > 0)
    {
      const DATA = { idListItem: this.idListeChoisis, idItem: _idItem, qte: _qte };

      this.listeService.ReduireQteItem(DATA).subscribe(
        () =>
        {
          if(QTE_RESTANTE == 0)
          {
            const INDEX = this.listeObj.findIndex(item => item.idItem == _idItem);
            this.listeObj.splice(INDEX, 1);
          }
          else
          {
            ITEM.qte = QTE_RESTANTE;
          }
        }
      );
    }
    else
    {
      this.toastrServ.warning("La quantité ne peut est négative");
    }    
  }
}
