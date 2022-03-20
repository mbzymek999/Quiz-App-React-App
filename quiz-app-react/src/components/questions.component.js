import React, { useState, useEffect } from "react";
import axios from "axios";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import globalUrl from "../globalUrl";

export default function QuestionsComponent() {
    const [question, setQuestions] = useState([]);

    useEffect(() => {
        axios.get(`${globalUrl().url}/questions`).then(
            (response) => {
                setQuestions(response.data);
            },
            (error) => {
                const _question =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setQuestions(_question);
            }
        );
    }, []);

    return (
        <Container className={"mt-5"}>
            <Row>
                <Col>
                    <Table
                        role="table"
                        striped bordered hover className={"bg-light"}>
                        <thead>
                        <tr>
                            <th scope="col">Pytanie</th>
                        </tr>
                        </thead>
                        <tbody>
                        {question.map((item) =>
                            <tr>
                                <td>{item.title}</td>
                                <td style={{textAlign: "center"}}>
                                    <Link to={`/question/${item.clientId}`}>
                                        <Button className="btn btn-info" size="sm">
                                            Podgląd
                                        </Button>
                                    </Link>
                                </td>
                                <td style={{textAlign: "center"}}>
                                    <Link to={`/update_question/${item.clientId}`}>
                                        <Button className="btn btn-warning" size="sm">
                                            Edytuj
                                        </Button>
                                    </Link>
                                </td>
                                <td style={{textAlign: "center"}}>
                                    <Link to={`/delete_question/${item.clientId}`}>
                                        <Button className="btn btn-danger" size="sm">Usuń</Button>
                                    </Link>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>

    );
}