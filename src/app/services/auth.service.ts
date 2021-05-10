import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyATqIg2HiP6jKrfhtODM4HQ-3fZMjKhutk';

  userToken: string;

  user: UserModel = new UserModel();
  // Crear usuarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  //Iniciar sesion
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  constructor(private http: HttpClient) {
    this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }

  login(user: UserModel) {
    const userData = {
      /*  pouse ser reemplazado por ...user
      email: user.email,
      password: user.password, 
      */
      ...user,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apiKey}`, userData)
      .pipe(
        map(resp => {
          console.log('map');

          this.saveToken(resp['idToken']);
          return resp;
        })
      );

  }

  registerUser(user: UserModel) {
    const userData = {
      /*  pouse ser reemplazado por ...user
      email: user.email,
      password: user.password, 
      */
      ...user,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}signUp?key=${this.apiKey}`, userData)
      .pipe(
        map(resp => {
          console.log('map');

          this.saveToken(resp['idToken']);
          return resp;
        })
      );
  }

  saveToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  getToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token')
    } else {
      this.userToken = ''
    }

    return this.userToken;
  }

  isAuthenticate(): boolean {
    return this.userToken.length > 2
  }

}
