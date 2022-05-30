import EditProfileContainer from "../components/EditProfileContainer";
import ProfileData from "../components/ProfileData";



const Profile = () => {
    return (
     <div className= "profile-page">
        <ProfileData/>
        <EditProfileContainer/>
     </div>  
    )
}

export default Profile;