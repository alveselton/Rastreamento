import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Dispositivo } from 'src/app/demo/api/dispositivo';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './clients.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit{
    display: boolean = false;
    displayDispositivo: boolean = false;    
    customers1: Customer[] = [];
    dispositivos: Dispositivo[] = [];
    selectedCustomers1: Customer[] = [];
    selectedCustomer: Customer = {};
    representatives: Representative[] = [];
    statuses: any[] = [];
    rowGroupMetadata: any;
    expandedRows: expandedRows = {};
    activityValues: number[] = [0, 100];
    isViewPanel: string = null;
    isExpanded: boolean = false;
    idFrozen: boolean = false;
    loading: boolean = true;
    isFilterFilled: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private customerService: CustomerService,
        private config: PrimeNGConfig) { }

    selectedState: any = null;
    selectedRastreador: any = null;

    dropdownItems = [
        { name: 'DF', code: 'DF' },
        { name: 'GO', code: 'GO' },
        { name: 'PB', code: 'PB' }
    ];

    dropdownItemsDispositivos = [
        { name: 'J16', code: 'J16' }
    ];

    ngOnInit() {
        this.customerService.getCustomersSmallCustom().then(customers => {
            this.customers1 = customers;
            this.loading = false;

            this.config.setTranslation({
                apply: 'Aplicar',
                clear: 'Limpar',
                addRule: 'Adicionar regra',
                accept: 'Sim',
                reject: 'Não',
                dateIs: 'Data é',
                contains: 'Contendo',
                notContains: 'Não contendo',
                startsWith: 'Iniciando com',
                endsWith: 'Terminando com',
                matchAll: 'Combinar todos',
                matchAny: 'Combinar qualquer',                
                equals: 'Igual',
                notEquals: 'Não é igual',
                firstDayOfWeek: 0,
                dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
                dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
                monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
                'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                today: 'Hoje'
            })

            // @ts-ignore
            this.customers1.forEach(customer => customer.date = new Date(customer.date));
        });
        
        this.getDispositivos();

        this.statuses = [
            { label: 'Ativo', value: 'ativo' },
            { label: 'Cancelado', value: 'cancelado' },
            { label: 'Suspenso', value: 'suspenso' }
        ];
    }    

    formatCurrency(value: number) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    navegacao(tela){
        console.log(tela);

        switch (tela) {
            case 'cadastro':
                this.isViewPanel = tela
                break;
            case 'dispositivo':
                    this.isViewPanel = tela
                    this.getDispositivos();
                    break;     
            case 'financeiro':
                this.isViewPanel = tela
                break;                             
            default:
                this.isViewPanel = 'cadastro';
                break;
        }
    }

    getDispositivos(){
        this.customerService.getDispositivos()
        .then(dispositivo =>{
            this.dispositivos = dispositivo;
            this.loading = false;
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        table.filterGlobal(filterValue, 'contains');
        console.log(filterValue);

        this.isFilterFilled = !!filterValue;
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
        this.isFilterFilled = false;
    }    

}

