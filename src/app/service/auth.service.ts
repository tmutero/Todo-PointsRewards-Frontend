import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../model/user.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing a list of login services functions.
 * @extends ResourceService
 */
export class AuthService {
  /**Constructor function to inject dependencies into the component class
   *
   * @constructor
   * @param
   */

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public apiUrl = environment.apiUrl;
  public staffUser = false;
  public currentUser!: UserModel;
  public impersonated = false;
  public dateJoined!: any;

  constructor(
    protected httpClient: HttpClient,
    private router: Router,
    private toastService: ToastService,

  ) {
    this.currentUser = this.getCurrentUserDetails();
  }

  /**
   * Post login to server through http
   *
   * @param loginModel  Login model required .
   * @return Object returned from request
   */
  login(loginModel: any): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}/user/token`,
      JSON.stringify(loginModel),
      this.httpOptions
    );
  }

    /**
   * Post login to server through http
   *
   * @param loginModel  Login model required .
   * @return Object returned from request
   */
    register(registerModel: any): Observable<any> {
      return this.httpClient.post(
        `${this.apiUrl}/user/register`,
        JSON.stringify(registerModel),
        this.httpOptions
      );
    }

  

  /**
   * Post new password to server
   *
   * @param model  Model required .
   * @param username  Username required .
   * @return Object returned from request
   */
  isLoggedIn() {
    const token_obj = JSON.parse(localStorage.getItem('token')!);
    if (token_obj) {
      return true;
    }
    return false;
  }

  /**
   * A function to get saved token in local storage
   * @return A token
   */
  getToken() {
    const token_obj = localStorage.getItem('bearer')!;

    if (token_obj) {
      const currentTime = Math.round(new Date().getTime() / 1000);
      const jwtToken = token_obj.split('.')[1];
      const expTime = JSON.parse(atob(jwtToken)).exp;

      if (expTime <= currentTime) {
        this.toastService.showSuccessToast(
          'Session Expired',
          'Login with your credentials to continue'
        );
        this.logout();
        window.location.reload();
      }
      return token_obj;
    }
    return null;
  }


  /**
   * Saved token to local storage
   */
  saveTokens(tokendata: any) {
    localStorage.setItem('token', JSON.stringify(tokendata));
  }

  saveBearer(bearer: any) {
    localStorage.setItem('bearer', bearer);
  }



  getCurrentUserDetails() {
    const loggedInUser = JSON.parse(localStorage.getItem('token')!);

    if (loggedInUser != null) {
      return <UserModel>{
        id: loggedInUser.id,
        email: (loggedInUser.email).toLowerCase(),
        lastname: loggedInUser.lastname,
        firstname: loggedInUser.firstname,
        roles: loggedInUser.roles,
      };
    }
    return <UserModel>{};
  }

 

  getRoles() {
    return this.getCurrentUserDetails().roles;
  }

  

  hasPermission(groups: string[]) {
    const auth = this.getCurrentUserDetails();

    let hasPerms = false;

    if (auth) {
      if (auth.roles !== undefined && auth.roles !== null) {
        auth.roles.forEach((element: string) => {
          if (!hasPerms && groups.indexOf(element) > -1) {
            hasPerms = true;
          }
        });
      }
    }

    return hasPerms;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('bearer');

    this.router.navigate(['/login']);
  }



}
