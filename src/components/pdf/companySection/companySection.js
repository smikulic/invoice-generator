import { Text, View, StyleSheet } from "@react-pdf/renderer";

const pdfDocumentStyle = StyleSheet.create({
  companyWrapper: {
    display: "flex",
    flexDirection: "row",
    fontSize: 12,
    marginBottom: 40,
  },
  companyLeft: {
    padding: 10,
    width: "100%",
    height: "100px",
    border: "1px solid black",
  },
  companyRight: {
    padding: 10,
    width: "100%",
    textAlign: "right",
  },
  boldText: {
    fontWeight: 700,
  },
  textMargin: {
    margin: "1px 0",
  },
});

export function CompanySection({ companyData, myInfo }) {
  return (
    <>
      <View style={pdfDocumentStyle.companyWrapper}>
        <View style={pdfDocumentStyle.companyLeft}>
          <Text style={pdfDocumentStyle.boldText}>{companyData.name}</Text>
          <Text style={pdfDocumentStyle.textMargin}>
            {companyData.addressLine1}
          </Text>
          <Text>{companyData.addressLine2}</Text>
        </View>
        <View style={pdfDocumentStyle.companyRight}>
          <Text style={pdfDocumentStyle.boldText}>{myInfo.companyName}</Text>
          <Text style={pdfDocumentStyle.textMargin}>{myInfo.addressLine1}</Text>
          <Text style={pdfDocumentStyle.textMargin}>OIB/VAT: {myInfo.vat}</Text>
          <Text style={pdfDocumentStyle.textMargin}>SWIFT: {myInfo.swift}</Text>
          <Text>IBAN: {myInfo.iban}</Text>
        </View>
      </View>
    </>
  );
}
