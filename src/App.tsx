import * as React from "react";
import Navbar from './components/navbar';
import TodoList from './components/TodoList';
import { Store } from "./utils/Store";
import { Todo } from "./utils/todo";
import * as BT from 'react-bootstrap';

export default class App extends React.Component {

  constructor(prop){
    super(prop)
    this.storage = new Store();
    this.done = this.done.bind(this);
    this.edit = this.edit.bind(this);
    this.add = this.add.bind(this);
    this.undone = this.undone.bind(this);
    this.modalCompleteness = this.modalCompleteness.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.aboutToEdit = this.aboutToEdit.bind(this);
    this.delete = this.delete.bind(this);
    this.modalUndone = this.modalUndone.bind(this);
    this.modalDone = this.modalDone.bind(this);
  }

  private storage : Store // Store Object
  tempTodo : Todo // Todo Object

  state = {
    todolist : Array<Todo>(new Todo('love'), new Todo('saturday')),
    tempTodo : new Todo(),
    showModal : false
  }

  componentWillMount () {
    this.state.todolist = this.storage.getState();
  }

  render() {
    let done = this.state.todolist.filter((todo : Todo) => todo.done);
    let undone = this.state.todolist.filter((todo : Todo) => !todo.done);
    let DONE = done.map((todo : Todo, index : number) => {
      return <TodoList key={index} idKey={index} todo={todo} onEdit={this.aboutToEdit} onDone={this.done} onDelete={this.delete} onUndone={this.undone}/>
    });
    let UNDONE =undone.map((todo : Todo, index : number) => {
       return <TodoList key={index} idKey={index} todo={todo} onEdit={this.aboutToEdit} onDone={this.done} onDelete={this.delete} onUndone={this.undone}/>;
    })
    return <div>
        {/* Here the NavBAr Components */}
        <Navbar />
        <BT.Grid>
          <BT.Row className="show-grid">
            <BT.Col xs={0} md={4} sm={2} lg={3} />
            <BT.Col xs={12} md={4} sm={8} lg={6}>
              {/* The ADD todo panel */}
              <BT.Panel>
                <BT.Panel.Heading>Add Todo</BT.Panel.Heading>
                <BT.Panel.Body>
                  <BT.Form>
                    <BT.InputGroup>
                      <BT.FormControl placeholder="click on the '+' to add Todo" type="text" />
                      <BT.InputGroup.Addon>
                        <BT.Glyphicon glyph="list-alt" />
                      </BT.InputGroup.Addon>
                    </BT.InputGroup>
                  </BT.Form>
                </BT.Panel.Body>
              </BT.Panel>
            </BT.Col>
            <BT.Col xs={0} md={4} sm={2} lg={3} />
          </BT.Row>
          <BT.Row className="show-grid">
            <BT.Col xs={0} md={2} sm={2} lg={1} />
            <BT.Col xs={12} md={8} sm={8} lg={10}>
              {/* The ADD todo panel */}
              <BT.Col xs={12} md={6} sm={12} lg={6}>
                <BT.Panel>
                  <BT.Panel.Heading>Done Tasks</BT.Panel.Heading>
                  <BT.Panel.Body>
                    {DONE}
                  </BT.Panel.Body>
                </BT.Panel>
              </BT.Col>
              {/* UNDONE TASKS */}
              <BT.Col xs={12} md={6} sm={12} lg={6}>
                <BT.Panel>
                  <BT.Panel.Heading>Undone Tasks</BT.Panel.Heading>
                  <BT.Panel.Body>{UNDONE}</BT.Panel.Body>
                </BT.Panel>
              </BT.Col>
            </BT.Col>

            <BT.Col xs={0} md={2} sm={2} lg={1} />
          </BT.Row>
        </BT.Grid>
        <BT.Modal show={this.state.showModal} onHide={this.modalClose}>
          <BT.Modal.Header closeButton>Edit Todo</BT.Modal.Header>
          <BT.Modal.Body>
            <BT.Form>
              <BT.FormControl type="text" value={this.state.tempTodo.title} placeholder="Edit Todo Title" onChange={this.handleChange} />
            </BT.Form>
          </BT.Modal.Body>
          <BT.Modal.Footer>
            {this.state.tempTodo.done ? <BT.Button bsStyle="primary" onClick={this.modalCompleteness.bind(this, false)}>
                Undone &nbsp; <BT.Glyphicon glyph="repeat" />
              </BT.Button> : <BT.Button bsStyle="success" onClick={this.modalCompleteness.bind(this, true)}>
                Done &nbsp; <BT.Glyphicon glyph="ok" />
              </BT.Button>}
          </BT.Modal.Footer>
        </BT.Modal>
      </div>;
  }

  delete (key : number) : void {
    this.state.todolist.splice(key,1);
    this.setState({
      todolist : this.state.todolist
    })
  }

  modalCompleteness (state : boolean) : void {
    this.state.tempTodo.done = state;
    if(state) {
      this.modalDone(this.state.tempTodo.key);
    } else {
      this.modalUndone(this.state.tempTodo.key);
    }
  }

  /**
   * @param key
   * @argument number
   * @description A function called when edit button is pressed
   */
  edit(key : any) : void {
   this.state.todolist[key].title = this.state.tempTodo.title;
   this.state.todolist[key].done = this.state.tempTodo.done;
   this.storage.setState(this.state.todolist);
   this.setState({
     todolist : this.state.todolist
   })
  }

  /**
   * @argument none
   * @author Declan Nnadozie
   * @description A function called when the user adds new todo
   */
  add() : void {
    this.setState({
      todolist : this.state.todolist.push(this.state.tempTodo)
    });
     this.storage.setState(this.state.todolist);
  }

  /**
   * @argument key
   * @description A function call when users does a todo
   */
  modalDone(key : number) : void {
    alert(key)
    this.state.todolist[key].done = this.state.tempTodo.done
     this.storage.setState(this.state.todolist);
    this.setState({ 
      todolist: this.state.todolist,
      showModal : false
     });
  }

  done (key : number) : void {
    this.state.todolist[key].done = true;
    this.storage.setState(this.state.todolist);
    this.setState({
      todolist : this.state.todolist
    })
  }

  undone (key : number) : void {
    alert('undone');
    this.state.todolist[key].done = false;
    this.setState({ todolist: this.state.todolist });
  }

   /**
   * @argument key
   * @description A function call when users does a undones
   */
  modalUndone(key : number) : void {
    this.state.todolist[key].done = this.state.tempTodo.done;
    this.storage.setState(this.state.todolist);
    this.setState({ todolist: this.state.todolist, showModal: false });
  }

  modalClose () : void {
    this.setState({
      showModal : false
    })
  }

  handleChange(e: any) {
    this.setState({ 
      tempTodo: {title : e.target.value }
    });
  }

  aboutToEdit (key : number) : void {
    this.state.tempTodo = this.state.todolist[key];
    this.state.tempTodo.key = key;
    this.setState({
      tempTodo : this.state.tempTodo,
      showModal : true
    })
  }

}
