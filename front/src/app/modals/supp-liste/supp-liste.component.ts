import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ListeService } from 'src/app/services/liste.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-supp-liste',
  templateUrl: './supp-liste.component.html',
  styleUrls: ['./supp-liste.component.css']
})
export class SuppListeComponent
{
  listeSupp: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<SuppListeComponent>, private toastrServ: ToastrService, private listeService: ListeService) { }

  SupprimerListe(_form: NgForm): void
  {
    this.listeService.SupprimerListe(_form.value).subscribe(
      () =>
      {
        this.listeSupp = true;

        for (const element of _form.value["listeIdListe"]) 
        {
          const INDEX = this.data.liste.findIndex(liste => liste.idListFactory == element);

          if(INDEX != -1)
            this.data.liste.splice(INDEX, 1);
        }

        if(_form.value["listeIdListe"].length > 1)
          this.toastrServ.success("Les listes ont été supprimée", "listes suprimées");
        else
          this.toastrServ.success("La liste a été supprimée", "liste suprimée");

        this.dialogRef.close();
      },
      () =>
      {
        this.toastrServ.error(environment.msgHttp, "Erreur réseau");
      }
    );
  }
}
