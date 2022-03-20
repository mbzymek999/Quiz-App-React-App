import React, {useState} from "react";
import axios from "axios";
import {Badge, Button, Col, Container, Row} from "react-bootstrap";
import globalUrl from "../globalUrl";

function CreateQuestion() {
    const [isLoading, setLoading] = useState(false);

    const handleSetInputs = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const initialValues = {
        title: "",
        description: ""
    };

    const [values, setValues] = useState({
        title: "",
        description: ""
    });
    const [show, setShow] = useState(false);

    let createQuestion = (event) => {
        console.log(values)
        event.preventDefault();
        setLoading(true);
        axios.post(`${globalUrl().url}/create/question`, values)
            .then((response) => {
                if (response.data != null) {
                    setShow(true);
                    setLoading(false);
                    setTimeout(() => setShow(false), 3000);
                    // window.location.reload(false);
                } else {
                    setLoading(false);
                    setShow(false);

                }
            }).catch(err => {
            console.log(err)
            setLoading(false);
        })
        setValues(initialValues);
    };

    return (
            <Row>
                <Col></Col>
                <Col className="col-10">
                    <div className="card bg-light">
                        <Container>
                            <h2 className="text-center mt-3"><Badge className="bg-primary">Dodaj nowe pytanie</Badge></h2>
                            <form onSubmit={createQuestion}>
                                <Row>
                                    <Col>
                                        <label className="mb-1">Tytuł pytania</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={values.title}
                                            onChange={handleSetInputs}
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <label className="mb-1">Odpowiedź</label>
                                        <textarea
                                            style={{height: "200px"}}
                                            type="text"
                                            value={values.description}
                                            name="description"
                                            onChange={handleSetInputs}
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                                <br/>
                                <div className="d-flex mb-3">
                                    { !isLoading &&
                                        <Button
                                            className="btn btn-primary"
                                            type="submit"
                                            onSubmit={createQuestion}
                                        >Zapisz</Button>
                                    }
                                    { isLoading &&
                                        <button
                                            className="btn btn-primary"
                                            disabled
                                            type="submit"
                                        >
                                                <span className="spinner-border spinner-border-sm" role="status"
                                                      aria-hidden="true"/>
                                            Zapisywanie...
                                        </button>
                                    }
                                </div>
                            </form>
                        </Container>
                    </div>
                </Col>
                <Col></Col>
            </Row>
    );
}

export default CreateQuestion