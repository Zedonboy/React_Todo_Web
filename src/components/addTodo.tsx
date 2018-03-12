import * as React from 'react';
import * as BT from 'react-bootstrap';

export default class AddTodo extends React.Component {
    render () {
        return (
            <BT.Panel>
                <BT.Panel.Heading>
                    Add Todo
                </BT.Panel.Heading>
                <BT.Panel.Body>
                    <BT.Form>
                        <BT.InputGroup>
                            <BT.FormControl placeholder="click on the '+' to add Todo" type="text"/>
                            <BT.InputGroup.Addon><BT.Glyphicon glyph="list-alt"/></BT.InputGroup.Addon>
                        </BT.InputGroup>
                    </BT.Form>
                </BT.Panel.Body>
            </BT.Panel>
        )
    }
}