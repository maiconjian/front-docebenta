import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { NavegacaoService } from '../navegacao.service';
// import { MensagemComponent } from '../mensagem/mensagem.component';
// import { AuthService } from './auth.service';
// import { NavegacaoService } from '../util/navegacao.service';
// import { TipoMensagem } from '../../model/enum/tipo-mensagem.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    // private mensagem: MensagemComponent,
    private auth: AuthService,
    private navegacao: NavegacaoService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.auth.isAccessTokenInvalido()) {
        console.log('Navegação com access token inválido, obtendo novo...');
        return this.auth.obterNovoAccessToken()
          .then(() => {
            if (this.auth.isAccessTokenInvalido()) {
              this.navegacao.gerenciarNavegacao('/login');
              return false;
            }
            return true;
          });
      } else if (next.data['roles'] && !this.auth.verificarPermissoes(next.data['roles'])) {
        // this.mensagem.showTopCenter('Sem permissão de acesso!', TipoMensagem.erro);
        return false;
      }
      return true;
  }

}
