'use client';

/* eslint-disable no-debugger */
/* eslint-disable import/no-extraneous-dependencies */

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { addHighlight } from '@/redux/features/Highlights';
import { addNewQuestion } from '@/redux/features/questionDataSlice';
import { updateHighlightStatus } from '@/redux/features/StatusHighlight';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import highlightContent, {
  pageHighlights,
  reDrawAllHighlight,
  reDrawHighlight,
} from '../utils/HighlightService';
import ControlPanel from './ControlPanel';
// import FloatingHighlightMenu from './FloatingHighlightingMenu';
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
  const dispatch = useAppDispatch();
  const highlightedData = useAppSelector((state) => state.Highlights);
  // const [floatingHighlightMenu, setFloatingHighlightMenu] = useState(false);

  const clickTOC = ({ pageNumber: itemPageNumber }: any) => {
    setPageNumber(itemPageNumber);
  };

  const test = () => {
    // SHOULD PROVIDE PDF ID IN THE SELECTOR TO GET A PARTICULAR PDF
    debugger;
    if (highlightedData.allHighlights && highlightedData.allHighlights.length) {
      const currPageHighlights = pageHighlights(
        highlightedData.allHighlights,
        pageNumber
      );
      reDrawAllHighlight(currPageHighlights);
    }
  };

  function onDocumentLoadSuccess({ pageNo }: any) {
    setNumPages(pageNo);
    setIsLoading(false);
    test();
  }

  function onPageLoadSuccess() {
    test();
  }

  function onFileChange(event: any) {
    setFile(event.target.files[0]);
  }

  useEffect(() => {}, []);

  const handleMouseUp = (event: any) => {
    debugger;
    if (event.button !== 2) {
      const metadata = highlightContent(pageNumber);
      if (metadata) {
        // metadata.pageNumber = pageNumber;
        dispatch(
          addHighlight({
            id: 1,
            pdf: 1,
            currHighlight: metadata,
          })
        );
        dispatch(updateHighlightStatus({ rangeId: metadata.rangeId }));
        dispatch(
          addNewQuestion({
            newQuestionData: {
              id: 999,
              upVotes: 999,
              downVotes: 999,
              liked: 999,
              accepted: true,
              flag: 999,
              views: 999,
              question: 'redux',
              askedBy: 'redux',
              lastActivityTime: 'just now',
              lastActivityPerson: 'Mr-redux',
              tags: ['React', 'redux'],
              highlight: metadata,
            },
          })
        );
      }
    }
  };

  return (
    <div className="mt-20 flex bg-gray-900">
      <SideBar jumpToOutline={clickTOC} file={file} />
      <div className="flex grow">
        <Loader isLoading={isLoading} />
        {/* <FloatingHighlightMenu
          isOpen={floatingHighlightMenu}
          setIsOpen={setFloatingHighlightMenu}
        /> */}
        {/* <button onClick={testRedraw}>test</button> */}
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
              <Page
                pageNumber={pageNumber}
                scale={scale}
                onLoadSuccess={onPageLoadSuccess}
              />
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
