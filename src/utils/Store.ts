import { Istoreable } from "./Istore";
import {Todo} from './todo';
export class Store implements Istoreable {
  public  getState(): Todo[] {
      let value = localStorage.getItem('todolist')
      let x : Array<any> = value == undefined ? Array<Todo>() : JSON.parse(value)
      let mappedArray : Todo[] = x.map(todo => {
        console.log(todo);
        return Todo.createInstance(todo);
      })
      return mappedArray;
    }
  public  setState(todoLists: Todo[]): void {
        let value = JSON.stringify(todoLists);
        localStorage.setItem('todolist', value);
    }
}