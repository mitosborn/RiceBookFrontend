import FollowedUser from "./FollowedUser";
import '../stylesheets/FollowedUsersContainer.css'
function FollowedUsersContainer({props, unfollowFtn}) {
    console.log(props);
    let posts = props.map((user) => {
        return <FollowedUser key={user.id} user={user.username} img={user.img} headline={user.headline} unfollowFtn={unfollowFtn}/>
    })

    return (
        <div className={"followContainer"}>
            {posts}
        </div>
    )


}

export default FollowedUsersContainer;