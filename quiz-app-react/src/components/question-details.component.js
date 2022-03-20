import React, {useState, useEffect} from "react";
import {Badge, Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import globalUrl from "../globalUrl";
import {useParams} from "react-router-dom";

export default function QuestionDetailsComponent() {

    const { clientId } = useParams();
    const [question, setQuestion] = useState([]);

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

    return (
        <Card className={"bg-light"}>
            <Container className={"mt-3"}>
                <h3 className="text-center"><Badge className="bg-primary">Odpowiedz na pytanie.</Badge></h3>
                <Row className="mb-3 mt-4">
                    <Col>
                        <h2 className="mb-3">Pytanie: <strong>{question.title}</strong></h2>
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
                    </Col>
                </Row>
            </Container>
        </Card>

    );
}
