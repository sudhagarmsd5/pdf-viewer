import React from 'react'
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

const PdfViewer = () => {
    const [numPages, setNumPages] = React.useState();
    const [pageNumber, setPageNumber] = React.useState(1);

    function onDocumentLoadSuccess(numPages) {
        setNumPages(numPages.numPages);
    }

    const pdf = require("./sample.pdf")
    return (
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <>
            <Document className={'pdf_custom_styles'}  file={pdf} onLoadSuccess={onDocumentLoadSuccess} onContextMenu={(e)=>e.preventDefault()}>
                <Page pageNumber={pageNumber} renderTextLayer={false} height={900} width={500} renderAnnotationLayer={false} />
            </Document>
            </>
            <p>
                Page {pageNumber} of {numPages} 
            </p>
            <div style={{display:'flex'}}>
            <button disabled={pageNumber <= 1} onClick={()=>setPageNumber(pageNumber-1)}>previous page</button>
            <button disabled={pageNumber === numPages} onClick={()=>setPageNumber(pageNumber+1)}>next page</button>
            </div>
        </div>
    )
}

export default PdfViewer
