declare module "pdfjs-dist/legacy/build/pdf" {
  import * as pdfjs from "pdfjs-dist";
  export = pdfjs;
}

declare module "pdfjs-dist/legacy/build/pdf.worker?url" {
  const workerSrc: string;
  export default workerSrc;
}
