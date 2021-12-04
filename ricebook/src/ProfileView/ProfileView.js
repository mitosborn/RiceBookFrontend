import {Button, Col, Form, Image, Row} from "react-bootstrap";
import {useState} from "react";
import "../stylesheets/ProfileView.css"
import logo from "../img/logo192.png"
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {doUpdateAvatar, doUpdateEmail, doUpdatePassword, doUpdateZipcode} from "../actions";

// React form validation based on https://dev.to/alecgrey/controlled-forms-with-front-and-backend-validations-using-react-bootstrap-5a2
function ProfileView() {
    let loggedIn = useSelector((state) => state.loggedIn);
    const history = useHistory();
    if(!loggedIn) {
        history.push({"pathname":"/login"})
    }
    const userInformation = useSelector((state)=> state.currentUser);

    const [validated, setValidated] = useState(false);
    const [ form, setForm ] = useState({});
    const [ errors, setErrors ] = useState({});
    const [currentValues, setCurrentValues] = useState({accountName:userInformation.username, email:userInformation.email, zipCode:userInformation.zipcode, password:"randomPassword", passwordValidation:"randomPassword", picture: userInformation.picture}); //phone:userInformation.phone
    const [img, setImg] = useState('');
    const dispatch = useDispatch();


    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if ( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const submittedForm = event.currentTarget;
        const newErrors = findFormErrors()
        if (submittedForm.checkValidity() === false) {
            event.stopPropagation();
        }
        else if ( Object.keys(newErrors).length > 0 ) {
            setErrors(newErrors)
        }
        else {
            updateCurrentForm(form);
            setForm({});
        }
        setValidated(true);

    };

    const updateCurrentForm = (form) => {
        let new_values = Object.fromEntries(Object.entries(form).filter(([_, v]) => v != null && v != ''))

        if (img) {
            dispatch(doUpdateAvatar(img));
        }
        if (new_values['email']) {
            dispatch(doUpdateEmail(new_values['email']));
        }
        if (new_values['zipCode']) {
            dispatch(doUpdateZipcode(new_values['zipCode']));
        }
        if (new_values['password']) {
            doUpdatePassword(new_values['password'])
        }
        setCurrentValues({...currentValues, ...new_values});
    }

    const findFormErrors = () => {
        const {password, passwordValidation} = form
        const newErrors = {}
        // name errors
        if (!checkPassword(password, passwordValidation)) newErrors.password = 'cannot be blank!'
        return newErrors
    }
    const checkPassword = (pw1, pw2) => {

        if (pw1 != pw2) {
            return false
        }

        return true;
    }



    return <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className={"mb-2"}>
            <Col id={"header"}>
                <div className={"text-center mt-2 position-relative"}>
                    <h1 className={"w-100 text-center"} id={"title"}>
                        Profile View
                    </h1>
                    <div>
                        <Button className={"btn btn-primary"} id={"backButton"} onClick={()=>{history.push({pathname:"/"})}}>Go Back</Button>
                    </div>
                </div>
            </Col>
        </Row>
        <Row className={"mb-4"}>
            <Col className="text col-6">
                <h2>Updated Value</h2>
            </Col>
            <Col className="text col-6">
                <h2>Current Value</h2>
            </Col>
        </Row>
        {/*<Row className="m-4">*/}
        {/*    <Form.Group as={Col} className={"col-6"} controlId="validationCustom01">*/}
        {/*        <Form.Label>Account name</Form.Label>*/}
        {/*        <Form.Control*/}
        {/*            type="text"*/}
        {/*            placeholder="Account name"*/}
        {/*            pattern="^[a-zA-Z]{1}[A-Za-z0-9]*"*/}
        {/*            onChange={e => setField('accountName', e.target.value)}*/}
        {/*            value = {form["accountName"] || ""}*/}
        {/*        />*/}
        {/*        <Form.Control.Feedback type="invalid">*/}
        {/*            Account name must start with a letter and consist only of letters and numbers.*/}
        {/*        </Form.Control.Feedback>*/}
        {/*    </Form.Group>*/}
        {/*    <Col className="col-6 text mt-2">*/}
        {/*        <Form.Label></Form.Label>*/}
        {/*        <h3>{currentValues["accountName"]}</h3>*/}
        {/*    </Col>*/}
        {/*</Row>*/}
        <Row className="m-4">
            <Form.Group className={"col-6"} controlId="validationCustom03">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="ab@c.com"
                    onChange={e => setField('email', e.target.value)}
                    value = {form["email"] || ""}
                />
                <Form.Control.Feedback type="invalid">
                    Improperly formatted email.
                </Form.Control.Feedback>
            </Form.Group>
            <Col className="text mt-2 col-6">
                <Form.Label></Form.Label>
                <h3>{currentValues["email"]}</h3>
            </Col>
        </Row>
        <Row className="m-4">
            <Form.Group as={Col} className={"col-6"} controlId="validationCustom04">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="55555"
                    pattern="\d{5}(?:[-\s]\d{4})?"
                    onChange={e => setField('zipCode', e.target.value)}
                    value = {form["zipCode"] || ""}
                />
                <Form.Control.Feedback type="invalid">
                    Zip code is either a 5 or 9 digit code: 55555 or 55555-5555.
                </Form.Control.Feedback>
            </Form.Group>
            <Col className="text mt-2 col-6">
                <Form.Label></Form.Label>
                <h3>{currentValues["zipCode"]}</h3>
            </Col>
        </Row>
        {/*<Row className="m-4">*/}
        {/*    <Form.Group as={Col} className={"col-6"} controlId="validationCustom04">*/}
        {/*        <Form.Label>Phone Number</Form.Label>*/}
        {/*        <Form.Control*/}
        {/*            type="text"*/}
        {/*            placeholder="555-555-5555"*/}
        {/*            pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"*/}
        {/*            onChange={e => setField('phone', e.target.value)}*/}
        {/*            // value = {form["phone"] || ""}*/}
        {/*        />*/}
        {/*        <Form.Control.Feedback type="invalid">*/}
        {/*            Phone number should be format of 555-555-5555.*/}
        {/*        </Form.Control.Feedback>*/}
        {/*    </Form.Group>*/}
        {/*    <Col className="text mt-2 col-6">*/}
        {/*        <Form.Label></Form.Label>*/}
        {/*        <h3>{currentValues["phone"]}</h3>*/}
        {/*    </Col>*/}
        {/*</Row>*/}
        <Row className="m-4 ">
            <Form.Group as={Col} className={"col-6"} controlId="validationCustom05">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={e => setField('password', e.target.value)} isInvalid={!!errors.password}
                    value = {form["password"] || ""}
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a matching password.
                </Form.Control.Feedback>
            </Form.Group>
            <Col className="text mt-2 col-6">
                <Form.Label></Form.Label>
                <h3>{currentValues["password"] ? "*".repeat(currentValues["password"].length): ""}</h3>
            </Col>
        </Row>
        <Row className="m-4">
            <Form.Group as={Col} className={"col-6"} controlId="validationCustom06">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={e => setField('passwordValidation', e.target.value)}
                    value = {form["passwordValidation"] || ""}
                />
            </Form.Group>
            <Col className="text mt-2 col-6">
                <Form.Label></Form.Label>
                <h3>{currentValues["passwordValidation"] ? "*".repeat(currentValues["passwordValidation"].length): ""}</h3>
            </Col>
        </Row>
        <Row className="m-4">
            <Form.Group as={Col} className={"col-6"} controlId="validationCustom07">
                <Form.Label>Profile Photo</Form.Label><br/>
                <Form.Control
                    type="file" name="image" size="sm" onChange={(e) => setImg(e.target.files[0])}
                />
            </Form.Group>
            <Col className="text mt-2 col-6">
                <Form.Label></Form.Label>
                <Image className="profileImage" src={userInformation.picture} fluid/>
            </Col>
        </Row>

        <div className="modal-footer d-flex justify-content-center">
            <Button type="submit">Update</Button>
        </div>
    </Form>
}

export default ProfileView;