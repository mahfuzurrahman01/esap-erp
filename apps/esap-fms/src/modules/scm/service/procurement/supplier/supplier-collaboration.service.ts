import { Replay, SupplierCollaboration, SupplierCollaborationPaginator, SupplierCollaborationQueryOptions } from "@/modules/scm/types/procurement/supplier/supplier-collaboration-types";
import { ApiEndpoint } from "@/server/client";
import HttpClient from "@/utils/axios";





export const SupplierCollaborationService = {
  all: (params: Partial<SupplierCollaborationQueryOptions>) =>
    HttpClient.get<SupplierCollaborationPaginator>(
      ApiEndpoint.scm.getAllSupplierCollaboration,
      params
    ),
  get: (id: number) =>
    HttpClient.get<SupplierCollaboration>(
      ApiEndpoint.scm.getSupplierCollaborationById(id)
    ),
  create: (input: SupplierCollaboration) =>
    HttpClient.post<SupplierCollaboration>(
      ApiEndpoint.scm.createSupplierCollaboration,
      input,
      true
    ),
  patch: (id: number, input: SupplierCollaboration) =>
    HttpClient.patch<SupplierCollaboration>(
      ApiEndpoint.scm.markAsRead(id),
      input,
      true
    ),
  patchStarred: (id: number, input: SupplierCollaboration) =>
    HttpClient.patch<SupplierCollaboration>(
      ApiEndpoint.scm.markAsStarred(id),
      input,
      true
    ),
  patchImportant: (id: number, input: SupplierCollaboration) =>
    HttpClient.patch<SupplierCollaboration>(
      ApiEndpoint.scm.markAsImportant(id),
      input,
      true
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteSupplierCollaboration(id)),
  sendSupplierEmailReplay: (input: Replay) =>
    HttpClient.post<Replay>(
      ApiEndpoint.scm.sendSupplierEmailReplay,
      input,
      true
    ),
}