import {Col, Container, Row} from "react-bootstrap";
import Register from "./Register";
import Login from "./Login";
import "../stylesheets/LoginPage.css"
import {getUsers, login, registerUser} from "../actions";
import {useDispatch} from "react-redux";
import {useMemo} from "react";
import { useHistory } from 'react-router-dom'
// React form validation based on https://dev.to/alecgrey/controlled-forms-with-front-and-backend-validations-using-react-bootstrap-5a2
function LoginPage(){
    const dispatch = useDispatch();

    useMemo(()=>{
        fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()).then(res =>
        {
            dispatch(getUsers(res));

        }, []);
    })

    return <div className={"LoginPagee"}>
        <Container className={"container-fluid"}>
            <Row className={"header"}>
                <h1 className="riceBookTitle">RiceBook</h1>
            </Row>
            <Row id="LoginPage">
                <Col className={"col-5"}>
                    <Row>
                        <h1 className="text">Create Account</h1>
                    </Row>
                    <Row>
                        <Register registerFtn={(userName)=> {
                            dispatch(registerUser(userName))
                        }}/>
                    </Row>
                </Col>
                <Col className={"col-2"}></Col>
                <Col className={"col-5"}>
                    <Row>
                        <h1 className="text">Login</h1>
                    </Row>
                    <Row>
                        <Login loginFtn={(userName, password)=>{
                            dispatch(login(userName, password))
                            }}/>
                    </Row>
                </Col>

            </Row>

        </Container>
    </div>
}

export default LoginPage;