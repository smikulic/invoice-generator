import { useState } from "react";
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
import { PaymentInstructions } from "./components/pdf/paymentInstructions";
import { CompanySection } from "./components/pdf/companySection";
import pdfData from "./pdf-data.json";
import examplePdfData from "./example-pdf-data.json";
import "./App.css";

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
});

const PdfDocument = ({
  invoiceNumber,
  invoiceDate,
  itemDescription,
  hours,
  companyData,
  myInfo,
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

        <CompanySection companyData={companyData} myInfo={myInfo} />

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
            <Text style={pdfDocumentStyle.infoDiv}>{myInfo.location}</Text>
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

        <PaymentInstructions myInfo={myInfo} />
      </Page>
    </Document>
  );
};

const PdfDocumentCroatian = ({
  invoiceNumber,
  invoiceDate,
  itemDescription,
  hours,
  companyData,
  myInfo,
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

        <CompanySection companyData={companyData} myInfo={myInfo} />

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
            <Text style={pdfDocumentStyle.infoDiv}>{myInfo.location}</Text>
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
          <View style={pdfDocumentStyle.tableLastRow}>
            <View style={pdfDocumentStyle.tableLastRowFirstCell}>
              <Text>TOTAL USD</Text>
            </View>
            <View style={pdfDocumentStyle.tableLastRowLastCell}>
              <Text>{totalAmount}</Text>
            </View>
          </View>
        </View>

        <PaymentInstructions myInfo={myInfo} />
      </Page>
    </Document>
  );
};

function App() {
  const data =
    process.env.NODE_ENV === "development" ? pdfData : examplePdfData;
  const myInfo = data.myInfo;
  const companies = data.companies;
  const [invoiceNumber, setInvoiceNumber] = useState(0);
  const [activeCompany, setActiveCompany] = useState(companies[0].id);
  const [activeLanguage, setActiveLanguage] = useState("english");
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
  const companyData = companies.find((company) => {
    return activeCompany === company.id;
  });
  const isEnglishVersion = activeLanguage === "english";

  return (
    <div className="App">
      <div className="toolbar">
        <div className="companyTabs">
          {companies.map((company) => {
            const isCompanyActive = activeCompany === company.id;
            return (
              <div
                key={company.id}
                className={`companyTab ${isCompanyActive && "active"}`}
                onClick={(e) => setActiveCompany(company.id)}
              >
                {company.id}
              </div>
            );
          })}
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
        {isEnglishVersion && (
          <div className="downloadPdfButton">
            <PDFDownloadLink
              document={
                <PdfDocument
                  invoiceNumber={invoiceNumber}
                  invoiceDate={invoiceDate}
                  itemDescription={itemDescription}
                  hours={hours}
                  companyData={companyData}
                  myInfo={myInfo}
                />
              }
              fileName={fileName}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download (english version)!"
              }
            </PDFDownloadLink>
          </div>
        )}
        {!isEnglishVersion && (
          <div className="downloadPdfButton">
            <PDFDownloadLink
              document={
                <PdfDocumentCroatian
                  invoiceNumber={invoiceNumber}
                  invoiceDate={invoiceDate}
                  itemDescription={itemDescription}
                  hours={hours}
                  companyData={companyData}
                  myInfo={myInfo}
                />
              }
              fileName={fileName}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download (croatian version)!"
              }
            </PDFDownloadLink>
          </div>
        )}
      </div>

      <div className="main">
        <div className="languageTabs">
          {["english", "croatian"].map((language) => {
            const isLanguageActive = activeLanguage === language;
            return (
              <div
                key={language}
                className={`languageTab ${isLanguageActive && "active"}`}
                onClick={(e) => setActiveLanguage(language)}
              >
                {language}
              </div>
            );
          })}
        </div>
        {/* <PdfDocument
          invoiceNumber={invoiceNumber}
          invoiceDate={invoiceDate}
          itemDescription={itemDescription}
                hours={hours}
                companyData={companyData}
                myInfo={myInfo}
        /> */}
        <PDFViewer width="100%" height="100%" showToolbar={false}>
          {isEnglishVersion && (
            <PdfDocument
              invoiceNumber={invoiceNumber}
              invoiceDate={invoiceDate}
              itemDescription={itemDescription}
              hours={hours}
              companyData={companyData}
              myInfo={myInfo}
            />
          )}
          {!isEnglishVersion && (
            <PdfDocumentCroatian
              invoiceNumber={invoiceNumber}
              invoiceDate={invoiceDate}
              itemDescription={itemDescription}
              hours={hours}
              companyData={companyData}
              myInfo={myInfo}
            />
          )}
        </PDFViewer>
      </div>
    </div>
  );
}

export default App;
