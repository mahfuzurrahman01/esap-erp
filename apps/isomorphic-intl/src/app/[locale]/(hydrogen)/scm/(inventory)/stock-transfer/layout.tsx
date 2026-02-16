export default async function StockTransferFromLayout(props: {
  children: React.ReactNode
  params: Promise<{
    lang: string
  }>
}) {
  const { children } = props

  return <>{children}</>
}
