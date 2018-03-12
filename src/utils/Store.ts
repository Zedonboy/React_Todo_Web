import { Istoreable } from "./Istore";
import {Todo} from './todo';
export class Store implements Istoreable {
  public  getState(): Todo[] {
      let value = localStorage.getItem('todolist')
      return value = value == undefined ? Array<Todo>() : JSON.parse(value)
    }
  public  setState(todoLists: Todo[]): void {
        let value = JSON.stringify(todoLists);
        localStorage.setItem('todolist', value);
    }
}