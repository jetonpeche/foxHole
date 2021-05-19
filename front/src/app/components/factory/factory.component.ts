import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AjoutObjComponent } from 'src/app/modals/ajout-obj/ajout-obj.component';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.css']
})
export class FactoryComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  PopUpAjoutObj(): void
  {
    this.dialog.open(AjoutObjComponent);
  }

}
