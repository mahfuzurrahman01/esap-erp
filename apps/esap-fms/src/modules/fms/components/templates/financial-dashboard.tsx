import CashFlowChart from "../containers/dashboard/cash-flow-chart"
import Intro from "../containers/dashboard/intro"
import PaymentList from "../containers/dashboard/payment-list"
import Profit from "../containers/dashboard/profit"
import TopBankAccount from "../containers/dashboard/top-bank-account"
import TotalIncome from "../containers/dashboard/total-income"

export default function FinancialDashboard() {
  return (
    <>
      <section className="@container">
        <div className="mx-auto grid max-w-[1360px] grid-cols-6 gap-6 py-10 @7xl:gap-10">
          <Intro />
          <div className="col-span-full grid grid-cols-12 gap-6 @7xl:gap-10">
            <TotalIncome />
            <Profit />
            <PaymentList />
            <TopBankAccount />
            <CashFlowChart />
          </div>
        </div>
      </section>
    </>
  )
}
