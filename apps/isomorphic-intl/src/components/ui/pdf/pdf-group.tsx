"use client"
import { StyleSheet, Text, View } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    width: "100%",
    paddingTop: 36,
  },
  titleContainer: {
    width: "33.33%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "Barlow",
  },
  description: {
    marginTop: 8,
  },
  childrenContainer: {
    width: "66.66%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 28,
    paddingTop: 16,
  },
  childItem: {
    width: "calc(50% - 14px)",
  },
})

export type PDFGroupProps = {
  title: string
  description?: string
  style?: Record<string, any>
  childrenStyle?: Record<string, any>
  children?: React.ReactNode
}

export default function PDFGroup({
  title,
  description,
  style,
  childrenStyle,
  children,
}: PDFGroupProps) {
  return (
    <View style={[styles.wrapper, style || {}]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      {children && (
        <View style={[styles.childrenContainer, childrenStyle || {}]}>
          {children}
        </View>
      )}
    </View>
  )
}
