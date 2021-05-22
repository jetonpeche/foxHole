import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DepotService } from 'src/app/services/depot.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ajout-depot',
  templateUrl: './ajout-depot.component.html',
  styleUrls: ['./ajout-depot.component.css']
})
export class AjoutDepotComponent implements OnInit 
{
  ajout: boolean = false;
  listeInput: any[] = [];

  constructor(private depotService: DepotService, private toastrServ: ToastrService, private dialogRef: MatDialogRef<AjoutDepotComponent>) { }

  ngOnInit(): void {
  }

  AjouterInput(_nb: number): void
  {    
    this.listeInput.length = 0;

    for (let i = 1; i <= +_nb; i++)
    {
      this.listeInput.push({ nameNom: `nomDepot${i}`, nameCode: `codeDepot${i}` });
    }
  }

  AjouterDepot(_form: NgForm): void
  {
    let liste: any[] = [];

    console.log(_form.value);

    for (let i = 1; i <= _form.value["nbDepot"]; i++) 
    {
      liste.push({ nom: _form.value["nomDepot" + i.toString()], code: _form.value["codeDepot" + i.toString()] });
    }
    
    this.depotService.AjouterDepot(liste).subscribe(
      () =>
      {
        this.ajout = true;

        this.toastrServ.success("Les depots sont ajoutés", "Depot(s) Ajouté(s)");
        this.dialogRef.close();
      },
      () =>
      {
        this.toastrServ.error(environment.msgHttp, "Ajout impossible");
      }
    );
  }
}
