import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
// Date Fns is used to format the dates we receive

// define a generatePDF function that accepts a tickets argument
export const generatePDF = (data:any[], columns:any[]) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // startY is basically margin-top
  autoTable(doc,{ head: columns, body: data });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
//   doc.text("Closed tickets within the last one month.", 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

