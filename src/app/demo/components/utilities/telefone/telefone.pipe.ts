import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone',
  standalone: true
})
export class TelefonePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    // Remove qualquer caractere que não seja número
    value = value.replace(/\D/g, '');

    // Formata o valor para o formato (00) 00000-0000
    if (value.length === 11) {
      return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    // Caso o número tenha 10 dígitos (sem o 9 na frente)
    else if (value.length === 10) {
      return value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    return value; // Retorna o valor como está se não for 10 ou 11 dígitos
  }
}
