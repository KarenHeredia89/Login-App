import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from '../../models/usuario.model';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  remember = false;

  constructor(private auth: AuthService,
              private router: Router ) { }

  ngOnInit() { 
    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm) {

    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor'
    });

    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario)
              .subscribe(resp => {

                console.log(resp);
                Swal.close();
                this.router.navigateByUrl('/home');

                if (this.remember) {
                  localStorage.setItem('email', this.usuario.email);
                }

              }, (err) => {

                console.log(err.error.error.message);
                Swal.fire({
                  type: 'error',
                  title: 'Error al autenticar',
                  text: err.error.error.message
                });

              });
    
  } 

}
