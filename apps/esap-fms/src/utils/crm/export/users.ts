export const exportUserData = (data: any) => {
  return data?.users && Array.isArray(data.users)
    ? data.users.map(
        ({
          id,
          fullName,
          email,
          phoneNumber,
          country,
          status,
          avatar,
          address,
        }: any) => ({
          ID: id,
          fullName,
          email,
          phoneNumber,
          country,
          status,
          avatar,
          address,
        })
      )
    : []
}
