import { useParams } from "react-router-dom"
const Profile = () => {

    const params = useParams<{ id: string }>()
    return (
        <div>{params.id }</div>
    )
}

export default Profile