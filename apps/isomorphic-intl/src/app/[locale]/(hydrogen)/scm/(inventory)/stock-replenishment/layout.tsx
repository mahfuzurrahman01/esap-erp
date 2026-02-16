export default async function StockReplenishmentLayout(props: {
  children: React.ReactNode
  params: Promise<{
    lang: string
  }>
}) {
  const { children } = props

  return <>{children}</>
}
