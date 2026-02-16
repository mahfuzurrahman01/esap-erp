"use client"
import React from 'react'
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  wrapper: {
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
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 12,
    marginTop: -6,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Barlow",
  },
  subtitle: {
    fontSize: 16,
    color: "rgb(99, 115, 129)",
  },
})

interface PDFHeaderProps {
  title: string
  subtitle: string
  style?: Record<string, any>
}

export default function PDFHeader({ title, subtitle, style }: PDFHeaderProps) {
  return (
    <View style={[styles.wrapper, style || {}]}>
      <View style={styles.logoContainer}>
        <Image src="https://images.unsplash.com/photo-1726557116827-5f2a95d57cab?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style={styles.logo} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  )
}
