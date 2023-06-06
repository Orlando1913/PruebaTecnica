import { Component, Inject, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validators} from '@angular/forms';
import{MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import{MatSnackBar} from '@angular/material/snack-bar';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import * as moment from 'moment';
import { Area } from 'src/app/Interfaces/area';
import { Empleado } from 'src/app/Interfaces/empleado';
import { AreaService } from 'src/app/Services/area.service';
import { EmpleadoService } from 'src/app/Services/empleado.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_DATE_FORMATS ={
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  }
}

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css'],
  providers:[
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
  ]
})
export class DialogAddEditComponent {

  formEmpleado:FormGroup;
  tituloAccion:string="Nuevo";
  botonAccion:string="Guardar";
  listaAreas:Area[]=[]; 

  constructor(
  private dialogoReferencia:MatDialogRef<DialogAddEditComponent>,
  private fb:FormBuilder,
  private _snackBar:MatSnackBar,
  private _areaservice:AreaService,
  private _empleadoservice:EmpleadoService,
  @Inject(MAT_DIALOG_DATA)public dataEmpleado:Empleado

  ) {
    this.formEmpleado = this.fb.group({
      nombreEmpleado:[dataEmpleado?.nombreEmpleado,Validators.required],
      apellidoEmpleado:[dataEmpleado?.apellidoEmpleado,Validators.required],
      tipoDocumento:[dataEmpleado?.tipoDocumento,Validators.required],
      numeroDocumento:[dataEmpleado?.numeroDocumento,Validators.required],
      listaDeAreas:[dataEmpleado?.idArea,Validators.required],
      fechaContrato:[ moment(dataEmpleado?.fechaContrato,'DD/MM/YYYY'),Validators.required]
    })
      
      if (dataEmpleado) {
        this.tituloAccion="Editar";
        this.botonAccion="Actualizar";
      }

    this._areaservice.getList().subscribe({
      next:(data)=>{
        this.listaAreas = data;
      },error(e){}
    })
    
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }

  AddEditEmpleado(){
    const modelo:Empleado={
      idEmpleado:0,
      nombreEmpleado:this.formEmpleado.value.nombreEmpleado,
      apellidoEmpleado:this.formEmpleado.value.apellidoEmpleado,
      tipoDocumento:this.formEmpleado.value.tipoDocumento,
      numeroDocumento:this.formEmpleado.value.numeroDocumento.toString(),
      idArea:this.formEmpleado.value.listaDeAreas,
      fechaContrato:moment(this.formEmpleado.value.fechaContrato).format("DD/MM/YYYY")
    }
    if (this.dataEmpleado == null) {
      this._empleadoservice.add(modelo).subscribe({
        next:(dataResponse)=>{
          this.mostrarAlerta("Empleado Guardado con Exito","Listo");
          this.dialogoReferencia.close("creado");
        },error:(e)=>{
          this.mostrarAlerta("Hubo un problema y no se guardo el empleado","Error");
        }
      })
    }
    else
    {
      this._empleadoservice.update(this.dataEmpleado.idEmpleado,modelo).subscribe({
        next:(dataResponse)=>{
          this.mostrarAlerta("Empleado Editado con Exito","Listo");
          this.dialogoReferencia.close("editado");
        },error:(e)=>{
          this.mostrarAlerta("Hubo un problema y no se edito el empleado","Error");
        }
      })
    }
  }

  
}
