import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Inicial',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Principal',
                items: [
                    { label: 'Clientes', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/clients'] },               
                    { label: 'Clientes', icon: 'pi pi-fw pi-id-card', routerLink: ['/pages/client'] },                     
                ]
            }
            ,
            {
                label: 'Rastreamento',
                items: [
                    { label: 'Tempo real', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Histórico', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] }
                ]
            },            
            {
                label: 'Administrativo',
                items: [
                    { label: 'Perfil', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] }
                ]
            }            
        ];
    }
}
