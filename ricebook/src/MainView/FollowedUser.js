import {Button, Col, Image, Row} from "react-bootstrap";
import "../stylesheets/FollowedUser.css"
function FollowedUser({user, img, headline, unfollowFtn}) {
    return (
        <div className={"followedUserContainer"}>
            <Row>
                <Col className={"col-5"}>
                    <div className="profileImage">
                        <Image src={img} fluid/>
                    </div>
                </Col>
                <Col className={"col-7"}>
                    <div className={"userTextContainer"}>
                        <h3 className={"userText"}>{user}</h3>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className={"headlineTextContainer"}>
                        <h3 className={"userText"}>{headline}</h3>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Button onClick={()=> unfollowFtn(user)}>Unfollow</Button>
                </Col>
            </Row>
        </div>
    )
}

export default FollowedUser;