import FollowedUser from "./FollowedUser";
import '../stylesheets/FollowedUsersContainer.css'
function FollowedUsersContainer({props, unfollowFtn}) {
    console.log(props);
    let posts = props.map((user) => { // Have get profile query instead
        return <FollowedUser key={user._id} user={user.username} img={user.picture} headline={user.status} unfollowFtn={unfollowFtn}/>
    })

    return (
        <div className={"followContainer"}>
            {posts}
        </div>
    )


}

export default FollowedUsersContainer;