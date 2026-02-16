import UserDetailsComponent from "@/modules/crm/components/templates/users/view"

const UserProfileComponent = ({ id }: { id: string }) => {
  return <UserDetailsComponent id={id} />
}

export default UserProfileComponent
