import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: UserModel;
  rememberUser = false;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.user = new UserModel();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Espere porfavor'
    });
    Swal.showLoading();

    this.auth.registerUser(this.user).subscribe(resp => {
      console.log(resp);
      Swal.close();
      if (this.rememberUser) {
        localStorage.setItem('email', this.user.email);
      }
      this.router.navigateByUrl('/home')

    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error al registrarse',
        text: err.error.error.message
      });

    })

  }

}
