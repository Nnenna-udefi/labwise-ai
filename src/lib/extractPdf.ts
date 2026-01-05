export async function extractTextFromPdf(file: File): Promise<string> {
  if (typeof window === "undefined") {
    throw new Error("PDF parsing must run in the browser");
  }

  // Import PDF.js dynamically (client-only)
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf");

  // Import worker as a URL
  const workerSrc = await import("pdfjs-dist/legacy/build/pdf.worker?url");

  pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc.default;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    fullText +=
      content.items
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((item: any) => item.str)
        .join(" ") + "\n";
  }

  return fullText.trim();
}
