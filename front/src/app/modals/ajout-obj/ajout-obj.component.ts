import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-ajout-obj',
  templateUrl: './ajout-obj.component.html',
  styleUrls: ['./ajout-obj.component.css']
})
export class AjoutObjComponent
{
  listeInput: any[] = [];

  visible: boolean;

  constructor(private itemService: ItemService, private toastrServ: ToastrService, private dialogRef: MatDialogRef<AjoutObjComponent>) { }

  AjouterItem(_form: NgForm): void
  {    
    let _liste: any[] = [];

    // construction d'une liste
    for (let i = 1; i <= _form.value["nbObj"]; i++) 
    {
      const TYPE = _form.value[`nameTypeObj${i}`];
      const NOM = _form.value[`nomObj${i}`];

      let _idFaction;

      if(TYPE == "1" || TYPE == "3" || TYPE == "7")
      {
        _idFaction = _form.value[`nomCheck${i}`] == true ? 2 : 1;
      }

      _liste.push({ type: TYPE, nom: NOM, idFaction: _idFaction });
    }
    
    this.itemService.AjouterItem(_liste).subscribe(
      () =>
      {
        this.toastrServ.success("Le / les item(s) on été ajouté(s)", "Ajout effectué")
        this.dialogRef.close();
      },
      () =>
      {
        this.toastrServ.error(environment.msgHttp, "Ajout impossible");
      }
    );
  }

  PossedeFaction(_nb: string): boolean
  {
    return _nb == "1" || _nb == "3" ||_nb == "7" ? true : false;
  }

  AjouterInput(_nb: number): void
  {   
    this.listeInput.length = 0;

    for (let i = 1; i <= _nb; i++) 
    {
      this.listeInput.push({ nameTypeObj: `nameTypeObj${i}`, nameObj: `nomObj${i}`, nameCheck: `nomCheck${i}`});
    }
  }
}
