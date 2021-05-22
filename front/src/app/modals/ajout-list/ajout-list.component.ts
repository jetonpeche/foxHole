import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { ToastrService } from 'ngx-toastr';
import { ListeService } from 'src/app/services/liste.service';
import { Faction } from 'src/app/type/faction';
import { Item } from 'src/app/type/item';
import { TypeItem } from 'src/app/type/typeItem';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ajout-list',
  templateUrl: './ajout-list.component.html',
  styleUrls: ['./ajout-list.component.css']
})

export class AjoutListComponent implements OnInit 
{
  idFaction: string;
  idType: string;

  ajout: boolean = false;

  listeItem: Item[] = [];
  listeType: TypeItem[] = [];
  listeFaction: Faction[] = [];

  private listeItemValide: any[] = [];

  private listeItemG: Item[];

  constructor(private listeService: ListeService, private toastrServ: ToastrService, private dialogRef: MatDialogRef<AjoutListComponent>) { }

  ngOnInit(): void 
  {
    this.listeType = JSON.parse(sessionStorage.getItem("listeType"));
    this.listeItemG = JSON.parse(sessionStorage.getItem("listeItem"));
    
    this.listeFaction = JSON.parse(sessionStorage.getItem("listeFaction"));
  }

  AjouterListe(_form: NgForm): void
  {
    const DATA = 
    { 
      nomListe: _form.value["nomListe"], 
      qte: _form.value["qte"],
      listeItem: this.listeItemValide 
    };

    this.listeService.AjouterLister(DATA).subscribe(
      () =>
      {
        this.ajout = true;
        this.toastrServ.success("La liste" + DATA.nomListe + "à été ajouté");
        this.dialogRef.close();
      },
      () =>
      {
        this.toastrServ.error(environment.msgHttp, "erreur réseaux");
      }
    );
  }

  GenererListeItem(): void
  {    

    this.listeItem.length = 0;

    this.listeItem = this.listeItemG.filter(item => (item.idType == this.idType && item.idFaction == this.idFaction) || (item.idType == this.idType && item.idFaction == "3"));
  }

  EstSelectionner(_id): boolean
  {
    const ITEM = this.listeItemValide.find(item => item.idItem == _id);

    return ITEM != null ? true : false;
  }

  ClickCheckBox(_idItem: string, _estCocher: boolean)
  {
    if(_estCocher)
    {
      this.listeItemValide.push({ idItem: _idItem });
    }
    else
    {
      const INDEX = this.listeItemValide.findIndex(item => item.idItem == _idItem);
      this.listeItemValide.splice(INDEX, 1);
    }
  }
}
