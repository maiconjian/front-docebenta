import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavegacaoService {

  constructor(private router: Router) { }

  gerenciarNavegacao(pagina: string) {
    this.router.navigate([pagina]);
  }

  getNovaPagina(pagina: string) {
    this.router.navigate([window.open(pagina)]);
  }

  getUrl() {
    return this.router.url;
  }

  getRouter() {
    return this.router;
  }
}
