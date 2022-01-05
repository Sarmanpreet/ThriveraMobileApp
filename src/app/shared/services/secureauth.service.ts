import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SecureAuthService {

    constructor() { }

    // Set your keys of SecureAuth --------------------------------------------
    public getKey() {
        return '7865412358945284';
    }

    public getIV() {
        return '7865412358945284';
    }

}
