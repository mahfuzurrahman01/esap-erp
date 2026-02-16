export default async function ProfileSettingsLayout(props: {
  children: React.ReactNode
  params: Promise<{
    lang: string
  }>
}) {
  const { children } = props

  return <>{children}</>
}
