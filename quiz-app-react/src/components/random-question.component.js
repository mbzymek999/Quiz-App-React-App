import React, {useState} from "react";
import {Badge, Button, Card, Col, Container, Row, Collapse} from "react-bootstrap";
import axios from "axios";
import globalUrl from "../globalUrl";

export default function RandomQuestionComponent() {

    const [question, setQuestion] = useState([]);
    const [open, setOpen] = useState(false);

    function randomQuestion () {
        axios.get(`${globalUrl().url}/question/random`).then(
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
        )
    }

    return (
        <Card className={"bg-light"}>
            <Container className={"mt-3"}>
                <h3 className="text-center"><Badge className="bg-primary">Odpowiedz na pytanie.</Badge></h3>
                <Row>
                    <Col>
                        <h2 className="mb-3">Pytanie: <strong>{question.title}</strong></h2>
                        <Button
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            className="bg-primary"
                        >
                            Sprawdź opowiedź
                        </Button>
                        <Collapse in={open}>
                            <div id="example-collapse-text" className="mt-3">
                                Odpowiedź:
                                <textarea
                                    style={{height: "300px"}}
                                    type="text"
                                    value={question.description}
                                    name="description"
                                    className="form-control"
                                />
                            </div>
                        </Collapse>
                    </Col>
                </Row>
                <Row className="mt-3 mb-5">
                    <Col></Col>
                    <Col>
                        <Button style={{width: "100%"}} className="btn-success btn" size="lg" onClick={() => randomQuestion()}><strong>Wylosuj!</strong></Button>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </Card>

    );
}
