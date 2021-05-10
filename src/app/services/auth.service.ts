import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyATqIg2HiP6jKrfhtODM4HQ-3fZMjKhutk';

  user: UserModel = new UserModel();
  // Crear usuarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  //Iniciar sesion
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  constructor(private http: HttpClient) { }

  logout() {

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
      `${this.url}signInWithPassword?key=${this.apiKey}`, userData);

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
      `${this.url}signUp?key=${this.apiKey}`, userData);
  }

}
