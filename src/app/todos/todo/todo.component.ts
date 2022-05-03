import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TodosService } from '../../todos.service';

import { Todo } from '../../todo';


@Component({
    selector: 'todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements OnInit {

    @Input() todo!: Todo;

    @Output() removeTodoEvent = new EventEmitter<number>();

    constructor(private todosService: TodosService) { }

    removeTodo(): void {
        if (this.todo) {
            let id = this.todo.id;
            this.removeTodoEvent.next(id);
        }
    }

    updateTodo(event: any): void {
        this.todosService.updateTodo(this.todo)
            .subscribe();
    }

    ngOnInit(): void { }

}
