import {useState} from "react";
import {Alert, Button, Col, Form, InputGroup, Row} from 'react-bootstrap'
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {doLogin} from "../actions";

function Register({registerFtn}) {
    const [validated, setValidated] = useState(false);
    const [ form, setForm ] = useState({})
    const [ errors, setErrors ] = useState({})
    const [accountName, setAccountName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [date, setDate] = useState(new Date());
    const [email, setEmail] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const users = useSelector(state => state.users);
    const [showAlert, setShowAlert] = useState(false)
    const history = useHistory();
    const dispatch = useDispatch();

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        if ( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        const newErrors = findFormErrors()
        if ( Object.keys(newErrors).length > 0 ) {
            setErrors(newErrors)
        }
        else if(form.checkValidity()) {
            console.log("called register")
            registerFtn(accountName, email, zipcode, password, date).then((res) => {
                console.log(res);
                if (res.status != 200) {
                    // User already exists
                    setShowAlert(true)
                }
                else {
                    dispatch(doLogin(accountName, password, (status) => {
                        if (status == 200) {
                            setShowAlert(false)
                            history.push({"pathname": "/"})
                        }
                    }));
                }
            });

        }

        setValidated(true);
    };

    const findFormErrors = () => {
        const {date, password, passwordValidation} = form
        const newErrors = {}
        // name errors
        if (!checkDOB(date)) newErrors.date = 'cannot be blank!'
        if (!checkPassword(password, passwordValidation)) newErrors.password = 'cannot be blank!'
        // Check that new name is unique
        if (users.filter(user => user.username == accountName).length > 0) {
            // Display error message
            console.log(users.filter(user => user.username == accountName));
            newErrors.accountname = 'Error: Account already exists';
        }
        return newErrors
    }

    const checkDOB = (event) => {
        console.log(event)
        const min_date = new Date();
        min_date.setFullYear(min_date.getFullYear() - 18);
        let entered_val = new Date(event);
        // Correct one day offset due to Date parsing in UTC
        entered_val = new Date(entered_val.getTime() + entered_val.getTimezoneOffset() * 60000)
        if(entered_val > min_date){
            console.log("Birth date invalid")
            return false;
        }
        setDate(entered_val);
        return true;
    }
    const checkPassword = (pw1, pw2) => {
        console.log("In check Password");
        if (pw1 != pw2) {
            alert("Error: Passwords are not equal");
            return false
        }
        console.log("Passwords are equal");
        return true;
    }

    return (
        <div>
            {showAlert && <Alert variant={'warning'} dismissible onClose={() => setShowAlert(false)}>
                Error: User already exists: Pick new name
            </Alert>}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label>Account name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Account name"
                            pattern="^[a-zA-Z]{1}[A-Za-z0-9]*"
                            onChange={(e)=> setAccountName(e.target.value)}
                            isInvalid={!!errors.accountname}
                        />
                        <Form.Control.Feedback type="invalid">
                            Error: Username already exists.
                        </Form.Control.Feedback>
                    </Form.Group>
                    {/*<Form.Group as={Col} md="6" controlId="validationCustom02">*/}
                    {/*    <Form.Label>Display Name</Form.Label>*/}
                    {/*    <Form.Control*/}
                    {/*        required*/}
                    {/*        type="text"*/}
                    {/*        onChange={(e)=> setDisplayName(e.target.value)}*/}
                    {/*        placeholder="Display Name"*/}
                    {/*    />*/}
                    {/*</Form.Group>*/}
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                        <Form.Label>Email Address</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                required
                                onChange={(e)=> setEmail(e.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter an email address.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" placeholder="555-555-5555" pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}" required onChange={e => setPhone( e.target.value)}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid phone number.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom04">
                        <Form.Label>Birth Date</Form.Label>
                        <Form.Control type="date" onChange={e => setField('date', e.target.value)} isInvalid={!!errors.date}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid date. User must be at least 18.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom05">
                        <Form.Label>Zipcode</Form.Label>
                        <Form.Control type="text" placeholder="Zipcode" pattern="\d{5}(?:[-\s]\d{4})?" required onChange={(e)=> setZipcode(e.target.value)}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid zipcode.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom06">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder={"Password"} onChange={e => {
                            setField('password', e.target.value)
                            setPassword(e.target.value)
                        }} isInvalid={!!errors.password} required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a matching password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom07">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder={"Password"} onChange={e => setField('passwordValidation', e.target.value)} required />
                        <Form.Control.Feedback type="invalid">
                            Please confirm the password.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                    />
                </Form.Group>
                <div className="modal-footer d-flex justify-content-center">
                    <Button type="submit">Create Account</Button>
                </div>
                <input type="hidden" id="submission_time" name="timestamp"/>
            </Form>
        </div>

            );
}

export default Register;