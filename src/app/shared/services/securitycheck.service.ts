import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SecureAuthService } from './secureauth.service';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class SecurityCheck {
    constructor(public router: Router, protected secureAuthService: SecureAuthService) {
    }

    Encrypt(data: string) {
        const e = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), CryptoJS.enc.Utf8.parse(this.secureAuthService.getKey()),
            {
                keySize: 128 / 8,
                iv: CryptoJS.enc.Utf8.parse(this.secureAuthService.getIV()),
                mode: CryptoJS.mode.CTR,
                padding: CryptoJS.pad.Pkcs7
            });
        return e.toString();
    }
    Decrypt(data: string) {
        const d = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(this.secureAuthService.getKey()), {
            keySize: 128 / 8,
            iv: CryptoJS.enc.Utf8.parse(this.secureAuthService.getIV()),
            mode: CryptoJS.mode.CTR,
            padding: CryptoJS.pad.Pkcs7
        });
        return d.toString(CryptoJS.enc.Utf8);
    }
}
