import { Component, Inject, OnInit } from '@angular/core';
import{MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Empleado } from 'src/app/Interfaces/empleado';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent {
  
  constructor(
    private dialogoReferencia:MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA)public dataEmpleado:Empleado
  ) {
   
    
  }

  ngOninit():void{

  }

  confirmarEliminado(){
    if (this.dataEmpleado) {
      this.dialogoReferencia.close("eliminar")
    }
  }
}
