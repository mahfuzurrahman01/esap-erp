import { Invoice } from "@/modules/scm/types/procurement/invoice/invoice-types"
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer"

// Register fonts
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
      fontWeight: 300,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
      fontWeight: 500,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: 700,
    },
  ],
})

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 30,
    fontFamily: "Roboto",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerLeft: {
    alignItems: "flex-start",
  },
  headerRight: {
    alignItems: "flex-end",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 5,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#111827",
    padding: 10,
    marginBottom: 15,
  },
  infoContainer: {
    flexDirection: "column",
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 8,
    border: "1px solid #E5E7EB",
  },
  infoRowContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoColumn: {
    flex: 1,
    paddingHorizontal: 10,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 5,
    marginTop: 5,
  },

  infoRow: {
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: "#4B5563",
    fontWeight: 500,
  },
  value: {
    fontSize: 12,
    color: "#111827",
    marginTop: 2,
  },
  table: {
    marginTop: 10,
    border: "1px solid #E5E7EB",
    borderRadius: 8,
  },
  tableHeader: {
    backgroundColor: "#F9FAFB",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    padding: 10,
  },
  tableHeaderCell: {
    fontSize: 12,
    fontWeight: 600,
    color: "#111827",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    padding: 10,
  },
  tableCell: {
    fontSize: 12,
    color: "#4B5563",
  },
  itemColumn: {
    flex: 1,
  },
  quantityColumn: {
    flex: 1,
    textAlign: "center",
  },
  priceColumn: {
    flex: 1,
    textAlign: "right",
  },
  totalColumn: {
    flex: 1,
    textAlign: "right",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    width: "40%",
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: "#111827",
  },
  summaryValue: {
    fontSize: 12,
    color: "#111827",
  },
  grandTotal: {
    fontSize: 14,
    fontWeight: 700,
    color: "#059669",
  },
})

interface InvoicePdfDocumentProps {
  data: Invoice // Replace 'any' with your invoice type
}

const InvoicePdfDocument = ({ data }: InvoicePdfDocumentProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>ESAP</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.subtitle}>Purchase Invoice</Text>
            <Text style={styles.subtitle}>{data.invoiceBillNo}</Text>
          </View>
        </View>

        {/* Billing Information */}
        <View style={styles.section}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Payment Details</Text>
            <View style={styles.infoRowContainer}>
              <View style={styles.infoColumn}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Supplier Name:</Text>
                  <Text style={styles.value}>{data.supplierName}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Project Name:</Text>
                  <Text style={styles.value}>{data.projectName}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Invoice Date:</Text>
                  <Text style={styles.value}>{data.invoiceDate}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Due Date:</Text>
                  <Text style={styles.value}>{data.dueDate}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Expected Delivery Date:</Text>
                  <Text style={styles.value}>{data.expectedDeliveryDate}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Company Name:</Text>
                  <Text style={styles.value}>{data.companyName}</Text>
                </View>
              </View>
              <View style={styles.infoColumn}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Currency:</Text>
                  <Text style={styles.value}>{data.currencyName}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Grand Total:</Text>
                  <Text style={styles.value}>{data.grandTotal}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Net Total Amount:</Text>
                  <Text style={styles.value}>{data.netTotalAmount}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Total Advance:</Text>
                  <Text style={styles.value}>{data.totalAdvance}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Outstanding Amount:</Text>
                  <Text style={styles.value}>{data.outstandingAmount}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Billing Status:</Text>
                  <Text style={styles.value}>{data.billingStatus}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* Invoice Items */}
       
          <Text style={styles.infoTitle}>Items Details</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.itemColumn]}>
              SN
            </Text>
            <Text style={[styles.tableHeaderCell, styles.quantityColumn]}>
              Product Name
            </Text>
            <Text style={[styles.tableHeaderCell, styles.priceColumn]}>
              Quantity
            </Text>
            <Text style={[styles.tableHeaderCell, styles.priceColumn]}>
              Unit
            </Text>
            <Text style={[styles.tableHeaderCell, styles.totalColumn]}>
              Unit Price
            </Text>
            <Text style={[styles.tableHeaderCell, styles.totalColumn]}>
              Total Price
            </Text>
          </View>
          {data.invoiceItemDtos?.map((item: any, index: number) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.itemColumn]}>
                {index + 1}
              </Text>
              <Text style={[styles.tableCell, styles.quantityColumn]}>
                {item.productName}
              </Text>
              <Text style={[styles.tableCell, styles.priceColumn]}>
                {item.quantity}
              </Text>
              <Text style={[styles.tableCell, styles.priceColumn]}>
                {item.itemUnitName}
              </Text>
              <Text style={[styles.tableCell, styles.totalColumn]}>
                {item.unitPrice}
              </Text>
              <Text style={[styles.tableCell, styles.totalColumn]}>
                {item.totalPrice}
              </Text>
            </View>
          ))}
        </View>
          <Text style={styles.infoTitle}>Purchase Tax Charges</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.itemColumn]}>
              SN
            </Text>
            <Text style={[styles.tableHeaderCell, styles.quantityColumn]}>
              Tax Type
            </Text>
            <Text style={[styles.tableHeaderCell, styles.priceColumn]}>
              Account
            </Text>
            <Text style={[styles.tableHeaderCell, styles.priceColumn]}>
              Tax Rate
            </Text>
            <Text style={[styles.tableHeaderCell, styles.totalColumn]}>
              Tax Amount
            </Text>
            <Text style={[styles.tableHeaderCell, styles.totalColumn]}>
              Total
            </Text>
          </View>
          {data.invoiceVatTaxDetails?.map((item: any, index: number) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.itemColumn]}>
                {index + 1}
              </Text>
              <Text style={[styles.tableCell, styles.quantityColumn]}>
                {item.taxTypeName}
              </Text>
              <Text style={[styles.tableCell, styles.priceColumn]}>
                {item.chartOfAccountName}
              </Text>
              <Text style={[styles.tableCell, styles.priceColumn]}>
                {item.rate}
              </Text>
              <Text style={[styles.tableCell, styles.totalColumn]}>
                {item.amount}
              </Text>
              <Text style={[styles.tableCell, styles.totalColumn]}>
                {item.total}
              </Text>
            </View>
          ))}
        </View>
        <Text style={styles.infoTitle}>Payment Advance Payments</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.itemColumn]}>
              SN
            </Text>
            <Text style={[styles.tableHeaderCell, styles.quantityColumn]}>
              Reference Name
            </Text>
            <Text style={[styles.tableHeaderCell, styles.priceColumn]}>
              Remarks
            </Text>
            <Text style={[styles.tableHeaderCell, styles.priceColumn]}>
              Advance Amount
            </Text>
            <Text style={[styles.tableHeaderCell, styles.totalColumn]}>
              Allocated Amount
            </Text>
          </View>
          {data.invoiceVatTaxDetails?.map((item: any, index: number) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.itemColumn]}>
                {index + 1}
              </Text>
              <Text style={[styles.tableCell, styles.quantityColumn]}>
                {item.referenceName}
              </Text>
              <Text style={[styles.tableCell, styles.priceColumn]}>
                {item.remarks}
              </Text>
              <Text style={[styles.tableCell, styles.priceColumn]}>
                {item.advanceAmount}
              </Text>
              <Text style={[styles.tableCell, styles.totalColumn]}>
                {item.allocatedAmount}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}

export default InvoicePdfDocument
