import { Component, OnInit } from '@angular/core';
import { NavegacaoService } from '../../../core/services/navegacao.service';
import { Usuario } from '../../../core/models/usuario';
import { ApoioService } from '../../../core/services/apoio.service';
import { MensagemComponent } from '../../../shared/components/mensagem/mensagem';
import { TipoMensagem } from '../../../model/enum/tipo-mensagem.enum';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { FormsModule } from '@angular/forms';
import { MensagemCustomService } from '../../../core/services/mensagem-custom.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports:[MensagemComponent,FormsModule]
})
export class LoginComponent implements OnInit {

  login: string;
  senha: string;

//   logAcessoModel: LogAcesso;
  usuario: Usuario;
  usuarioLogado:any;


  constructor(
    private apoio: ApoioService,
    private mensagem: MensagemCustomService,
    private navegacao: NavegacaoService,
    private errorHandler: ErrorHandlerService,
    private auth: AuthService,
    // private logAcesso: LogAcessoService
  ) { 
  }

  ngOnInit() {
    this.apoio.setTituloPagina('Login');
    this.usuario = new Usuario();
  }

 autenticar() {
  if (this.login == null || this.login == undefined || this.login == '') {
    this.mensagem.showTopCenter('Login não pode ser vazio!', TipoMensagem.alerta);
    return null;  // retorna null
  } else if (this.senha == null || this.senha == undefined || this.senha == '') {
    this.mensagem.showTopCenter('Senha não pode ser vazio!', TipoMensagem.alerta);
    return null;  // retorna null
  } else {
    this.auth.autenticar(this.login, this.senha)
      .then(() => {
        this.getSalvarLog();
        this.navegacao.gerenciarNavegacao('/principal');
      })
      .catch((erro:any) => {
        this.errorHandler.handle(erro);
      });
      return null;
  }
}

  getSalvarLog() {
    // this.usuarioLogado = this.apoio.getUsuarioLogado();
    //   this.logAcesso.getIp()
    //     .then((response:any) => {
    //       console.log(response)
    //       this.logAcessoModel.ip = response.ip;
    //       this.logAcessoModel.navegador = this.getBrowser();
    //       this.usuario.id = this.usuarioLogado.id;
    //       this.logAcessoModel.usuario = this.usuario;
    //       let date = new Date();
    //       this.logAcessoModel.dataAcesso = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    //       this.logAcesso.incluir(this.logAcessoModel)
    //         .then((response:any) => response);
    //     })
    
  }


  getBrowser() {
    let agent = window.navigator.userAgent
    if (agent.indexOf('Firefox') != -1) {
      return 'Mozilla Firefox';
    } else if (agent.indexOf('Edg') != -1) {
      return 'Microsoft Edge';
    } else if (agent.indexOf('OPR') != -1) {
      return 'Opera';
    } else if (agent.indexOf('Trident') != -1) {
      return 'Microsoft Internet Explorer';
    } else if (agent.indexOf('Chrome') == -1 && agent.indexOf('Safari') != -1) {
      return 'Safari';
    } else if (agent.indexOf('Chrome') != -1) {
      return 'Google Chrome';
    } else {
      return 'Outro';
    }
  }

}
