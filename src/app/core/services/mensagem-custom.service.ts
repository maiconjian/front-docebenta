import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MensagemCustomService {
  constructor(private messageService: MessageService) {}

    showTopCenter(msg: any, tipo: any) {
    this.messageService.add({ key: 'tc', severity: tipo, summary: msg, detail: '' });
  }

  showConfirm(msg: any, detalhe: any) {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: msg, detail: detalhe });
  }

  clear() {
    this.messageService.clear();
  }
}
