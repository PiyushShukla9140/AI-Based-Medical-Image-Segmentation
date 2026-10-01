import jsPDF from "jspdf";

export const generateReportPDF = (report) => {
  const pdf = new jsPDF();

  const scan = report?.scanId;
  const patient = scan?.patientId;
  const analysis = scan?.analysis;

  let y = 20;

  const addText = (text, x = 20, size = 11) => {
    pdf.setFontSize(size);

    const lines = pdf.splitTextToSize(
      String(text || ""),
      170
    );

    pdf.text(lines, x, y);

    y += lines.length * 7 + 5;

    if (y > 275) {
      pdf.addPage();
      y = 20;
    }
  };

  pdf.setFontSize(20);
  pdf.text("Diagnostic Report", 20, y);

  y += 15;

  addText(
    `Patient: ${patient?.name || "Unknown"}`,
    20,
    12
  );

  addText(
    `Age: ${patient?.age || "N/A"}`,
    20,
    11
  );

  addText(
    `Gender: ${patient?.gender || "N/A"}`,
    20,
    11
  );

  addText(
    `Scan Type: ${scan?.scanType || "N/A"}`,
    20,
    11
  );

  addText(
    `Body Part: ${scan?.bodyPart || "N/A"}`,
    20,
    11
  );

  addText(
    `Severity: ${analysis?.severityLevel || "N/A"}`,
    20,
    11
  );

  y += 5;

  pdf.setFontSize(14);
  pdf.text("AI Findings", 20, y);

  y += 10;

  addText(
    analysis?.overallFindings ||
      "No findings available.",
    20,
    11
  );

  pdf.setFontSize(14);
  pdf.text("Detected Regions", 20, y);

  y += 10;

  const regions =
    analysis?.detectedRegions || [];

  if (regions.length === 0) {
    addText(
      "No detected regions.",
      20,
      11
    );
  } else {
    regions.forEach((region, index) => {
      addText(
        `${index + 1}. ${region.label || "Detected Region"}`,
        20,
        11
      );

      addText(
        `Category: ${region.category || "N/A"}`,
        25,
        10
      );

      addText(
        `Confidence: ${
          region.confidenceScore !== undefined
            ? `${(region.confidenceScore * 100).toFixed(1)}%`
            : "N/A"
        }`,
        25,
        10
      );

      addText(
        `Description: ${
          region.clinicalNote ||
          region.clinicalDescription ||
          "N/A"
        }`,
        25,
        10
      );
    });
  }

  pdf.setFontSize(14);
  pdf.text("Doctor Notes", 20, y);

  y += 10;

  addText(
    report?.doctorNotes || "No doctor notes.",
    20,
    11
  );

  pdf.setFontSize(14);
  pdf.text("Final Verdict", 20, y);

  y += 10;

  addText(
    report?.finalVerdict || "Pending Review",
    20,
    11
  );

  y += 10;

  pdf.setFontSize(8);
  pdf.text(
    "AI-assisted analysis for educational/project purposes. Not a definitive medical diagnosis.",
    20,
    y
  );

  pdf.save(
    `diagnostic-report-${report?._id || "report"}.pdf`
  );
};