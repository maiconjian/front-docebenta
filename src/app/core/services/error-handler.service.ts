import { Injectable } from '@angular/core';
import { MensagemComponent } from '../../shared/components/mensagem/mensagem';
import { NavegacaoService } from './navegacao.service';
import { NotAuthenticatedError } from './generic/http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TipoMensagem } from '../../model/enum/tipo-mensagem.enum';
import { MensagemCustomService } from './mensagem-custom.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private navegacao: NavegacaoService,
    private messagemCustom:MensagemCustomService
    ) { }

    handle(errorResponse: any) {
      let msg: string;
      if (typeof errorResponse === 'string') {
        msg = errorResponse;
      } else if (errorResponse instanceof NotAuthenticatedError) {
        msg = 'Sua sessão expirou!'
        this.navegacao.gerenciarNavegacao('/login');
      } else if (errorResponse instanceof HttpErrorResponse
        && errorResponse.status >= 400 && errorResponse.status <= 499) {

          msg = 'Ocorreu um erro ao processar a sua solicitação!';
          console.log();
          if (errorResponse.error.error === 'invalid_token') {
            console.error('Ocorreu um erro de token', errorResponse);
            msg = "";
          }
          if(errorResponse.error.error === 'unauthorized'){
            msg = 'Este usuario esta desativado!';
          }
          if (errorResponse.error.error === 'invalid_grant') {
            console.error('Ocorreu um erro de login', errorResponse);
            msg = 'Usuário ou senha inválidos!';
          }
          if (errorResponse.status === 403) {
            msg = 'Você não tem permissão para executar esta ação!';
          }
          try {
            msg = errorResponse.error[0].mensagemUsuario;
          } catch (e) { }
          console.error('Ocorreu um erro', errorResponse);
        } else {
          msg = 'Erro ao processar serviço remoto. Tente novamente.';
          console.error('Ocorreu um erro', errorResponse);
        }
        if (msg) {
          this.messagemCustom.showTopCenter(msg, TipoMensagem.erro);
        }
      }
    }
