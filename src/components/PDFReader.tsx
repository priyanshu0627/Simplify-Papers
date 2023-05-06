import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import $ from 'jquery';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import ControlPanel from './ControlPanel';
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
  const [clickTiggered, setClickTriggered] = useState(false);

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

  useEffect(() => {
    // function getRangeObject(selectionObject: any) {
    //   try {
    //     if (selectionObject.getRangeAt) return selectionObject.getRangeAt(0);
    //   } catch (ex) {
    //     // console.log(ex);
    //   }
    //   return 1;
    // }
    // function iterateAndHighlight(selection: any) {
    //   debugger;
    //   console.log(selection);
    //   const element = $('.react-pdf__Page__textContent.textLayer');
    //   console.log(element);
    //   // let it = selection.anchorNode.parentNode;
    //   // while (it !== selection.focusNode.parentElement) {
    //   //   if (it && it.tagName && it.tagName === 'SPAN') {
    //   //     it.innerHTML = `<mark>${it.innerHTML}</mark>`;
    //   //   }
    //   //   it = it.nextElementSibling;
    //   // }
    // }

    // function handlerFunction() {
    //   if (document.contains(document.getElementById('share-snippet'))) {
    //     document.getElementById('share-snippet')!.remove();
    //   }
    //   if (window.getSelection()!.toString().length > 0) {
    //     const selection = window.getSelection();
    //     const range = getRangeObject(selection);
    //     const clientRect = range.getBoundingClientRect();

    //     iterateAndHighlight(selection);
    //     const scrollTop =
    //       window.pageYOffset !== undefined
    //         ? window.pageYOffset
    //         : (
    //             document.documentElement ||
    //             document.body.parentNode ||
    //             document.body
    //           ).scrollTop;
    //     const posX = clientRect.x;
    //     const posY = clientRect.bottom + 20 + scrollTop;
    //     document.body.insertAdjacentHTML(
    //       'beforeend',
    //       `    <div id="share-snippet" style="position: absolute; top: ${posY}px; left: ${posX}px;"><div class="speech-bubble"><div class="share-inside" className="text-theme-green" onClick={handleHighlightOnClick}> ToolBar </div></div></div>`
    //     );
    //   }
    // }
    // function highlightContent() {
    //   try {
    //     debugger;
    //     const metaData: any = {};
    //     let start = false;
    //     let end = false;
    //     // const range: any = window.getSelection();
    //     const range = document?.getSelection().getRangeAt(0);
    //     console.log($('.react-pdf__Page__textContent.textLayer')[0].children);
    //     Object.values(
    //       $('.react-pdf__Page__textContent.textLayer')[0].children
    //     ).forEach((element, index) => {
    //       if (element === range?.startContainer?.parentElement) {
    //         metaData.startContainerIndex = index;
    //         if (!start) {
    //           start = true;
    //           metaData.reverseHighlight = false;
    //         } else if (start && !end) {
    //           end = true;
    //         }
    //       }
    //       if (element === range?.endContainer?.parentElement) {
    //         metaData.endContainerIndex = index;
    //         if (!start) {
    //           start = true;
    //           metaData.reverseHighlight = true;
    //         } else if (start && !end) {
    //           end = true;
    //         }
    //       }
    //       // middle mei hai
    //       if (start && !end) {
    //         // markEntireLine(element);
    //         // const newSpanNode = document.createElement('span');
    //         const highlightNode = document.createElement('mark');
    //         highlightNode.textContent = element.textContent;
    //         element.textContent = '';
    //         element.appendChild(highlightNode);
    //         // element.innerHtml = highlightNode.outerHTML;
    //         // console.log(element.value);
    //       }
    //     });
    //     console.table(metaData);
    //   } catch (error) {
    //     throw new Error('Function not implemented.');
    //   }
    // }
    // document.addEventListener('mouseup', highlightContent, false);
  }, []);

  // useEffect(() => {
  //   function highlightContent() {
  //     try {
  //       debugger;
  //       const metaData: any = {};
  //       let start = false;
  //       let end = false;
  //       const range: any = window.getSelection();

  //       Object.values(
  //         $('.react-pdf__Page__textContent.textLayer').children
  //       ).forEach((element, index) => {
  //         if (element === range?.startContainer.parentElement) {
  //           metaData.startContainerIndex = index;
  //           if (!start) {
  //             start = true;
  //             metaData.reverseHighlight = false;
  //           } else if (start && !end) {
  //             end = true;
  //           }
  //         }
  //         if (element === range.endContainer.parentElement) {
  //           metaData.endContainerIndex = index;
  //           if (!start) {
  //             start = true;
  //             metaData.reverseHighlight = true;
  //           } else if (start && !end) {
  //             end = true;
  //           }
  //         }
  //         // middle mei hai
  //         if (start && !end) {
  //           // markEntireLine(element);
  //           const highlightNode = document.createElement('mark');
  //           highlightNode.textContent = element.textContent;
  //           element.innerHtml = highlightNode.outerHTML;
  //           // console.log(element.value);
  //         }
  //       });
  //       console.table(metaData);
  //     } catch (error) {
  //       throw new Error('Function not implemented.');
  //     }
  //   }
  //   highlightContent();
  //   return () => {};
  // }, [clickTiggered]);

  const onClick = () => {
    /** Handle mousedown or click */
    debugger;
    // highlightContent();
  };

  function highlightContent() {
    try {
      debugger;
      const metaData: any = {};
      let start = false;
      let end = false;
      // const range: any = window.getSelection();
      const range = document?.getSelection().getRangeAt(0);
      console.log($('.react-pdf__Page__textContent.textLayer')[0].children);
      Object.values(
        $('.react-pdf__Page__textContent.textLayer')[0].children
      ).forEach((element, index) => {
        if (element === range?.startContainer?.parentElement) {
          metaData.startContainerIndex = index;
          if (!start) {
            start = true;
            metaData.reverseHighlight = false;
          } else if (start && !end) {
            end = true;
          }
        }
        if (element === range?.endContainer?.parentElement) {
          metaData.endContainerIndex = index;
          if (!start) {
            start = true;
            metaData.reverseHighlight = true;
          } else if (start && !end) {
            end = true;
          }
        }
        // middle mei hai
        if (start && !end) {
          // markEntireLine(element);
          // const newSpanNode = document.createElement('span');
          const highlightNode = document.createElement('mark');
          highlightNode.textContent = element.textContent;
          element.textContent = '';
          element.appendChild(highlightNode);
          // element.innerHtml = highlightNode.outerHTML;
          // console.log(element.value);
        }
      });
      console.table(metaData);
    } catch (error) {
      throw new Error('Function not implemented.');
    }
  }

  const handleMouseUp = (event): any => {
    if (event.button !== 2) {
      setClickTriggered(true);
      setTimeout(() => setClickTriggered(false), 10);
      onClick();
      highlightContent();
    }
  };

  const handleClick = useCallback(() => {
    if (!clickTiggered) {
      onClick();
    }
  }, [clickTiggered]);

  return (
    <div className="flex bg-gray-900">
      <SideBar jumpToOutline={clickTOC} file={file} />
      <div className="flex grow">
        <Loader isLoading={isLoading} />
        <section id="pdf-section" className="h-full basis-3/5">
          <ControlPanel
            scale={scale}
            setScale={setScale}
            numPages={numPages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            file={file}
          />
          <section onMouseUp={handleMouseUp} onClick={handleClick}>
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
