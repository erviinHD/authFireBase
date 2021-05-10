import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel;
  rememberUser = false;

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.user = new UserModel();
    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.rememberUser = true;
    }
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Espere porfavor'
    });
    Swal.showLoading();


    this.auth.login(this.user)
      .subscribe(resp => {
        Swal.close();
        console.log(resp);

        if (this.rememberUser) {
          localStorage.setItem('email', this.user.email);
        }

        this.router.navigateByUrl('/home')

      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        });
      })
  }

}
