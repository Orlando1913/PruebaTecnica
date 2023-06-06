import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import{MatSnackBar}from'@angular/material/snack-bar';

import { Empleado } from "./Interfaces/empleado";
import { EmpleadoService } from './Services/empleado.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogAddEditComponent } from './Dialogs/dialog-add-edit/dialog-add-edit.component';
import { DialogDeleteComponent } from './Dialogs/dialog-delete/dialog-delete.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['NombreEmpleado', 'ApellidoEmpleado', 'TipoDocumento', 'NumeroDocumento','NombreArea','FechaContrato','Acciones'];
  dataSource = new MatTableDataSource<Empleado>();

  constructor(
    private _empleadoService:EmpleadoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
    ) { 
  }

  ngOnInit(): void {
    this.mostrarEmpleados();
  }

  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  mostrarEmpleados(){
    this._empleadoService.getList().subscribe({
      next:(response)=>{
        this.dataSource.data=response;
      },error:(e)=>{}
    })
  }

  dialogNuevoEmpleado() {
    this.dialog.open(DialogAddEditComponent,{
      disableClose:true,
      width:"600px"
    }).afterClosed().subscribe(result =>{
      if (result==="creado") {
        this.mostrarEmpleados();
      }
    })
  }

  dialogEditarEmpleado(dataEmpleado:Empleado){
    this.dialog.open(DialogAddEditComponent,{
      disableClose:true,
      width:"600px",
      data:dataEmpleado
    }).afterClosed().subscribe(result =>{
      if (result==="editado") {
        this.mostrarEmpleados();
      }
    })
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }

  dialogEliminarEmpleado(dataEmpleado:Empleado){
    this.dialog.open(DialogDeleteComponent,{
      disableClose:true,
      data:dataEmpleado
    }).afterClosed().subscribe(result =>{
      if (result==="eliminar") {
        this._empleadoService.delete(dataEmpleado.idEmpleado).subscribe({
          next:(dataResponse)=>{
            this.mostrarAlerta("Empleado eliminado con exito","listo");
            this.mostrarEmpleados();
          },error:(e)=>{
            console.log(e);
          }
        })
      }
    })
  }

 

}
