import UserDetailsComponent from "../users/view"

const UserProfileComponent = ({ id }: { id: string }) => {
  return <UserDetailsComponent id={id} />
}

export default UserProfileComponent
