"use client"

import { StyleSheet, Text, View } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  label: {
    width: "50%",
    fontSize: 12,
    color: "rgb(99, 115, 129)",
  },
  value: {
    width: "50%",
    fontSize: 12,
    fontWeight: "semibold",
    color: "rgb(28, 37, 46)",
    fontFamily: "Barlow",
  },
})

interface PDFItemProps {
  label: string
  value: string | number | null
  style?: Record<string, any>
}

export function PDFItem({ label, value, style }: PDFItemProps) {
  return (
    <View style={[styles.item, style || {}]}>
      <Text style={styles.label}>{label} :</Text>
      <Text style={styles.value}>{value || "--"}</Text>
    </View>
  )
}
