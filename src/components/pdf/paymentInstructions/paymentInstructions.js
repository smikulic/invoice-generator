import { Text, View, StyleSheet } from "@react-pdf/renderer";

const pdfDocumentStyle = StyleSheet.create({
  boldText: {
    fontWeight: 700,
  },
  paymentInstructionsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "600px",
    position: "absolute",
    bottom: "120px",
    fontSize: 11,
  },
  paymentInstructionsLineOne: {
    display: "flex",
    flexDirection: "row",
    margin: "5px 0",
    textDecoration: "underline",
  },
  paymentInstructionsLine: {
    display: "flex",
    flexDirection: "row",
    margin: "2px 0",
  },
  footerWrapper: {
    display: "flex",
    flexDirection: "column",
    margin: "2px 0",
    position: "absolute",
    left: "28px",
    bottom: "20px",
    fontSize: 11,
  },
});

export function PaymentInstructions({ myInfo }) {
  return (
    <>
      <View style={pdfDocumentStyle.paymentInstructionsWrapper}>
        <Text style={pdfDocumentStyle.paymentInstructionsLineOne}>
          Payment Instructions
        </Text>
        <Text style={pdfDocumentStyle.paymentInstructionsLine}>
          <View style={pdfDocumentStyle.boldText}>{myInfo.companyName}</View>,{" "}
          {myInfo.addressLine1}
        </Text>
        <Text style={pdfDocumentStyle.paymentInstructionsLine}>
          BANK: <View style={pdfDocumentStyle.boldText}>{myInfo.bankName}</View>
          , IBAN: <View style={pdfDocumentStyle.boldText}>{myInfo.iban}</View>,
          SWIFT: <View style={pdfDocumentStyle.boldText}>{myInfo.swift}</View>
        </Text>
      </View>
      <View style={pdfDocumentStyle.footerWrapper}>
        <Text>{myInfo.ownerName}</Text>
        <Text>{myInfo.companyName}</Text>
      </View>
    </>
  );
}
