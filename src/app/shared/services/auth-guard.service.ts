import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SessionCheck } from '../session/sessioncheck.service';
import { select, Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-states.interface';
import * as AuthActions from '../../pages/auth/store/auth.actions';
import * as EmployeeAction from './../../tabs/employee/store/Employee.actions';
import { getcheckSession } from 'src/app/pages/auth/store/auth.selectors';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    subscription = new Subscription();
    constructor(
        private session: SessionCheck,
        private router: Router,
        private store: Store<IAppState>,
        private toaster: ToastController
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return this.isAuthenticated();
    }

    logOut() {
        this.session.clearAllSession();
        this.router.navigate(['/login']);
    }

    isAuthenticated() {
        const token = this.session.getlocalStorage('token');
        const UserId = this.session.getlocalStorage('userid');
        const session = this.session.getlocalStorage('session');
        this.store.dispatch(AuthActions.checkSession({
            payload: {
                LoginID: UserId,

                SessionID: session,

            }
        }));
        const loginSubscription = this.store.pipe(select(getcheckSession))
            .subscribe(
                (serverResponse) => {

                    if (serverResponse) {
                        debugger;
                        if (serverResponse.Status == true) {

                            return true;
                        } else {

                            // this.toastAlert(serverResponse.Message, 'danger');
                            this.toastAlert('Your session is expired. Please login again.', 'danger');
                            this.session.logout('');
                            return false;
                        }
                    }
                });

        return true;

    }

    async toastAlert(txtMsg: any, msgType: any) {
        const toast = await this.toaster.create({
            message: txtMsg,
            duration: 2000,
            color: msgType,
            animated: true
        });
        toast.present();
    }
}
