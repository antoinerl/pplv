import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpHeaders,
  HttpParams
} from "@angular/common/http";
import { Storage } from "@ionic/storage";

import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import { mergeMap } from "rxjs/operators/mergeMap";
import { map } from "rxjs/operators";

import { UserProvider } from "../user/user";

@Injectable()
export class InterceptTokenProvider implements HttpInterceptor {
  constructor(
    private storage: Storage,
    public http: HttpClient,
    private userProvider: UserProvider
  ) {}

  private getToken(): Promise<any> {
    /**
     * Vérifie si le token n'est pas expiré.
     * Si c'est le cas, refresh du token.
     * @returns {Promise}
     */
    return new Promise( (resolve, reject) => {
      let _user = this.userProvider.getUser();
      if (_user == null)
        resolve("EMPTY_TOKEN");
      else {
        //this.authService.refresh().then(() => {
        //  resolve(_user.data.token);
        //});
        resolve(_user.data.meta.token);
      }
      
    });
  }

  private isExpired(token): boolean {
    return false;
  }

  private refreshToken(user: any): Promise<any> {
    let params = new HttpParams()
          .set('id', String(user.ID))
          .set('refresh_token', user.meta.refresh_token);

    return new Promise(resolve => {
        this.http.get("https://ws.prionspourlavie.fr/persons/refreshToken", {params: params}).pipe(
            map(
                (jsonArray: Object[]) => jsonArray.map(jsonItem => jsonItem)
            )).subscribe( token => {
                user.meta.token = token;
                this.storage.set("user", user).catch(err => {console.log(err)});
                resolve(token);
            });
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    /**
     * Intercepte la requête HTTP et vérifie si le token n'est pas expiré.
     * Si c'est le cas, refresh du token, puis effectue la requête HTTP.
     * @returns {Observable}
     */

     if (req.headers.get("token") == null) {
        return next.handle(req);
     }

    return fromPromise(this.getToken()).pipe(
        mergeMap(token => {
            const dupReq = req.clone({ headers: req.headers.set('Token', token) });
            return next.handle(dupReq);
        })
    );
  }

}
