export default async function RiskEvaluationLayout(props: {
  children: React.ReactNode
  params: Promise<{
    lang: string
  }>
}) {
  const { children } = props

  return <>{children}</>
}
