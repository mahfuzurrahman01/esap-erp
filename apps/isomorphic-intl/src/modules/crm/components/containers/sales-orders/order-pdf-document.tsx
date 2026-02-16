import { formatDate } from "@/utils/format-date";
import { Document, Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf", fontWeight: 400 },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf", fontWeight: 700 }
  ],
});

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "Roboto", backgroundColor: "#fff" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 700, color: "#111827" },
  subtitle: { fontSize: 14, color: "#6B7280" },
  section: { marginBottom: 15, display: "flex" },
  label: { fontSize: 12, fontWeight: 500, color: "#4B5563" },
  value: { fontSize: 12, fontWeight: 700, color: "#111827" },
  table: { marginTop: 10, border: "1px solid #E5E7EB", borderRadius: 4 },
  tableRow: { flexDirection: "row", borderBottom: "1px solid #E5E7EB", padding: 8 },
  tableHeader: { backgroundColor: "#F9FAFB", fontWeight: 700 },
  cell: { flex: 1, fontSize: 12, color: "#111827" },
  cellSmall: { width: 50, fontSize: 12, color: "#111827", textAlign: "center" }, 
  cellLarge: { width: 200, fontSize: 12, color: "#111827" },
  infoContainer: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 8,
    border: "1px solid #E5E7EB",
  },
  infoColumn: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 10,
  },
  infoRow: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#111827",
    padding: 10,
    marginBottom: 15,
  },
});

const SalesOrderPdfDocument = ({ data, salesOrderDetails }:any) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{data.customer?.firstName} {data.customer?.lastName}</Text>
            <Text style={styles.subtitle}>Order No #{data.salesOrderNo}</Text>
          </View>
          <View>
            <Text style={styles.subtitle}>Title: {data.title}</Text>
            <Text style={styles.subtitle}>Posting Date: {data?.postingDate ? formatDate(data?.postingDate, "DD/MM/YYYY") : ""}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Information</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoColumn}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Customer:</Text>
                <Text style={styles.value}>{data.customer?.firstName} {data.customer?.lastName}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{data.customer?.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{data.customer?.phone}</Text>
              </View>
            </View>
            <View style={styles.infoColumn}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Payment Terms:</Text>
                <Text style={styles.value}>{data.customer?.paymentTerms}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Delivery Date:</Text>
                <Text style={styles.value}>{data?.delivaryDate ? formatDate(data?.delivaryDate, "DD/MM/YYYY") : ""}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Status:</Text>
                <Text style={styles.value}>{data.approvalStatus}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.cellSmall}>SN</Text>
            <Text style={styles.cellLarge}>Product</Text>
            <Text style={styles.cell}>Quantity</Text>
            <Text style={styles.cell}>Unit Price</Text>
            <Text style={styles.cell}>Total</Text>
          </View>
          {salesOrderDetails?.map((item:any, index:number) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.cellSmall}>{index + 1}</Text>
              <Text style={styles.cellLarge}>{item?.productName || "Unknown Product"}</Text>
              <Text style={styles.cell}>{item.quantity}</Text>
              <Text style={styles.cell}>{item.unitPrice}</Text>
              <Text style={styles.cell}>{item.unitPrice * item.quantity}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default SalesOrderPdfDocument;