import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SessionCheck } from '../session/sessioncheck.service';
import { ToastController } from '@ionic/angular';
import { CommonService } from './common.service';
import { AuthGuard } from './auth-guard.service';

@Injectable({
    providedIn: 'root'
})
export class GenericCallService {

    host = '';
    url = '';
    prm: any = [];

    constructor(
        private http: HttpClient,
        private session: SessionCheck,
        private common: CommonService,
        private authService: AuthGuard
    ) {
        this.host = environment.apiUrl;
    }

    postMethodWithoutToken(sp: any, param: any): Observable<any> {
        debugger;
        let isSP = true;
        param = {
            ...param,
            isSP
        }
        this.url = this.host + sp + '/json';
        const headers = { 'Content-Type': 'application/json' };
        return this.http.post<any>(this.url, param, { headers: headers, observe: 'response' })
            .pipe(map(resp => {
                debugger
                return resp;
            }), catchError((error) => {
                console.log(error);
                return this.handleError(error)
            }));
    }

    postMethodWithToken(sp: any, token: any, data: any, contentType = 'application/json'): Observable<any> {
        let isSP = true;
        debugger;
        data = {
            ...data,
            isSP
        }

        let headers = {};
        if (contentType == 'Form') {
            this.url = this.host + sp;
            headers = { 'Token': token }
        }
        else {
            this.url = this.host + sp + '/json';
            headers = { 'Content-Type': contentType, 'Token': token };
        }
        return this.http.post<any>(this.url, data, { headers: headers, observe: 'response' })
            .pipe(map((resp) => {
                debugger;
                return resp.body.ResultSets; // .ResultSets[0];
            }), catchError((error) => {
                console.log(error);
                return this.handleError(error)
            }));
    }
    SendMessage(Message, MobileNo, Otp): Observable<any> {

        this.url = this.host + 'api/SendDemoOtp?mobileno=' + MobileNo + '&Message=' + Message + '&OTPNumber=' + Otp;
        const headers = { 'Content-Type': 'application/json' };
        return this.http.get(this.url, { headers: headers, observe: 'response' })
            .pipe(map(resp => {

                return resp.body;
            }), catchError((error) => this.handleError(error)))
        //    .catch((error:any) =>       
        //    Observable.throw(error))

    }
    // error handling
    handleError(error) {

        //const _ = this;
        try {
            const statusCode = error.status;
            if (statusCode === '401' || statusCode === 401) {
                this.common.toastAlert('Your session is expired. Please login again.', 'danger');
                this.authService.logOut();
            } else if (statusCode === '500' || statusCode === 500) {
                this.common.toastAlert("Server error (code:500),\nCouldn't get data", 'danger');
            }
            // let errorMessage = '';
            // const err = error.json();
            // if (error.error instanceof ErrorEvent) {
            //     // client-side error
            //     errorMessage = `Error: ${error.error.message}`;
            // } else {
            //     // server-side error
            //     errorMessage = `Error Code: ${error.status}\nMessage: ${err.Message}`;
            //     const statusCode = error.status;
            //     if (statusCode === '401' || statusCode === 401) {
            //         this.common.toastAlert('Your session is expired. Please login again.', 'danger');
            //         this.authService.logOut();
            //     }
            // }
            return throwError(error);
        } catch (error) {
            this.authService.logOut();
            return error;
        }
    }
}
