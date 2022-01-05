import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityCheck } from '../services/securitycheck.service';

@Injectable({
    providedIn: 'root'
})
export class SessionCheck {
    constructor(public router: Router, protected securityCheck: SecurityCheck,
    ) { }

    session_Check(name: string) {

        (localStorage.getItem('userid') === null ||
            localStorage.getItem('loggedtype') === null ||
            localStorage.getItem('token') == null || localStorage.getItem('name') == null || localStorage.getItem('email') == null) ?
            name === 'Admin' ? this.clearAllSession() : this.clearAllSession()
            :
            (this.getlocalStorage('loggedtype') !== name) ? name === 'Admin' ? this.clearAllSession() : this.clearAllSession() : '';
    }

    session_Check_by_Name(name: any) {
        return (localStorage.getItem(name) == null) ? false : true;
    }

    getlocalStorage(name: any) {
        return (localStorage.getItem(name) == null ||
            localStorage.getItem(name) === '') ? '' : this.securityCheck.Decrypt(localStorage.getItem(name));
    }

    setlocalStorage(id: any, name: any) {
        localStorage.setItem(id, this.securityCheck.Encrypt(name));
    }

    clearSession(name: any) {
        localStorage.removeItem(name);
    }

    clearAllSession() {
        localStorage.clear();
    }

    logout(loggedType: any) {
        localStorage.clear();
        this.router.navigate(['/']);
    }

    logoutValidation() {
        localStorage.clear();
        this.router.navigate(['/public/sign-in']);
    }

    session_CheckWithQuery(name: string, query: string) {
        (localStorage.getItem('userid') == null
            || localStorage.getItem('loggedtype') == null
            || localStorage.getItem('token') == null
            || localStorage.getItem('name') == null || localStorage.getItem('email') == null) ?
            name === 'Admin' ? this.clearAllSessionWithQuery('Admin', query) : this.clearAllSessionWithQuery('other', query)
            :
            (this.getlocalStorage('loggedtype') !== name) ? name === 'Admin' ?
                this.clearAllSessionWithQuery('Admin', query) : this.clearAllSessionWithQuery('other', query) : '';
    }

    clearAllSessionWithQuery(name: any, query: string) {
        localStorage.clear();
        this.router.navigate(['/public/sign-in']);
    }
}
