import jsPDF from "jspdf";

const generateReportPDF = (report) => {
  const doc = new jsPDF();

  const scan = report?.scanId;
  const patient = scan?.patientId;
  const analysis = scan?.analysis;

  let y = 20;

  const checkPage = (requiredSpace = 20) => {
    if (y + requiredSpace > 275) {
      doc.addPage();
      y = 20;
    }
  };

  doc.setFontSize(20);
  doc.text("Diagnostic Medical Report", 20, y);

  y += 15;

  doc.setFontSize(11);
  doc.text(`Report ID: ${report?._id || "N/A"}`, 20, y);

  y += 8;

  doc.text(
    `Date: ${
      report?.createdAt ? new Date(report.createdAt).toLocaleString() : "N/A"
    }`,
    20,
    y,
  );

  y += 15;

  checkPage();

  doc.setFontSize(14);
  doc.text("Patient Information", 20, y);

  y += 9;
  doc.setFontSize(11);

  doc.text(`Name: ${patient?.name || "N/A"}`, 20, y);
  y += 7;

  doc.text(`Age: ${patient?.age ?? "N/A"}`, 20, y);
  y += 7;

  doc.text(`Gender: ${patient?.gender || "N/A"}`, 20, y);
  y += 7;

  doc.text(`Contact: ${patient?.contactNumber || "N/A"}`, 20, y);

  y += 15;

  checkPage();

  doc.setFontSize(14);
  doc.text("Scan Information", 20, y);

  y += 9;
  doc.setFontSize(11);

  doc.text(`Scan Type: ${scan?.scanType || "N/A"}`, 20, y);

  y += 7;

  doc.text(`Body Part: ${scan?.bodyPart || "General"}`, 20, y);

  y += 15;

  checkPage();

  doc.setFontSize(14);
  doc.text("AI Analysis", 20, y);

  y += 9;
  doc.setFontSize(11);

  doc.text(`Severity: ${analysis?.severityLevel || "N/A"}`, 20, y);

  y += 9;

  const findings = analysis?.overallFindings || "No findings available.";

  const findingLines = doc.splitTextToSize(findings, 170);

  for (const line of findingLines) {
    checkPage(8);
    doc.text(line, 20, y);
    y += 6;
  }

  y += 8;

  checkPage();

  doc.setFontSize(14);
  doc.text("Detected Regions", 20, y);

  y += 9;
  doc.setFontSize(11);

  const regions = analysis?.detectedRegions || [];

  if (regions.length === 0) {
    doc.text("No detected regions.", 20, y);
    y += 8;
  } else {
    regions.forEach((region, index) => {
      checkPage(30);

      doc.setFontSize(11);
      doc.text(`${index + 1}. ${region.label || "Detected Region"}`, 20, y);

      y += 6;

      doc.setFontSize(10);

      doc.text(
        `Category: ${region.category || "N/A"} | Confidence: ${Math.round(
          (region.confidenceScore || 0) * 100,
        )}%`,
        25,
        y,
      );

      y += 6;

      if (region.clinicalNote) {
        const regionLines = doc.splitTextToSize(
          `Note: ${region.clinicalNote}`,
          165,
        );

        for (const line of regionLines) {
          checkPage(7);
          doc.text(line, 25, y);
          y += 5;
        }
      }

      if (region.isDoctorVerified) {
        y += 2;
        doc.text("Doctor Verified", 25, y);
        y += 6;
      }

      y += 5;
    });
  }

  checkPage(20);

  doc.setFontSize(14);
  doc.text("Doctor Notes", 20, y);

  y += 9;
  doc.setFontSize(11);

  const notes = report?.doctorNotes || "No doctor notes added.";

  const noteLines = doc.splitTextToSize(notes, 170);

  for (const line of noteLines) {
    checkPage(8);
    doc.text(line, 20, y);
    y += 6;
  }

  y += 8;

  checkPage(25);

  doc.setFontSize(14);
  doc.text("Final Verdict", 20, y);

  y += 9;
  doc.setFontSize(11);

  doc.text(report?.finalVerdict || "Pending Review", 20, y);

  doc.save(`diagnostic-report-${report?._id || "report"}.pdf`);
};

export default generateReportPDF;
