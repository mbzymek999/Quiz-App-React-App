import './App.css';
import {Link, Route, Router, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { history } from './helpers/history';
import QuestionController from "./components/question.component";
import {Navbar, Container, Nav, Button} from "react-bootstrap"

function App() {
  return (
      <div>
          <Router history={history}>
              <Navbar style={{background: "#205aab"}} className="m-0 p-0" expand="sm">
                  <Container fluid>
                      <Navbar.Brand href="/home">
                          <h3 className="m-0 " style={{color: "ghostwhite"}}><b>Quiz<span style={{color: "gold"}}>App</span></b></h3>
                      </Navbar.Brand>
                      <Navbar.Toggle aria-controls="navbarScroll" />
                      <Navbar.Collapse id="navbarScroll">
                          <Nav
                              className="me-auto my-2 my-lg-0"
                              style={{ maxHeight: '100px' }}
                              navbarScroll
                          >
                              <Nav.Link>
                                  <li className="nav-item">
                                      <Link to={"/question"} className="nav-link">
                                          <Button style={{background: "rgba(6,65,96,0.91)"}} className="btn btn-outline-light buttonNav">Wylosuj pytanie</Button>
                                      </Link>
                                  </li>
                              </Nav.Link>

                              <Nav.Link>
                                  <li className="nav-item">
                                      <Link to={"/questions"} className="nav-link">
                                          <Button style={{background: "rgba(6,65,96,0.91)"}} className="btn btn-outline-light buttonNav">Twoje pytania</Button>
                                      </Link>
                                  </li>
                              </Nav.Link>

                              <Nav.Link>
                                  <li className="nav-item">
                                      <Link to={"/create_question"} className="nav-link">
                                          <Button style={{background: "rgba(6,65,96,0.91)"}} className="btn btn-outline-light buttonNav">Dodaj pytanie</Button>
                                      </Link>
                                  </li>
                              </Nav.Link>
                          </Nav>
                      </Navbar.Collapse>
                  </Container>
              </Navbar>
              <Container className={"mt-5"}>
                  <Switch>
                      <Route path="/question" component={QuestionController} />
                  </Switch>
              </Container>
          </Router>
      </div>
  );
}

export default App;
