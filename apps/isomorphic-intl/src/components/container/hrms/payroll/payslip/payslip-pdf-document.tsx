import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer"

import { Payslip } from "@/types/hrms/payroll/payslip.types"

// Register fonts if needed
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
  logo: {
    width: 120,
    height: 40,
    objectFit: "contain",
    marginBottom: 10,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  headerLeft: {
    alignItems: "flex-start",
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
  tableContainer: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
  },
  tableSection: {
    flex: 1,
  },
  table: {
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
  descriptionColumn: {
    flex: 3,
  },
  amountColumn: {
    flex: 1,
    textAlign: "right",
  },
  netPayableContainer: {
    marginTop: 20,
    width: "50%",
  },
  netPayableBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    padding: 10,
    borderRadius: 8,
    border: "1px solid #E5E7EB",
  },
  netPayableLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: "#111827",
  },
  netPayableValue: {
    fontSize: 14,
    fontWeight: 700,
    color: "#059669",
  },
})

interface PayslipPdfDocumentProps {
  data: Payslip
}

const PayslipPdfDocument = ({ data }: PayslipPdfDocumentProps) => {
  const earningRules =
    data?.employeeContract?.salaryStructure?.salaryRules?.filter(
      (rule) => rule.salaryCategory?.transactionType === "Credit"
    ) || []

  const deductionRules =
    data?.employeeContract?.salaryStructure?.salaryRules?.filter(
      (rule) => rule.salaryCategory?.transactionType === "Debit"
    ) || []

  console.log("pdf data", data)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>
              {data.employeeContract?.companyName}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.title}>PAY SLIP</Text>
            <Text style={styles.subtitle}>
              Pay Slip for {data.month} {data.year}
            </Text>
          </View>
        </View>

        {/* Employee Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Employee Information</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoTitle}>Employee Details</Text>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>
                  {data.employeeContract?.employee?.firstName}{" "}
                  {data.employeeContract?.employee?.lastName}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Badge ID:</Text>
                <Text style={styles.value}>
                  {data.employeeContract?.employee?.badgeId}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Department:</Text>
                <Text style={styles.value}>
                  {data.employeeContract?.employee?.department?.departmentName}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Job Position:</Text>
                <Text style={styles.value}>
                  {
                    data.employeeContract?.employee?.jobPosition
                      ?.jobPositionName
                  }
                </Text>
              </View>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoTitle}>Salary Summary</Text>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Basic Salary:</Text>
                <Text style={styles.value}>
                  {data.baseSalary?.toFixed(2)}{" "}
                  {
                    data.employeeContract?.employee?.privateInformation
                      ?.currency?.currencyName
                  }
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Gross Salary:</Text>
                <Text style={styles.value}>
                  {data.grossSalary?.toFixed(2)}{" "}
                  {
                    data.employeeContract?.employee?.privateInformation
                      ?.currency?.currencyName
                  }
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Earnings and Deductions */}
        <View style={styles.tableContainer}>
          {/* Earnings */}
          <View style={styles.tableSection}>
            <Text style={styles.sectionTitle}>Earnings</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text
                  style={[styles.tableHeaderCell, styles.descriptionColumn]}>
                  Description
                </Text>
                <Text style={[styles.tableHeaderCell, styles.amountColumn]}>
                  Amount
                </Text>
              </View>
              {earningRules.map((rule, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.descriptionColumn]}>
                    {rule.salaryRuleName}
                  </Text>
                  <Text style={[styles.tableCell, styles.amountColumn]}>
                    {rule.amount?.toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Deductions */}
          <View style={styles.tableSection}>
            <Text style={styles.sectionTitle}>Deductions</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text
                  style={[styles.tableHeaderCell, styles.descriptionColumn]}>
                  Description
                </Text>
                <Text style={[styles.tableHeaderCell, styles.amountColumn]}>
                  Amount
                </Text>
              </View>
              {deductionRules.map((rule, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.descriptionColumn]}>
                    {rule.salaryRuleName}
                  </Text>
                  <Text style={[styles.tableCell, styles.amountColumn]}>
                    {rule.amount?.toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Net Payable */}
        <View style={styles.netPayableContainer}>
          <View style={styles.netPayableBox}>
            <Text style={styles.netPayableLabel}>Net Payable:</Text>
            <Text style={styles.netPayableValue}>
              {data.netPayableSalary?.toFixed(2)}{" "}
              {
                data.employeeContract?.employee?.privateInformation?.currency
                  ?.currencyName
              }
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default PayslipPdfDocument
