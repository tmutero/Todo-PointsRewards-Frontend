import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    const roles = this.authService.getRoles();
    const hasPerms = this.authService.hasPermission(roles);
    let pageRoles = next.data;

    if (roles.findIndex((x) => x === pageRoles['roles'][0]) == -1) {
     this.router.navigate(['no-access']);
    }

    return hasPerms;
  }
}
