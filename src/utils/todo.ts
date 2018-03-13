export class Todo {
    private id: number = 0;
    /**
     * 
     * @param title 
     * @author Declan Nnadozie
     * @description  A Todo Class/Object
     */
    /**
     * static createInstane
     */
    public static createInstance(todo : {id : number, name : string, completed : boolean}) : Todo {
        let tempTodo = new Todo();
        tempTodo.key = todo.id;
        tempTodo.done = todo.completed;
        tempTodo.title = todo.name
        return tempTodo;
    }
    constructor(title? : string ) {
        this.name = title
        this.completed = false
    }
    name : string;
    private completed : boolean

    // GEt Accessors
    public get done() : boolean {
        return this.completed
    }

    // Set accesors
    public set done(v : boolean) {
        this.completed = v;
    }

    
    public get title() : string {
        return this.name;
    }
    
    
    public set title(v : string) {
        this.name = v;
    }
    
    
    public get key() : number {
        return this.id;
    }
    
    
    public set key(v : number) {
        this.id = v;
    }
    
    

}