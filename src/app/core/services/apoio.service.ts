import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './auth/auth.service';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ApoioService {

  ptBrCalendario: any = {
    firstDayOfWeek: 0,
    dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    today: 'Hoje',
    clear: 'Limpar'
  };

  constructor(
    private title: Title,
    private errorHandler: ErrorHandlerService,
    private auth: AuthService
  ) { }


  setTituloPagina(titulo: string) {
    this.title.setTitle(`GFBI - ${titulo}`);
  }

  getTituloPagina() {
    return this.title.getTitle();
  }

  sizeRowsTable() {
    return 10;
  }

  iniciarFiltro(filtro: any) {
    filtro.size = this.sizeRowsTable();
    filtro.page = 0;
    filtro.situacao = 1;
    return filtro;
  }

  getUsuarioLogado() {
    let usuarioLogado = {
      'id': this.auth.jwtPayload.Id,
      'login': this.auth.jwtPayload.user_name,
      'regionais': this.auth.jwtPayload.regionais[0],
      'codigoEmpresa': this.auth.jwtPayload.codigoEmpresa,
      'perfil': this.auth.jwtPayload.perfil
    }
    return usuarioLogado;
  }

  carregarComboObjetoPorRegionalNome(service: any, idRegional: any) {
    let lista: any[] = [];
    let filtro = {
      'id': 0,
      'idRegional': idRegional,
      'situacao': 1
    }
    service.pesquisar(filtro)
      .then((response:any) => {
        if (response.length > 0) {
          for (let i = 0; i < response.length; i++) {
            lista.push({
              label: response[i].nome,
              value: response[i].id
            });
          }
        }
      })
      .catch((erro :any) => {
        this.errorHandler.handle(erro);
      });
    return lista;
  }

  carregarComboObjetoPorRegionalCodigo(service: any, idRegional: any) {
    let lista: any[] = [];
    let filtro = {
      'id': 0,
      'idRegional': idRegional,
      'situacao': 1
    }
    service.pesquisar(filtro)
      .then((response:any) => {
        if (response.length > 0) {
          for (let i = 0; i < response.length; i++) {
            lista.push({
              label: response[i].codigo,
              value: response[i].id
            });
          }
        }
      })
      .catch((erro :any) => {
        this.errorHandler.handle(erro);
      });
    return lista;
  }

  carregarComboObjetolNome(service: any) {
    let lista: any[] = [];
    let filtro = {
      'id': 0,
      'situacao': 1
    }
    service.pesquisar(filtro)
      .then((response:any) => {
        if (response.length > 0) {
          for (let i = 0; i < response.length; i++) {
            lista.push({
              label: response[i].nome,
              value: response[i].id
            });
          }
        }
      })
      .catch((erro :any) => {
        this.errorHandler.handle(erro);
      });
    return lista;
  }

  carregarComboObjetolCompleto(service: any) {
    let lista: any[] = [];
    let filtro = {
      'id': 0,
      'situacao': 1
    }
    service.pesquisar(filtro)
      .then((response:any) => {
        if (response.length > 0) {
          for (let i = 0; i < response.length; i++) {
            lista.push({
              label: response[i].nome,
              value: response[i]
            });
          }
        }
      })
      .catch((erro:any) => {
        this.errorHandler.handle(erro);
      });
    return lista;
  }

  carregarComboObjetolCodigo(service: any) {
    let lista: any[] = [];
    let filtro = {
      'id': 0,
      'situacao': 1
    }
    service.pesquisar(filtro)
      .then((response:any) => {
        if (response.length > 0) {
          for (let i = 0; i < response.length; i++) {
            lista.push({
              label: response[i].codigo,
              value: response[i].id
            });
          }
        }
      })
      .catch((erro:any) => {
        this.errorHandler.handle(erro);
      });
    return lista;
  }



  carregarComboSituacao() {
    let lista: any[] = [];
    lista.push(
      {
        label: 'ATIVO', value: 1
      }
    );
    lista.push(
      {
        label: 'INATIVO', value: 0
      }
    );
    return lista;
  }

  carregarComboTipoOcorrencia() {
    let lista: any[] = [];
    lista.push(
      {
        label: 'INFORMATIVO', value: 0
      }
    );
    lista.push(
      {
        label: 'IMPEDITIVO', value: 1
      }
    );
    return lista;
  }

  carregarComboAprovacao() {
    let lista: any[] = [];
    lista.push(
      {
        label: 'SIM', value: 1
      }
    );
    lista.push(
      {
        label: 'NAO', value: 0
      }
    );
    return lista;
  }

  carregarComboRegionaisUsuario(service:any,id: any) {
    let lista:any = [];
    service.buscarId(id)
      .then((response:any) => {
        for (let i = 0; i < response.regionais.length; i++) {
          let obj = { label: response.regionais[i].nome, value: response.regionais[i].id };
          lista.push(obj);
        }
      })
      .catch((erro:any) => {
        this.errorHandler.handle(erro);
      });
      return lista;
  }

  toLocaleStringPt(n: any) {
    return n.toLocaleString('pt');
  }

  formataDataMesAnoBRString(data: any) {
    return data.substring(5, 7) + '/' + data.substring(0, 4);
  }

  formataDataNomeFoto(data: any) {
    return data.getHours() + '' + data.getMinutes() + '' + (this.pad(data.getSeconds()));
  }

  formataData(data: any) {
    return this.pad(data.getDate()) + '-'
      + (this.pad(data.getMonth() + 1)) + '-'
      + data.getFullYear();
  }

  formataDataBRString(data: any) {
    return data.substring(8, 10) + '/' + data.substring(5, 7) + '/' + data.substring(0, 4);
  }

  formataDataUSString(data: any) {
    return data.substring(0, 4) + '-' + data.substring(5, 7) + '-' + data.substring(8, 10);
  }

  formatarDataHoraBRString(data: any) {
    return data.substring(8, 10) + '/' + data.substring(5, 7) + '/' + data.substring(0, 4)
      + ' ' + data.substring(11, 13) + ':' + data.substring(14, 16) + ':' + data.substring(17, 19);
  }

  formatarDataHoraUSString(data: any) {
    return data.substring(0, 4) + '-' + data.substring(5, 7) + '-' + data.substring(8, 10)
      + ' ' + data.substring(11, 13) + ':' + data.substring(14, 16) + ':' + data.substring(17, 19);
  }

  formataDataHoraBR(data: any) {
    let hora: string = '' + data.getHours();
    let minuto: string = '' + data.getMinutes();
    let segundo: string = '' + data.getSeconds();
    hora = hora.length == 1 ? '0' + hora : hora;
    minuto = minuto.length == 1 ? '0' + minuto : minuto;
    segundo = segundo.length == 1 ? '0' + segundo : segundo;
    return this.pad(data.getDate()) + '/' + (this.pad(data.getMonth() + 1)) + '/' + data.getFullYear()
      + ' ' + hora + ':' + minuto + ':' + segundo;
  }

  formataDataHoraUS(data: any) {
    let hora: string = '' + data.getHours();
    let minuto: string = '' + data.getMinutes();
    let segundo: string = '' + data.getSeconds();
    hora = hora.length == 1 ? '0' + hora : hora;
    minuto = minuto.length == 1 ? '0' + minuto : minuto;
    segundo = segundo.length == 1 ? '0' + segundo : segundo;
    return data.getFullYear() + '-' + (this.pad(data.getMonth() + 1)) + '-' + this.pad(data.getDate())
      + ' ' + hora + ':' + minuto + ':' + segundo;
  }

  converterMilisegundoHoraMinSec(mili: any) {
    // let sec = Math.floor(mili / 1000);
    // let hrs = Math.floor(sec / 3600);
    // sec -= hrs * 3600;
    // let min = Math.floor(sec / 60);
    // sec -= min * 60;
    // return (hrs <10 ? "0"+hrs:hrs) +":"+(min <10 ? "0"+min:min)+":"+(sec <10 ? "0"+sec:sec);
    let date = new Date(mili);
    return (date.getUTCHours() < 10 ? "0" + date.getUTCHours() : date.getUTCHours()) + ":" +
      (date.getUTCMinutes() < 10 ? "0" + date.getUTCMinutes() : date.getUTCMinutes()) + ":" +
      (date.getUTCSeconds() < 10 ? "0" + date.getUTCSeconds() : date.getUTCSeconds());
  }
  // 14/05/2020 06:50:59
  formatarDataHoraBRparaUSString(data: any) {
    return data.substring(6, 10) + '-' + data.substring(3, 5) + '-' + data.substring(0, 2) + ' ' +
      data.substring(11, 13) + ':' + data.substring(14, 16) + ':' + data.substring(17, 19)
  }

  formataDataUS(data: any) {
    return data.getFullYear() + '-' + (this.pad(data.getMonth() + 1)) + '-' + this.pad(data.getDate());
  }

  pad(n:any) {
    return n < 10 ? '0' + n : n;
  }
  getPtBrCalendario() {
    return this.ptBrCalendario;
  }

  carregarIconePorCor(posicao: number, maracdor: string) {
    let icon: string;
    switch (posicao) {
      case 1: {
        icon = `assets/imagens/imagem-mapa/${maracdor}/icon_limao_${maracdor}.png`;
        break;
      }
      case 2: {
        icon = `assets/imagens/imagem-mapa/${maracdor}/icon_cinza_${maracdor}.png`;
        break;
      }
      case 3: {
        icon = `assets/imagens/imagem-mapa/${maracdor}/icon_amarelo_${maracdor}.png`;
        break;
      }
      case 4: {
        icon = `assets/imagens/imagem-mapa/${maracdor}/icon_lilas_${maracdor}.png`;
        break;
      }
      case 5: {
        icon = `assets/imagens/imagem-mapa/${maracdor}/icon_azul_${maracdor}.png`;
        break;
      }
      case 6: {
        icon = `assets/imagens/imagem-mapa/${maracdor}/icon_laranja_${maracdor}.png`;
        break;
      }
      case 7: {
        icon = `assets/imagens/imagem-mapa/${maracdor}/icon_rosa_${maracdor}.png`;
        break;
      }
      case 8: {
        icon = `assets/imagens/imagem-mapa/${maracdor}/icon_preto_${maracdor}.png`;
        break;
      }
      case 9: {
        icon = `assets/imagens/imagem-mapa/${maracdor}/icon_vermelho_${maracdor}.png`;
        break;
      }
      case 10: {
        icon = `assets/imagens/imagem-mapa/${maracdor}/icon_turquesa_${maracdor}.png`;
        break;
      }
      case 11: {
        icon = `assets/imagens/imagem-mapa/${maracdor}/icon_musgo_${maracdor}.png`;
        break;
      }
      default: {
        icon = `assets/imagens/imagem-mapa/${maracdor}/icon_musgo_${maracdor}.png`;
        break;
      }
    }
    return icon;
  }

  carregarComboUF() {
    let lista: any[] = [];
    lista.push({ label: 'AC', value: 'AC' });
    lista.push({ label: 'AL', value: 'AL' });
    lista.push({ label: 'AM', value: 'AM' });
    lista.push({ label: 'AP', value: 'AP' });
    lista.push({ label: 'BA', value: 'BA' });
    lista.push({ label: 'CE', value: 'CE' });
    lista.push({ label: 'DF', value: 'DF' });
    lista.push({ label: 'AM', value: 'AM' });
    lista.push({ label: 'ES', value: 'ES' });
    lista.push({ label: 'GO', value: 'GO' });
    lista.push({ label: 'MA', value: 'MA' });
    lista.push({ label: 'MG', value: 'MG' });
    lista.push({ label: 'MS', value: 'MS' });
    lista.push({ label: 'MT', value: 'MT' });
    lista.push({ label: 'PA', value: 'PA' });
    lista.push({ label: 'PB', value: 'PB' });
    lista.push({ label: 'PE', value: 'PE' });
    lista.push({ label: 'PI', value: 'PI' });
    lista.push({ label: 'PR', value: 'PR' });
    lista.push({ label: 'RJ', value: 'RJ' });
    lista.push({ label: 'RN', value: 'RN' });
    lista.push({ label: 'RO', value: 'RO' });
    lista.push({ label: 'RR', value: 'RR' });
    lista.push({ label: 'RS', value: 'RS' });
    lista.push({ label: 'SC', value: 'SC' });
    lista.push({ label: 'SE', value: 'SE' });
    lista.push({ label: 'SP', value: 'SP' });
    lista.push({ label: 'TO', value: 'TO' });
    return lista;
  }
}
