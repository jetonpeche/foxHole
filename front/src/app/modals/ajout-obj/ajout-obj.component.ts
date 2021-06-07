import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Faction } from 'src/app/type/faction';
import { TypeItem } from 'src/app/type/typeItem';
import { environment } from 'src/environments/environment';
import { ItemService } from '../../services/item.service';

type Recette = 
{
  idItem: string,
  qteItem: string,
  index: number
}

type ItemRecette = 
{
  nomItem: string,
  idTypeItem: string,
  idFaction: string,

  recette: any
}

@Component({
  selector: 'app-ajout-obj',
  templateUrl: './ajout-obj.component.html',
  styleUrls: ['./ajout-obj.component.css']
})
export class AjoutObjComponent implements OnInit
{
  listeInput: any[] = [];
  listeType: TypeItem[] = [];
  listeFaction: Faction[] = [];
  listeRessource: any[] = [];

  private listeRecette: Recette[] = [];

  ajout: boolean = false;

  constructor(private itemService: ItemService, private toastrServ: ToastrService, private dialogRef: MatDialogRef<AjoutObjComponent>) { }

  ngOnInit(): void
  {
    this.listeType = JSON.parse(sessionStorage.getItem("listeType"));
    this.listeFaction = JSON.parse(sessionStorage.getItem("listeFaction"));

    this.itemService.ListerRessource().subscribe(
      (_liste) =>
      {
        this.listeRessource = _liste;
      },
      () =>
      {
        this.toastrServ.error(environment.msgHttp, "Ajout impossible");
      }
    );
  }

  AjouterItem(_form: NgForm): void
  {      
    let _liste: ItemRecette[] = [];

    // construction d'une liste
    for (let i = 1; i <= _form.value["nbObj"]; i++) 
    {
      const TYPE = _form.value[`nameTypeObj${i}`];
      const NOM = _form.value[`nomObj${i}`];

      const ITEM_RECETTE = this.listeRecette.filter(item => item.index == i - 1);

      _liste.push({ idTypeItem: TYPE, nomItem: NOM, idFaction: _form.value[`nomCheck${i}`], recette: ITEM_RECETTE });
    }
    
    this.itemService.AjouterItem(_liste).subscribe(
      () =>
      {
        this.ajout = true;
        this.toastrServ.success("Le / les item(s) on été ajouté(s)", "Ajout effectué")
        this.dialogRef.close();
      },
      () =>
      {
        this.toastrServ.error(environment.msgHttp, "Ajout impossible");
      }
    );
  }

  AjouterInput(_nb: number): void
  {   
    this.listeInput.length = 0;
    this.listeRecette.length = 0;

    for (let i = 1; i <= _nb; i++) 
    {
      this.listeInput.push({ nameTypeObj: `nameTypeObj${i}`, nameObj: `nomObj${i}`, nameCheck: `nomCheck${i}`});
    }
  }

  AjouterItemRecette(_index: number, _idItem: string, _qte: string): void
  {
    this.listeRecette.push({ idItem: _idItem, index: _index, qteItem: _qte });

    console.log(this.listeRecette);
  }

  SupprimerItemRecette(_index: number, _idItem: string, _input): void
  {
    const INDEX = this.listeRecette.findIndex(item => item.index == _index && item.idItem == _idItem);
    this.listeRecette.splice(INDEX, 1);

    _input.value = "";

    console.log(this.listeRecette);
  }

  ItemEstDansRecette(_index: number, _idItem: string): boolean
  {
    const ITEM = this.listeRecette.find(item => item.index == _index && item.idItem == _idItem);

    return ITEM != null ? true : false;
  }
}
