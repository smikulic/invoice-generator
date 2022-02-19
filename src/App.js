import {
  PDFDownloadLink,
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import logo from "./logo.png";
import "./App.css";
import { useState } from "react";

const COMPANIES = {
  GLEAN: "Glean",
  PENNYWHALE: "PennyWhale",
};

const GLEAN_COMPANY_DATA = {
  name: "Glean Analytics Inc.",
  addressLine1: "43 W 23rd St, New York,",
  addressLine2: "NY 10010, USA",
  rate: 80,
  currency: "USD",
};

const PENNYWHALE_COMPANY_DATA = {
  name: "PennyWhale LLC",
  addressLine1: "3423 Piedmont Rd Ne, Atlanta,",
  addressLine2: "GA 30305, USA",
  rate: 100,
  currency: "USD",
};

// localStorage.setItem('quick_invoice_data', JSON.stringify(data))
// const getData = () => {
//   const data = localStorage.getItem("quick_invoice_data");
//   console.log(JSON.parse(data));

//   return {
//     ...data,
//   };
// };

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: `${process.env.PUBLIC_URL}/Roboto-Regular.ttf`,
    }, // font-style: normal, font-weight: normal
    {
      src: `${process.env.PUBLIC_URL}/Roboto-Bold.ttf`,
      fontWeight: 700,
    },
  ],
});

const pdfDocumentStyle = StyleSheet.create({
  document: {
    width: "100%",
    height: "100%",
  },
  page: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 28px",
    backgroundColor: "#fff",
    fontFamily: "Roboto",
    fontWeight: 400,
  },
  header: {
    display: "block",
    position: "relative",
    marginBottom: 40,
    height: "42px",
    borderBottom: "1px solid black",
  },
  sectionWrapper: {
    display: "flex",
    flexDirection: "row",
    fontSize: 12,
    marginBottom: 40,
  },
  sectionLeft: {
    padding: 10,
    width: "100%",
    height: "100px",
    border: "1px solid black",
  },
  sectionRight: {
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
  infoWrapper: {
    fontSize: 12,
    marginBottom: 40,
  },
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "2px 0",
    width: "50%",
  },
  infoDiv: {
    width: "50%",
  },
  invoiceNumber: {
    width: "50%",
    fontWeight: 700,
  },
  tableWrapper: {
    marginBottom: 40,
    borderLeft: "1px solid black",
    fontSize: 11,
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    height: "20px",
    fontWeight: 700,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "40px",
  },
  tableCell: {
    padding: "0 10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "50px",
    height: "100%",
    borderTop: "1px solid black",
    borderRight: "1px solid black",
  },
  tableCellSecond: {
    padding: "0 10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "250px",
    height: "100%",
    textAlign: "left",
    borderTop: "1px solid black",
    borderRight: "1px solid black",
  },
  tableCellLast: {
    padding: "0 10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100px",
    height: "100%",
    borderTop: "1px solid black",
    borderRight: "1px solid black",
  },
  tableEmptyRow: {
    width: "100%",
    height: "20px",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
  },
  tableLastRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "20px",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
    fontWeight: 700,
  },
  tableLastRowFirstCell: {
    padding: "0 10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "450px",
    height: "100%",
    borderRight: "1px solid black",
  },
  tableLastRowLastCell: {
    padding: "0 10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100px",
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

const PdfDocument = ({
  invoiceNumber,
  invoiceDate,
  itemDescription,
  hours,
  companyData,
}) => {
  const totalAmount = `${Intl.NumberFormat("en-DE").format(
    companyData.rate * hours
  )},00 ${companyData.currency}`;

  return (
    <Document style={pdfDocumentStyle.document}>
      <Page size="A4" style={pdfDocumentStyle.page}>
        <View style={pdfDocumentStyle.header}>
          <Image
            src={logo}
            alt="logo"
            width={180}
            height={42}
            style={{
              width: "180px",
              position: "absolute",
              top: 0,
              right: 0,
            }}
          />
        </View>
        <View style={pdfDocumentStyle.sectionWrapper}>
          <View style={pdfDocumentStyle.sectionLeft}>
            <Text style={pdfDocumentStyle.boldText}>{companyData.name}</Text>
            <Text style={pdfDocumentStyle.textMargin}>
              {companyData.addressLine1}
            </Text>
            <Text>{companyData.addressLine2}</Text>
          </View>
          <View style={pdfDocumentStyle.sectionRight}>
            <Text style={pdfDocumentStyle.boldText}>
              CODE WELL STUDIO d.o.o.
            </Text>
            <Text style={pdfDocumentStyle.textMargin}>
              Domjanićeva 25, 10000 Zagreb, Hrvatska
            </Text>
            <Text style={pdfDocumentStyle.textMargin}>
              OIB/VAT: HR13390221281
            </Text>
            <Text style={pdfDocumentStyle.textMargin}>SWIFT:ZABAHR2X</Text>
            <Text>IBAN: HR4223600001102824236</Text>
          </View>
        </View>

        <View style={pdfDocumentStyle.infoWrapper}>
          <View style={pdfDocumentStyle.info}>
            <Text style={pdfDocumentStyle.infoDiv}>Invoice Number: </Text>
            <Text style={pdfDocumentStyle.invoiceNumber}>
              1-1-{invoiceNumber}
            </Text>
          </View>
          <View style={pdfDocumentStyle.info}>
            <Text style={pdfDocumentStyle.infoDiv}>Date: </Text>
            <Text style={pdfDocumentStyle.infoDiv}>{invoiceDate}</Text>
          </View>
          <View style={pdfDocumentStyle.info}>
            <Text style={pdfDocumentStyle.infoDiv}>Place: </Text>
            <Text style={pdfDocumentStyle.infoDiv}>Zagreb</Text>
          </View>
          <View style={pdfDocumentStyle.info}>
            <Text style={pdfDocumentStyle.infoDiv}>Type of payment: </Text>
            <Text style={pdfDocumentStyle.infoDiv}>Bank transfer</Text>
          </View>
        </View>

        <View style={pdfDocumentStyle.tableWrapper}>
          <View style={pdfDocumentStyle.tableHeader}>
            <View style={pdfDocumentStyle.tableCell}>
              <Text>No.</Text>
            </View>
            <View style={pdfDocumentStyle.tableCellSecond}>
              <Text>Description</Text>
            </View>
            <View style={pdfDocumentStyle.tableCell}>
              <Text>Units</Text>
            </View>
            <View style={pdfDocumentStyle.tableCellLast}>
              <Text>Price</Text>
            </View>
            <View style={pdfDocumentStyle.tableCellLast}>
              <Text>Amount</Text>
            </View>
          </View>
          <View style={pdfDocumentStyle.tableRow}>
            <View style={pdfDocumentStyle.tableCell}>
              <Text>1.</Text>
            </View>
            <View style={pdfDocumentStyle.tableCellSecond}>
              <Text>{itemDescription}</Text>
            </View>
            <View style={pdfDocumentStyle.tableCell}>
              <Text>{hours}</Text>
            </View>
            <View style={pdfDocumentStyle.tableCellLast}>
              <Text>
                {companyData.rate},00 {companyData.currency}
              </Text>
            </View>
            <View style={pdfDocumentStyle.tableCellLast}>
              <Text>{totalAmount}</Text>
            </View>
          </View>
          <View style={pdfDocumentStyle.tableEmptyRow}></View>
          <View style={pdfDocumentStyle.tableLastRow}>
            <View style={pdfDocumentStyle.tableLastRowFirstCell}>
              <Text>TOTAL USD</Text>
            </View>
            <View style={pdfDocumentStyle.tableLastRowLastCell}>
              <Text>{totalAmount}</Text>
            </View>
          </View>
        </View>

        <View style={pdfDocumentStyle.paymentInstructionsWrapper}>
          <Text style={pdfDocumentStyle.paymentInstructionsLineOne}>
            Payment Instructions
          </Text>
          <Text style={pdfDocumentStyle.paymentInstructionsLine}>
            <View style={pdfDocumentStyle.boldText}>
              CODE WELL STUDIO d.o.o.
            </View>
            , Domjanićeva 25, 10000 Zagreb, Croatia
          </Text>
          <Text style={pdfDocumentStyle.paymentInstructionsLine}>
            BANK:{" "}
            <View style={pdfDocumentStyle.boldText}>Zagrebačka Banka d.d.</View>
            , IBAN:{" "}
            <View style={pdfDocumentStyle.boldText}>HR4223600001102824236</View>
            , SWIFT: <View style={pdfDocumentStyle.boldText}>ZABAHR2X</View>
          </Text>
        </View>

        <View style={pdfDocumentStyle.footerWrapper}>
          <Text>Siniša Mikulić</Text>
          <Text>CODE WELL STUDIO d.o.o.</Text>
        </View>
      </Page>
    </Document>
  );
};

function App() {
  const [invoiceNumber, setInvoiceNumber] = useState(0);
  const [activeCompany, setActiveCompany] = useState(COMPANIES.GLEAN);
  const [hours, setHours] = useState(0);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December",
  ];
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentMonthFormatted = months[currentMonth - 1];
  const currentYear = date.getFullYear();
  const lastDayOfCurrentMonth = new Date(
    currentYear,
    currentMonth,
    0
  ).getDate();
  const fileName = `1-1-${invoiceNumber}_Glean_Invoice_${currentMonth}_${currentYear}.pdf`;
  const invoiceDate = `${lastDayOfCurrentMonth}.${currentMonth}.${currentYear} 12:30`;
  const itemDescription = `Web development, ${currentMonthFormatted} 1, ${currentYear} - ${currentMonthFormatted} ${lastDayOfCurrentMonth}, ${currentYear}`;
  const isGleanActive = activeCompany === COMPANIES.GLEAN;
  const isPennyWhaleActive = activeCompany === COMPANIES.PENNYWHALE;

  let companyData = GLEAN_COMPANY_DATA;
  if (isPennyWhaleActive) {
    companyData = PENNYWHALE_COMPANY_DATA;
  }

  return (
    <div className="App">
      <div className="toolbar">
        <div className="companyTabs">
          <div
            className={`companyTab ${isGleanActive && "active"}`}
            onClick={(e) => setActiveCompany(COMPANIES.GLEAN)}
          >
            {COMPANIES.GLEAN}
          </div>
          <div
            className="companyTab"
            className={`companyTab ${isPennyWhaleActive && "active"}`}
            onClick={(e) => setActiveCompany(COMPANIES.PENNYWHALE)}
          >
            {COMPANIES.PENNYWHALE}
          </div>
        </div>
        <div className="inputField">
          <label htmlFor="invoiceNumber">Invoice Number</label>
          <input
            name="invoiceNumber"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
          />
        </div>
        <div className="inputField">
          <label htmlFor="hours">Hours</label>
          <input
            name="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>
        <div className="downloadPdfButton">
          <PDFDownloadLink
            document={
              <PdfDocument
                invoiceNumber={invoiceNumber}
                invoiceDate={invoiceDate}
                itemDescription={itemDescription}
                hours={hours}
                companyData={companyData}
              />
            }
            fileName={fileName}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download pdf!"
            }
          </PDFDownloadLink>
        </div>
      </div>

      <div className="main">
        {/* <PdfDocument
          invoiceNumber={invoiceNumber}
          invoiceDate={invoiceDate}
          itemDescription={itemDescription}
                hours={hours}
                companyData={companyData}
        /> */}
        <PDFViewer width="710px" height="980px" showToolbar={false}>
          <PdfDocument
            invoiceNumber={invoiceNumber}
            invoiceDate={invoiceDate}
            itemDescription={itemDescription}
            hours={hours}
            companyData={companyData}
          />
        </PDFViewer>
      </div>
    </div>
  );
}

export default App;
