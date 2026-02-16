import { Body } from "@react-email/body"
import { Container } from "@react-email/container"
import { Head } from "@react-email/head"
import { Html } from "@react-email/html"
import { Preview } from "@react-email/preview"
import { Text } from "@react-email/text"

type SupplierSendEmailProps = {
  supplierName: string
}

export default function SupplierSendEmail({
  supplierName,
}: SupplierSendEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Supplier Collaboration</Preview>
      <Body>
        <Container>
          <Text>Hello {supplierName}</Text>
        </Container>
      </Body>
    </Html>
  )
}
