import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  imports:[ToastModule],
  selector: 'app-mensagem',
  standalone: true,
  templateUrl: 'mensagem.html',
  styleUrls: ['./mensagem.scss'],
  styles: [`
        :host ::ng-deep button {
            margin-right: .25em;
        }

        :host ::ng-deep .custom-toast .ui-toast-message {
            color: #ffffff;
            background: #FC466B;
            background: -webkit-linear-gradient(to right, #3F5EFB, #FC466B);
            background: linear-gradient(to right, #3F5EFB, #FC466B);
        }

        :host ::ng-deep .custom-toast .ui-toast-close-icon {
            color: #ffffff;
        }
    `],
})
export class MensagemComponent implements OnInit {

  @Output() opcao = new EventEmitter();

  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit() {
  }

  showTopCenter(msg: any, tipo: any) {
    this.messageService.add({ key: 'tc', severity: tipo, summary: msg, detail: '' });
  }

  showConfirm(msg: any, detalhe: any) {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: msg, detail: detalhe });
  }

  onConfirm() {
    this.opcao.emit(1);
    this.messageService.clear('c');
  }

  onReject() {
    this.opcao.emit(0);
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }

}
