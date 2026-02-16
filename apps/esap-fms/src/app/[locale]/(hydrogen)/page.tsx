import { metaObject } from "@/config/site.config";

import FinancialDashboard from "@/modules/fms/components/templates/financial-dashboard";
export const metadata = {
  ...metaObject(),
};

export default function FileDashboardPage() {
  return <FinancialDashboard />;
}
