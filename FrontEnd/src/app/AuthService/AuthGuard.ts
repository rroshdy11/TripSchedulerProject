import { Access } from './Access';

import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
} from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public zone: NgZone, public router: Router) {}
  canActivate(): boolean {
    if (!Access.isNextStep) {
      this.zone.run(() => {
        this.router.navigate(['']);
      });
      return false;
    } else {
      return Access.isNextStep || true;
    }
  }
}
