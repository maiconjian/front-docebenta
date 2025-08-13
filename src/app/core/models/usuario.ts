import { GenericModel } from "./generic-model";


export class Usuario extends GenericModel {
  nome: string;
  login: string;
  senha: string;
}
