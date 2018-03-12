import * as React from "react";
import * as BT from "react-bootstrap";
import { Todo } from "../utils/todo";

interface Property {
  idKey : number,
  todo? : Todo,
  onEdit : (key : number) => void,
  onDone : (key : number) => void,
  onDelete : (key : number) => void,
  onUndone : (key : number) => void
}

export default class AddTodo extends React.Component<Property> {
  constructor(props) {
    super(props)
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDone = this.handleDone.bind(this);
    this.handleUndone = this.handleUndone.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleEdit () {
    this.props.onEdit(this.props.idKey);
  }
  handleDone () {
    this.props.onDone(this.props.idKey);
  }
  handleDelete () {
    this.props.onDelete(this.props.idKey);
  }
  handleUndone () {
    this.props.onUndone(this.props.idKey);
  }
  render() {
    return <BT.ListGroupItem header={this.props.todo.title} key={this.props.idKey}>
        <BT.Row>
          <BT.Col lg={8} />
          <BT.Col lg={4}>
            <BT.Row>
              <BT.ButtonGroup>
                {/* A tenery/conditional View to render */}
                {this.props.todo.done ? <BT.OverlayTrigger placement="top" overlay={<BT.Tooltip id="tooltip">
                        Undone
                      </BT.Tooltip>}>
                    <BT.Button onClick={this.handleUndone}>
                      <BT.Glyphicon glyph="repeat" />
                    </BT.Button>
                  </BT.OverlayTrigger> : <BT.OverlayTrigger placement="top" overlay={<BT.Tooltip id="tooltip">
                        Done
                      </BT.Tooltip>}>
                    <BT.Button onClick={this.handleDone}>
                      <BT.Glyphicon glyph="ok" />
                    </BT.Button>
                  </BT.OverlayTrigger>}

                <BT.OverlayTrigger placement="top" overlay={<BT.Tooltip id="tooltip">
                      Edit
                    </BT.Tooltip>}>
                  <BT.Button onClick={this.handleEdit}>
                    <BT.Glyphicon glyph="edit" />
                  </BT.Button>
                </BT.OverlayTrigger>

                <BT.OverlayTrigger placement="top" overlay={<BT.Tooltip id="tooltip">
                      Delete
                    </BT.Tooltip>}>
                  <BT.Button onClick={this.handleDelete}>
                    <BT.Glyphicon glyph="trash" />
                  </BT.Button>
                </BT.OverlayTrigger>

              </BT.ButtonGroup>
            </BT.Row>
          </BT.Col>
        </BT.Row>
      </BT.ListGroupItem>;
  }
}