import { Inject, Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Observable, of } from 'rxjs';

import { Filter } from './filter';
import { Todo } from './todo';

@Injectable({
    providedIn: 'root'
})

export class TodosService {

    todos: Todo[] = [];

    private API = "http://localhost:8000/todos/";

    constructor(private http: HttpClient) {}

    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.API);
    }

    addTodo(description: string): Observable<Todo> {
        const todayDate = (new Date()).toISOString().split("T")[0];
        let todo: Todo = {
            id: this.todos.length,
            description,
            created_at: todayDate,
            done: false 
        } 
        while (this.todos.filter(entry => entry.id === todo.id).length > 0)
            todo.id += 1;
        return this.http.post<Todo>(this.API, todo);
    }

    removeTodo(id: number): Observable<Todo> {
        return this.http.delete<Todo>(this.API + id);
    }

    updateTodo(todo: Todo): Observable<Todo> {
        return this.http.put<Todo>(this.API + todo.id, todo);
    }

}
