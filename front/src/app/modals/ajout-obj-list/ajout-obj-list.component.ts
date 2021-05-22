import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ajout-obj-list',
  templateUrl: './ajout-obj-list.component.html',
  styleUrls: ['./ajout-obj-list.component.css']
})
export class AjoutObjListComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void 
  {
    
  }

}
