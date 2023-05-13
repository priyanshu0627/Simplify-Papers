import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import highlightContent from '../utils/HighlightService';
import ControlPanel from './ControlPanel';
import FloatingHighlightMenu from './FloatingHighlightingMenu';
import Loader from './Loader';
import PDFSideBar from './PDFSideBar';
import SideBar from './SideBar';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFReader = () => {
  const [file, setFile] = useState('./file-example_PDF_1MB.pdf');
  const [scale, setScale] = useState(1.1);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [floatingHighlightMenu, setFloatingHighlightMenu] = useState(false);

  const clickTOC = ({ pageNumber: itemPageNumber }: any) => {
    setPageNumber(itemPageNumber);
  };

  function onDocumentLoadSuccess({ pageNo }: any) {
    setNumPages(pageNo);
    setIsLoading(false);
  }

  function onFileChange(event: any) {
    setFile(event.target.files[0]);
  }

  useEffect(() => {}, []);

  const handleMouseUp = (event: any) => {
    if (event.button !== 2) {
      // setClickTriggered(true);
      // setTimeout(() => setClickTriggered(false), 10);
      highlightContent();
    }
  };

  return (
    <div className="flex bg-gray-900">
      <SideBar jumpToOutline={clickTOC} file={file} />
      <div className="flex grow">
        <Loader isLoading={isLoading} />
        <FloatingHighlightMenu
          isOpen={floatingHighlightMenu}
          setIsOpen={setFloatingHighlightMenu}
        />
        <section id="pdf-section" className="h-full basis-3/5">
          <ControlPanel
            scale={scale}
            setScale={setScale}
            numPages={numPages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            file={file}
          />
          <section onMouseUp={handleMouseUp}>
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              className="flex justify-center"
            >
              <Page pageNumber={pageNumber} scale={scale} />
            </Document>
          </section>
        </section>
        <section className="basis-2/5">
          <PDFSideBar onFileChange={onFileChange} />
        </section>
      </div>
    </div>
  );
};

export default PDFReader;

// export default dynamic(() => Promise.resolve(PDFReader), {
//   ssr: false,
// });
