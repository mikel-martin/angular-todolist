import { Component } from '@angular/core';

import { TodosService } from './todos.service';

import { Todo } from './todo';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {

    title: string = "To Do List";

}
