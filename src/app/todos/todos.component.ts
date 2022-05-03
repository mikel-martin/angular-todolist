import { Component, OnInit, Inject } from '@angular/core';

import { TodosService } from '../todos.service';

import { Filter } from '../filter';
import { Todo } from '../todo';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})

export class TodosComponent implements OnInit {

    todos: Todo[] = [];

    description: string = "";

    filter: Filter = Filter.All;

    constructor(private todosService: TodosService) {
        this.getTodos();
    }

    getTodos(): void {
        this.todosService.getTodos()
            .subscribe(todos => this.todos = todos);
    }

    addTodo(): void {
        this.todosService.addTodo(this.description)
            .subscribe(todo => {
                this.todos.push(todo);
                this.description = "";
                this.getTodos();
            });
        this.getTodos();
    } 

    removeTodo(id: number): void {
        this.todosService.removeTodo(id)
            .subscribe(todo => {
                this.getTodos();
            });
        this.todos = this.todos.filter(todo => {
            return todo.id !== id;
        });
    }

    getFilteredTodos(): Todo[] {
        if (this.filter === Filter.All)
            return this.todos;
        return this.todos.filter(todo => {
            return this.filter === Filter.Done ? todo.done : !todo.done;
        });
    }

    ngOnInit(): void { }

}
