export default async function WarehouseLayout(props: {
  children: React.ReactNode
  params: Promise<{
    lang: string
  }>
}) {
  const { children } = props

  return <>{children}</>
}
