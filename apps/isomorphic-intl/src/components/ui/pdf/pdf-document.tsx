import {
  Document,
  Font,
  Image,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer"

const styles = StyleSheet.create({
  viewer: {
    width: "100%",
    height: "100%",
    border: "none",
  },
  page: {
    width: "100%",
    padding: 20,
    fontSize: 12,
    lineHeight: 1.5,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    paddingTop: 44,
    paddingHorizontal: 16,
  },
  container: {
    display: "flex",
    width: "100%",
    maxWidth: 1536,
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 28,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 28,
    marginLeft: "auto",
    marginRight: "auto",
    borderBottom: "1px dashed rgba(145, 158, 171, 0.2)",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    width: 155,
    height: "auto",
  },
  headerContentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 12,
    marginTop: -6,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Barlow",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgb(99, 115, 129)",
  },
  group: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    width: "100%",
    paddingTop: 36,
  },
  groupTitleContainer: {
    width: "33.33%",
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "Barlow",
  },
  groupDescription: {
    marginTop: 8,
  },
  groupChildrenContainer: {
    width: "66.66%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 28,
    paddingTop: 16,
  },
  groupChildItem: {
    width: "calc(50% - 14px)",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  itemLabel: {
    width: "50%",
    fontSize: 12,
    color: "rgb(99, 115, 129)",
  },
  itemValue: {
    width: "50%",
    fontSize: 12,
    fontWeight: "semibold",
    color: "rgb(28, 37, 46)",
    fontFamily: "Barlow",
  },
})

// Register fonts for PDF
Font.register({
  family: "Barlow",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3q-0c4FAtlT47dw.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3_-gc4FAtlT47dw.ttf",
      fontWeight: 500,
    },
    {
      src: "https://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3oWOc4FAtlT47dw.ttf",
      fontWeight: 600,
    },
    {
      src: "https://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3t-4c4FAtlT47dw.ttf",
      fontWeight: 700,
    },
    {
      src: "https://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3p-0c4FAtlT47dw.ttf",
      fontWeight: 800,
    },
    {
      src: "https://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3v-wc4FAtlT47dw.ttf",
      fontWeight: 900,
    },
  ],
})

Font.register({
  family: "Public Sans",
  src: "https://fonts.gstatic.com/s/publicsans/v14/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuFpmJygcob18.ttf",
})

// Types
export type PDFDocumentProps<T = any> = {
  children: React.ReactNode
  size?: "A4" | "LETTER" | [number, number]
  style?: Record<string, any>
  showViewer?: boolean
  viewerStyle?: Record<string, any>
  template?: React.ComponentType<{ data: T }>
  data?: T
}

export type PDFContainerProps = {
  style?: Record<string, any>
  children: React.ReactNode
}

export type PDFHeaderProps = {
  title: string
  subtitle: string
  style?: Record<string, any>
}

export type PDFGroupProps = {
  title: string
  description?: string
  style?: Record<string, any>
  childrenStyle?: Record<string, any>
  children?: React.ReactNode
}

export type PDFItemProps = {
  label: string
  value: string | number | null
  style?: Record<string, any>
}

// Components
export function PDFContainer({ style, children }: PDFContainerProps) {
  return <View style={{ ...styles.container, ...style }}>{children}</View>
}

export function PDFHeader({ title, subtitle, style }: PDFHeaderProps) {
  return (
    <View style={[styles.header, style || {}]}>
      <View style={styles.logoContainer}>
        <Image
          src="https://images.unsplash.com/photo-1726557116827-5f2a95d57cab?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          style={styles.logo}
        />
      </View>
      <View style={styles.headerContentContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>{subtitle}</Text>
      </View>
    </View>
  )
}

export function PDFGroup({
  title,
  description,
  style,
  childrenStyle,
  children,
}: PDFGroupProps) {
  return (
    <View style={[styles.group, style || {}]}>
      <View style={styles.groupTitleContainer}>
        <Text style={styles.groupTitle}>{title}</Text>
        {description && (
          <Text style={styles.groupDescription}>{description}</Text>
        )}
      </View>
      {children && (
        <View style={[styles.groupChildrenContainer, childrenStyle || {}]}>
          {children}
        </View>
      )}
    </View>
  )
}

export function PDFItem({ label, value, style }: PDFItemProps) {
  return (
    <View style={[styles.item, style || {}]}>
      <Text style={styles.itemLabel}>{label} :</Text>
      <Text style={styles.itemValue}>{value || "--"}</Text>
    </View>
  )
}

export default function PDFDocument<T>({
  size = "A4",
  style,
  children,
  showViewer = false,
  viewerStyle,
  template: Template,
  data,
}: PDFDocumentProps<T>) {
  const content = (
    <Document>
      <Page
        size={size}
        style={{
          fontFamily: "Public Sans",
          ...styles.page,
          ...style,
        }}>
        {Template && data ? <Template data={data} /> : children}
      </Page>
    </Document>
  )

  if (!showViewer) {
    return content
  }

  return (
    <PDFViewer style={{ ...styles.viewer, ...viewerStyle }}>
      {content}
    </PDFViewer>
  )
}
