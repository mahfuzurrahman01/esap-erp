import { WarehouseInput } from "@/modules/scm/types/inventory/warehouse/warehouse-types"

export const defaultWarehouse: WarehouseInput = {
  warehouseName: "",
  warehouseManagerId: 0,
  companyId: 0,
  companyName: "",
  location: "",
  capacity: 0,
  inUseCapacity: 0,
  startHour: "",
  endHour: "",
  zoningLocation: "",
  binLocation: "",
  quantityToPick: 0,
  datePicked: "",
  pickedBy: "",
  packedBy: "",
  temperatureControlled: false,
  fireSafetyCompliance: false,
  emergencyContact: "",
  status: true,
}
