import '../stylesheets/Post.css'
import {Col, Row} from "react-bootstrap";

function Comment({user, body}) {
    return (
        <div>
            <Row>
                <Col className={"postHeader"}>
                    <div className={"postHeaderUser"}>
                        <h6 className={"m-1"}>{user}</h6>
                    </div>
                </Col>
            </Row>
            <Row className={"mb-2"}>
                <Col>
                    {body}
                </Col>
            </Row>
        </div>
    )

}

export default Comment;