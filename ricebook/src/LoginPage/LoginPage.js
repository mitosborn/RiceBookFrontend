import {Col, Container, Row} from "react-bootstrap";
import Register from "./Register";
import Login from "./Login";
import "../stylesheets/LoginPage.css"
import {doLogin, doRegister, fetchLogin, getUsers, login, registerUser, url} from "../actions";
import {useDispatch} from "react-redux";
import {useMemo} from "react";

// React form validation based on https://dev.to/alecgrey/controlled-forms-with-front-and-backend-validations-using-react-bootstrap-5a2
function LoginPage(){
    const dispatch = useDispatch();

    useMemo(()=>{
        fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()).then(res =>
        {
            dispatch(getUsers(res));

        }, []);
    })

    const loginFCTN = (username, password) => {
        let loginUser = {username, password};
        let status, following, articles;
        fetch(url('/login'), {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(loginUser),
            credentials: 'include'
        }).then(res => {
            if (res.status != 200) {
                status = -1
            } else {
                res.json().then(res => {
                    dispatch(login(username, password))

                    // Get followers
                    fetch(url('/following'), {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include'
                    }).then(res => res.json()).then(res => {
                        console.log(res);
                        following = res['following']
                        ///////
                        fetch(url('/articles'), {
                            method: 'GET',
                            headers: {'Content-Type': 'application/json'},
                            credentials: 'include'
                        }).then(res => res.json()).then(res => {
                            console.log(res);
                            articles = res['articles']
                        })
                    })
                    // Get new articles
                    // Use set articles query (For now use queryArticles)

                }).then(res => dispatch(login(username, password)));
            }
        }).then(res => console.log(res)).catch(err => console.log(err))
    }


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
                        <Register registerFtn={(username, email, zipcode, password, dob)=> {
                            return doRegister(username, email, zipcode, password, dob)
                        }}/>
                    </Row>
                </Col>
                <Col className={"col-2"}></Col>
                <Col className={"col-5"}>
                    <Row>
                        <h1 className="text">Login</h1>
                    </Row>
                    <Row>
                        <Login loginFtn={async (username, password, redirect) => {
                            await dispatch(doLogin(username, password, redirect))
                            console.log("Called dispatch")
                        }
                        }/>
                    </Row>
                </Col>

            </Row>

        </Container>
    </div>
}

export default LoginPage;