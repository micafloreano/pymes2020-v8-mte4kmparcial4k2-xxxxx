import { Component, OnInit } from '@angular/core';
import { MateriasSService} from '../../services/materias-s.service'
import {Materia} from '../../models/Materia'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDialogService } from "../../services/modal-dialog.service";

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {
  Titulo = "Materias";
  Items: Materia[] = [];
  EstadoForm: string;
  FormReg: FormGroup;

  submitted = false;


  constructor(private MateriasSService: MateriasSService, private formBuilder: FormBuilder) { }

  ngOnInit() {

        this.EstadoForm = 'L';
        this.submitted = false;
        this.getMateria();
        this.FormReg = this.formBuilder.group({
         IdMateria:[0],
         MateriaNombre: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
         MateriaAnio: ['',[Validators.required, Validators.pattern("[0-9]{4}")]],
    });
  }

  getMateria(){
     this.MateriasSService.get()
    .subscribe((res:Materia[])=>{
      this.Items = res;

  });
  }

  Alta(){
    window.scroll(0, 0);
    this.EstadoForm = 'A';
    this.submitted = false;
  }

  Grabar() {
    //this.submitted = true;
    // verificar que los validadores esten OK
     if (this.FormReg.invalid)
     {
      return;
      }
  
  
  
    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormReg.value };

    // agregar post
    itemCopy.IdPresupuesto = 0;
    this.MateriasSService.post(itemCopy).subscribe((res: any) => {
        this.getMateria();
        this.Volver();

     });
    }
  

  Volver() {
    this.EstadoForm = "L";
    this.FormReg.reset();

  };


}