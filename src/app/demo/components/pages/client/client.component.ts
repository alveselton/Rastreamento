import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Dispositivo } from 'src/app/demo/api/dispositivo';

@Component({
    templateUrl: './client.component.html',
    providers: [MessageService]
})
export class ClientComponent implements OnInit {
    customers: Customer[] = [];
    productDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;
    products: Product[] = [];
    product: Product = {};
    selectedProducts: Product[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    loading: boolean = true;
    
    dropdownItemsUf = [
        { name: 'DF', code: 'DF' },
        { name: 'GO', code: 'GO' },
        { name: 'PB', code: 'PB' }
    ];

    constructor(
        private customerService: CustomerService,
        private config: PrimeNGConfig,
        private messageService: MessageService) { }

    ngOnInit() {
        //this.productService.getProducts().then(data => this.products = data);

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

        this.customerService.getCustomersSmallCustom().then(customers => {
            this.customers = customers;
            console.log(this.customers.length);

            this.loading = false;

            // @ts-ignore
            this.customers.forEach(customer => customer.date = new Date(customer.date));
        });
       

        this.statuses = [
            { label: 'ATIVO', value: 'ativo' },
            { label: 'CANCELADO', value: 'cancelado' },
            { label: 'SUSPENSO', value: 'suspenso' }
        ];

        this.cols = [
            { field: 'cpf', header: 'Cpf' },
            { field: 'name', header: 'Nome' },
            { field: 'data', header: 'Data' },
            { field: 'status', header: 'Situação' }
        ];
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
