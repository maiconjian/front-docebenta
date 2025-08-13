import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../../../environments/environment';
import { HttpClientService } from '../generic/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;

  constructor(
    private http: HttpClientService,
    private auth: AuthService,
  ) { }

  logout() {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
    .toPromise()
    .then(() => {
      this.auth.removerToken();
    })
    .catch((erro:any) => {
      return Promise.reject(erro);
    });
  }
}
