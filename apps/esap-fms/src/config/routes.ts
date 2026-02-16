import { fmsRoutes } from "./routes/fms.routes"
import { crmRoutes } from "./routes/crm.routes"
import { hrRoutes } from "./routes/hr.routes"
import { scmRoutes } from "./routes/scm.routes"

export const routes = {
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  fms: {
    ...fmsRoutes,
  },
  crm: {
    ...crmRoutes,
  },
  hr: {
    ...hrRoutes,
  },
  scm: {
    ...scmRoutes,
  },
}
