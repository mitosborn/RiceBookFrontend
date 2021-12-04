import {Alert, Button, Col, Form, Image, Row} from "react-bootstrap";
import {useState} from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";


// React form validation based on https://dev.to/alecgrey/controlled-forms-with-front-and-backend-validations-using-react-bootstrap-5a2
function Login({loginFtn}) {
    const [validated, setValidated] = useState(false);
    const [accountName, setAccountName] = useState("");
    const [password, setPassword] = useState("");
    let userLoginInfo = useSelector((state) => state.userLoginInfo);
    const [showAlert, setShowAlert] = useState(false);
    // let showAlert = useSelector((state) => state.error);
    const history = useHistory();




    const handleSubmit = (event) => {
        //loginFtn(accountName, password) -> Need to create this ftn and put this code in it in reducers.js
        event.preventDefault();
        setValidated(true);
        loginFtn(accountName, password, (status) => {
            if(status == 200){
                setShowAlert(false)
                history.push({
                    pathname:"/"
                });
            } else {
                setShowAlert(true)
            }
        })


        // if (!showAlert) {
        //     history.push({
        //         pathname:"/"
        //     })
        // }
    };


    return <div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>Account name</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Account name"
                    pattern="^[a-zA-Z]{1}[A-Za-z0-9]*"
                    onChange={(e)=> setAccountName(e.target.value)}
                />
            </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom02">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    onChange={(e)=> setPassword(e.target.value)}
                />
            </Form.Group>
        </Row>
        <div className="modal-footer d-flex justify-content-center">
            <Button type="submit">Login</Button>
            <a className={"btn btn-outline-dark googleBtn"} href="https://finalbackend-mbo2.herokuapp.com/auth/google" role="button">
                <Image className={"googleImage"} alt={"Google sign-in"}
                       src={"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"}/>
                Login with Google
            </a>




        </div>
    </Form>
        <Alert variant="danger" show={showAlert}>
            <Alert.Heading>Error:</Alert.Heading>
            <p>Incorrect account name or password</p>
        </Alert>
    </div>

}

export default Login;