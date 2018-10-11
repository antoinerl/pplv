import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpHeaders
} from "@angular/common/http";
import { Storage } from "@ionic/storage";

import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import { mergeMap } from "rxjs/operators/mergeMap";

@Injectable()
export class InterceptTokenProvider implements HttpInterceptor {
  constructor(
    private storage: Storage
  ) {}

  private getToken(): Promise<any> {
    /**
     * Vérifie si le token n'est pas expiré.
     * Si c'est le cas, refresh du token.
     * @returns {Promise}
     */
    return new Promise(resolve => {
      this.storage.get("user").then(_user => {
        console.log(_user);
          //this.authService.refresh().then(() => {
          //  resolve(_user.data.token);
          //});
        resolve(_user.data.meta.token);
      });
    });
  }

  private isExpired(token): boolean {

  }

  private refreshToken(): Promise<Any> {
    let params = new HttpParams()
          .set('id', String(this.user.ID))
          .set('refresh_token', this.user.meta.refresh_token);

    this.http.get("https://ws.prionspourlavie.fr/persons/refreshToken", {params: params}).then( token => {
        resolve(token);
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
