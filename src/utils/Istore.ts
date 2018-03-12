import { Todo } from "./todo";
export interface Istoreable {
    getState() : Array<Todo>;
    setState(todoLists : Array<Todo>) : void;
}