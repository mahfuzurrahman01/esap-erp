import { AuthApiEndpoints } from "@/client/auth-api-endpoint"
import { HRMSApiEndpoints } from "@/server/service/hrms/hrms-api-endpoints"

import { CRMApiEndpoints } from "../modules/crm/clients/crm-api-endpoint"
import { FMSApiEndpoints } from "../modules/fms/clients/fms-api-endpoint"
import { SCMApiEndpoint } from "../modules/scm/clients/scm-api-endpoints"

export const ApiEndpoint = {
  fms: { ...FMSApiEndpoints },
  auth: { ...AuthApiEndpoints },
  crm: { ...CRMApiEndpoints },
  hr: { ...HRMSApiEndpoints },
  scm: { ...SCMApiEndpoint },
}
