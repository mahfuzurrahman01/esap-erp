import { SCMApiEndpoint } from "@/modules/scm/clients/scm-api-endpoints"
import { HRMSApiEndpoints } from "@/server/service/hrms/hrms-api-endpoints"

import { AuthApiEndpoints } from "../modules/crm/clients/auth-api-endpoint"
import { CRMApiEndpoints } from "../modules/crm/clients/crm-api-endpoint"
import { FMSApiEndpoints } from "../modules/fms/clients/fms-api-endpoint"

export const ApiEndpoint = {
  hr: {
    ...HRMSApiEndpoints,
  },
  scm: { ...SCMApiEndpoint },
  crm: { ...CRMApiEndpoints },
  fms: { ...FMSApiEndpoints },
  auth: { ...AuthApiEndpoints },
}
