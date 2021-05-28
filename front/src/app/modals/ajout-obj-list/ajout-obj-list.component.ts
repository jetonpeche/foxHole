import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ListeService } from 'src/app/services/liste.service';
import { Faction } from 'src/app/type/faction';
import { Item } from 'src/app/type/item';
import { TypeItem } from 'src/app/type/typeItem';

@Component({
  selector: 'app-ajout-obj-list',
  templateUrl: './ajout-obj-list.component.html',
  styleUrls: ['./ajout-obj-list.component.css']
})
export class AjoutObjListComponent implements OnInit 
{
  listeItemG: Item[];
  listeItem:  Item[] = [];

  listeFaction: Faction[];
  listeType: TypeItem[];

  idFaction: string;
  idType: string;

  private idListeChoisie: string;

  private listeSave: any = 
  {
    nomListFactory: null,
    listeItem: []
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private toastrServ: ToastrService, private listeService: ListeService, private dialogRef: MatDialogRef<AjoutObjListComponent>) { }

  ngOnInit(): void 
  {
    this.SaveListeOriginal();

    this.idListeChoisie = this.data.liste.idListFactory;   
    
    this.listeItemG = JSON.parse(sessionStorage.getItem("listeItem"));
    this.listeFaction = JSON.parse(sessionStorage.getItem("listeFaction"));
    this.listeType = JSON.parse(sessionStorage.getItem("listeType"));
  }

  GenererListeItem(): void
  {
    this.listeItem.length = 0;

    this.listeItem = this.listeItemG.filter(item => (item.idType == this.idType && item.idFaction == this.idFaction) || (item.idType == this.idType && item.idFaction == "3"));
  }

  EstDansListe(_idItem: string): boolean
  {
    const ITEM = this.data.liste.listeItem.find(item => item.idItem == _idItem);

    return ITEM != null ? true : false;
  }

  AjouterItem(_qte: string, _item: Item): void
  {
    this.data.liste.listeItem.push({ idItem: _item.idItem, nomItem: _item.nomItem, qte: _qte });
  }

  ModifQteItem(_qte: number, _idItem: string): void
  {
    const ITEM = this.data.liste.listeItem.find(item => item.idItem == _idItem);
    ITEM.qte = _qte;    
  }

  SupprimerItem(_idItem: string): void
  {
    const INDEX = this.data.liste.listeItem.findIndex(item => item.idItem == _idItem);
    this.data.liste.listeItem.splice(INDEX, 1);
  }

  AfficherQte(_idItem: string): number
  {
    const ITEM = this.data.liste.listeItem.find(item => item.idItem == _idItem);

    return ITEM != null ? ITEM.qte : "";
  }

  ModifierListe(_form: NgForm): void
  {
    const DATA = { idListe: this.idListeChoisie, nomListe: _form.value["nomListe"], listeItem: this.data.liste.listeItem };
    console.log(DATA);

    this.listeService.ModifierListe(DATA).subscribe(
      () =>
      {
        this.toastrServ.success("La liste: " + DATA.nomListe + " est mise a jour", "MAJ liste");
        this.dialogRef.close();
      }
    );
  }

  AnnulerModif(): void
  {
    this.data.liste.nomListFactory = this.listeSave.nomListFactory;
    this.data.liste.listeItem = this.listeSave.listeItem;
  }

  private SaveListeOriginal(): void
  {
    this.listeSave.nomListFactory = this.data.liste.nomListFactory;

    for (const element of this.data.liste.listeItem) 
    {
      this.listeSave.listeItem.push({ idItem: element.idItem, nomItem: element.nomItem, qte: element.qte });
    }
  }

}
