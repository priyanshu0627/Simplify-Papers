import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import React, { useEffect, useState } from 'react';
import { Document, Outline, Page, pdfjs } from 'react-pdf';

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
    // function handleHighlightOnClick() {
    //   console.log('here');
    // }
    // function iterateAndHighlight(selection: any) {
    //   let it = selection.anchorNode.parentNode;
    //   while (it !== selection.focusNode.parentElement) {
    //     if (it.tagName === 'SPAN') {
    //       it.innerHTML = `<mark>${it.innerHTML}</mark>`;
    //     }
    //     it = it.nextElementSibling;
    //   }
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
    // document.addEventListener('mouseup', handlerFunction, false);
    // document.addEventListener('pointerup', (e : any) => {
    //   debugger;
    //   const selection = window.getSelection();
    //         /* get the Selection object */
    //         const userSelection = window.getSelection();
    //         /* get the innerText (without the tags) */
    //         const text = userSelection.toString();
    //         /* Creating Range object based on the userSelection object */
    //         var rangeObject = getRangeObject(userSelection);
    //         /*
    //            This extracts the contents from the DOM literally, inclusive of the tags.
    //            The content extracted also disappears from the DOM
    //         */
    //         const contents = rangeObject.extractContents();
    //         var span = document.createElement("span");
    //         span.className = "highlight";
    //         span.appendChild(contents);
    //         /* Insert your new span element in the same position from where the selected text was extracted */
    //         rangeObject.insertNode(span);
    //   if (selection.type === 'Range') {
    //     for (let i = 0; i < selection.rangeCount; i++) {
    //       const range = selection.getRangeAt(i);
    //       debugger;
    //       playAnimation(range.commonAncestorContainer);
    //     }
    //   }
    //   // var selection = window.getSelection();
    //   // if (!selection.isCollapsed) {
    //   //     // we have a non-zero length selection
    //   //     var startNode = selection.anchorNode;
    //   //     var startOffset = selection.anchorOffset;
    //   //     if (startNode instanceof Element) {
    //   //         // if it is an element then the offset is the child node index
    //   //         startNode = startNode.childNodes[startOffset];
    //   //         startOffset = 0;
    //   //     }
    //   //     var endNode = selection.focusNode;
    //   //     var endOffset = selection.focusOffset;
    //   //     if (endNode instanceof Element) {
    //   //         // if it is an element then the offset is the child node index
    //   //         endNode = endNode.childNodes[endOffset];
    //   //         endOffset = 0;
    //   //     }
    //   //     if (endNode instanceof Text) {
    //   //       endNode.splitText(endOffset);
    //   //   }
    //   //   if (startNode instanceof Text) {
    //   //       startNode.splitText(startOffset);
    //   //       startNode = startNode.nextSibling;
    //   //   }
    //   //   // filter out the element with id=ignore
    //   //   function filterFunction(node) {
    //   //       if (node.id === 'ignore') {
    //   //           return NodeFilter.FILTER_REJECT;
    //   //       }
    //   //       return NodeFilter.FILTER_ACCEPT;
    //   //   }
    //   //   let nodeTypes = NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT;
    //   //   let walker = document.createTreeWalker(document.body, nodeTypes, { acceptNode: filterFunction}, false);
    //   //   walker.currentNode = startNode;
    //   //   let nextNode = walker.currentNode;
    //   //   let html = [];
    //   //   while (nextNode && nextNode !== endNode) {
    //   //       if (nextNode.nodeType === Node.TEXT_NODE) {
    //   //           html.push(nextNode.nodeValue);
    //   //           // const span = document.createElement("span");
    //   //           // span.innerHTML = `<mark>${nextNode.nodeValue}</mark>`;
    //   //           // debugger;
    //   //           // nextNode.parentElement?.innerHTML(`<mark>${nextNode.nodeValue}</mark>`);
    //   //       }
    //   //       debugger;
    //   //       // nextNode.replace(/e/gi, '<span>e</span>');
    //   //       nextNode = walker.nextNode();
    //   //   }
    //   //   // if (nextNode.nodeType === Node.TEXT_NODE) {
    //   //   //     html.push(nextNode.nodeValue);
    //   //   // }
    //   //   let filteredOutput = document.createElement('li');
    //   //   filteredOutput.innerHTML = html.join('');
    //   //     console.log(startNode, startOffset, endNode, endOffset);
    //   // }
    // });
    // function playAnimation(el) {
    //   if (el.nodeType === Node.TEXT_NODE) {
    //     el = el.parentNode;
    //   }
    //   el.classList.remove('highlight');
    //   setTimeout(() => {
    //     el.classList.add('highlight');
    //   }, 0);
    // }
    // function debounce(fn: any, delay: any) {
    //   let timer: any = null;
    //   return function () {
    //     const context = this;
    //     const args = arguments;
    //     clearTimeout(timer);
    //     timer = setTimeout(function () {
    //       fn.apply(context, args);
    //     }, delay);
    //   };
    // }
    // document.addEventListener("selectionchange", debounce(function (event) {
    //     debugger;
    //   let selection = document.getSelection ? document.getSelection().toString() :  document.selection.createRange().toString() ;
    //   console.log(selection);
    // }, 250));
    // document.addEventListener(
    //   'selectionchange',
    //   debounce(handlerFunction, 250)
    // );
  }, []);

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
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            className="flex justify-center"
          >
            <Page pageNumber={pageNumber} scale={scale} />
          </Document>
        </section>
        <section className="basis-2/5">
          <PDFSideBar onFileChange={onFileChange} />
        </section>
      </div>
    </div>
  );
};

export default PDFReader;
