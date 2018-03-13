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
    todolist : Array<Todo>(),
    tempTodo : new Todo(),
    showModal : false,
    tempText : ''
  }

  componentWillMount () {
    this.state.todolist = this.storage.getState();
    console.log(this.storage.getState());
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
                  <BT.FormGroup>
                    <BT.InputGroup>
                      <BT.InputGroup.Button>
                        <BT.Button onClick={this.add}>
                          <BT.Glyphicon glyph="list-alt" />
                        </BT.Button>
                      </BT.InputGroup.Button>
                      <BT.FormControl type="text" placeholder="click on the button by the right" value={this.state.tempTodo.title} onChange={this.handleChange} />
                    </BT.InputGroup>
                  </BT.FormGroup>
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
                  <BT.Panel.Body>{DONE}</BT.Panel.Body>
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
              <BT.FormControl type="text" value={this.state.tempText} placeholder="Edit Todo Title" onChange={this.handleChange} />
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
    });
     this.storage.setState(this.state.todolist);
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
   * @argument none
   * @author Declan Nnadozie
   * @description A function called when the user adds new todo
   */
  add() : void {
    let tempTodo = new Todo(this.state.tempText)
    tempTodo.key = this.state.todolist.length;
    this.state.todolist.push(tempTodo);
    this.setState({
      todolist : this.state.todolist
    });
     this.storage.setState(this.state.todolist);
  }

  /**
   * @argument key
   * @description A function call when users clicks on Done in modal
   */
  modalDone(key : number) : void {
    alert(key)
    this.state.todolist[key].done = this.state.tempTodo.done;
    this.state.todolist[key].title = this.state.tempText;
    this.setState({ 
      todolist: this.state.todolist,
      showModal : false
     });
     this.storage.setState(this.state.todolist);
  }

  done (key : number) : void {
    this.state.todolist[key].done = true;
    this.setState({
      todolist : this.state.todolist
    })
    this.storage.setState(this.state.todolist);
  }

  undone (key : number) : void {
    alert(key);
    this.state.todolist[key].done = false;
    this.setState({ todolist: this.state.todolist });
     this.storage.setState(this.state.todolist);
  }

   /**
   * @argument key
   * @description A function call when users clicks on Undone in the modal
   */
  modalUndone(key : number) : void {
    this.state.todolist[key].done = this.state.tempTodo.done;
    this.state.todolist[key].title = this.state.tempText;
    this.setState({ todolist: this.state.todolist, showModal: false });
    this.storage.setState(this.state.todolist);
  }

  modalClose () : void {
    this.setState({
      showModal : false
    })
  }

  handleChange(e: any) {
    this.setState({ 
      tempText: e.target.value
    });
  }

  aboutToEdit (key : number) : void {
    let tempTodo = this.state.todolist[key];
    tempTodo.key = key;
    this.state.tempText = tempTodo.title;
    this.setState({
      tempTodo : tempTodo,
      showModal : true
    })
  }

}
