import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { Observable, from as observableFromPromise } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth/auth.service';

export class NotAuthenticatedError {}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService extends HttpClient {

  constructor(
    private auth: AuthService,
    private httpHandler: HttpHandler,
    private jwtHelper: JwtHelperService,
  ) {
    super(httpHandler);
  }


  public override  delete<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.delete<T>(url, options));
  }

  public override patch<T>(url: string, body: any, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.patch<T>(url, options));
  }

  public override head<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.head<T>(url, options));
  }

  public override options<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.options<T>(url, options));
  }

  public override get<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.get<T>(url, options));
  }

  public override post<T>(url: string, body: any, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.post<T>(url, body, options));
  }

  public override put<T>(url: string, body: any, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.put<T>(url, body, options));
  }

  private fazerRequisicao<T>(fn: Function): Observable<T> {
    if (this.isAccessTokenInvalido()) {
      console.log('Requisição HTTP com access token inválido. Obtendo novo token...');
      const chamadaNovoAccessToken = this.auth.obterNovoAccessToken()
        .then(() => {
          if (this.isAccessTokenInvalido()) {
            throw new NotAuthenticatedError();
          }
          return fn().toPromise();
        });
      return observableFromPromise(chamadaNovoAccessToken);
    } else {
      return fn();
    }
  }

   isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  public getHttpParams() {
    let params = new HttpParams(
      //   {
      //   fromObject: {
      //     page: filtro.page,
      //     size: filtro.size
      //   }
      // }
      );
      return params;
  }
}
