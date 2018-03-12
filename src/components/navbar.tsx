/**
 * This the navbar for ToDo web app
 */
import * as React from 'react';
import * as BT from 'react-bootstrap';
import { bootstrapUtils } from "react-bootstrap/lib/utils";
// Bootstrap Utility function for adding custom styles
bootstrapUtils.addStyle(BT.Navbar, 'custom');

export default class Navbar extends React.Component {

    render () {
         return <div>
          <style type="text/css">{`
                .navbar-custom {
                    background-color: blue;
                    color: white;
                }
                 .navbar ul li a{
                    color : white
                }
                `}</style>
          <BT.Navbar collapseOnSelect bsStyle="custom">
            <BT.Navbar.Header>
              <BT.NavbarBrand>
                <a style={{ color: "white" }} href="/">
                  Todo
                </a>
              </BT.NavbarBrand>
            </BT.Navbar.Header>
            <BT.Navbar.Toggle/>
            <BT.Navbar.Collapse>
              <BT.Navbar.Form pullLeft>
                <BT.FormGroup>
                  <BT.InputGroup>
                    <BT.FormControl placeholder="Search Todo" type="text" />
                    <BT.InputGroup.Addon>
                      <BT.Glyphicon glyph="search" />
                    </BT.InputGroup.Addon>
                  </BT.InputGroup>
                </BT.FormGroup>
              </BT.Navbar.Form>
              <BT.Nav pullRight>
                <BT.NavItem eventKey={1} href="#">
                  Docs
                </BT.NavItem>
                <BT.NavItem eventKey={2} href="#">
                  BLog
                </BT.NavItem>
              </BT.Nav>
            </BT.Navbar.Collapse>
          </BT.Navbar>
        </div>;
    }
}