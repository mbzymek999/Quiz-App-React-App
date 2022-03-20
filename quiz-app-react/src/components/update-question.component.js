import React, {useEffect, useState} from "react";
import axios from "axios";
import {Badge, Button, Col, Container, Row} from "react-bootstrap";
import globalUrl from "../globalUrl";
import {useParams} from "react-router-dom";

export default function UpdateQuestionComponent() {

    const { clientId } = useParams();
    const [question, setQuestion] = useState([]);
    const [show, setShow] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const handleSetInputs = (e) => {
        setQuestion({ ...question, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        axios.get(`${globalUrl().url}/question/` + clientId).then(
            (response) => {
                setQuestion(response.data);
            },
            (error) => {
                const _question =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setQuestion(_question);
            }
        );
    }, [clientId]);

    let updateQuestion = (event) => {
        event.preventDefault();
        axios.put(`${globalUrl().url}/update/question/`+(clientId), question)
            .then((response) => {
                if (response.data != null) {
                    setShow(true);
                    setTimeout(() => setShow(false), 3000);
                    window.location.reload(false);
                } else {
                    setShow(false);
                }
            }).catch(err => {
            console.log(err)
        })
        setQuestion(question);
    };

    return (
        <Row>
            <Col></Col>
            <Col className="col-10">
                <div className="card bg-light">
                    <Container className="mt-3">
                        <h3 className="text-center">Edycja pytania <strong>{question.title}</strong></h3>
                        <form onSubmit={updateQuestion}>
                            <Row>
                                <Col>
                                    <label className="mb-1">Tytuł pytania</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={question.title}
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
                                        value={question.description}
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
                                        onSubmit={updateQuestion}
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