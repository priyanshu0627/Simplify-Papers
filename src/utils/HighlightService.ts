/* eslint-disable no-bitwise */
// eslint-disable-next-line import/no-extraneous-dependencies
import $ from 'jquery';
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore
import { fromRange } from 'xpath-range';

function getSelection() {
  if (window.getSelection) {
    return window.getSelection();
  }

  // if (document.selection) {
  //   return document.selection;
  // }

  return null;
}

const getXpathParameters = (xpath: {
  start?: any;
  end?: any;
  startOffset?: any;
  endOffset?: any;
}) => {
  const { startOffset } = xpath;
  const { endOffset } = xpath;
  let startContainer = xpath.start;
  // /div[2]/p[7]/text()[1] -> /div[2]/p[7]/text[1]
  startContainer = startContainer.replace(/(|)/g, '');
  let endContainer = xpath.end;
  endContainer = endContainer.replace(/(|)/g, '');
  return { startOffset, endOffset, startContainer, endContainer };
};

export function onHighlightAction(
  colorName: any,
  decision: { id: any },
  setShowToolTip: (arg0: boolean) => void,
  userAnnotations: {
    saveUserAnnotation: (
      arg0: string,
      arg1: any,
      arg2: any,
      arg3: string,
      arg4: any,
      arg5: any,
      arg6: any,
      arg7: any,
      arg8: string
    ) => void;
  }
) {
  const text =
    (window.getSelection() && window.getSelection()?.toString()) || '';

  if (!text || text === ' ') {
    setShowToolTip(false);
    return;
  }

  const selection = getSelection();
  if (selection?.rangeCount && selection?.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const content = document.getElementById('decision-reader-body-root');
    let xpath = null;
    if (content) {
      xpath = fromRange(range, content);
    }
    if (xpath) {
      try {
        const { startOffset, endOffset, startContainer, endContainer } =
          getXpathParameters(xpath);
        const highlightId = uuidv4();
        const typename = 'highlight';
        userAnnotations.saveUserAnnotation(
          text,
          colorName,
          decision.id,
          highlightId,
          startOffset,
          endOffset,
          startContainer,
          endContainer,
          typename
        );
      } catch (e) {
        console.error('user highlight failed: ', e);
      }
    }
  }
  setShowToolTip(false);
}

// export function highlightContent() {
//   const metaData = {};
//   let start = false;
//   let end = false;
//   const range = getSelection();

//   Object.values($('.react-pdf__Page__textContent.textLayer').children).forEach(
//     (element, index) => {
//       if (element === range.startContainer.parentElement) {
//         metaData.startContainerIndex = index;
//         if (!start) {
//           start = true;
//           metaData.reverseHighlight = false;
//         } else if (start && !end) {
//           end = true;
//         }
//       }
//       if (element === range.endContainer.parentElement) {
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
//         const highlightNode = document.createElement('mark');
//         highlightNode.textContent = element.textContent;
//         element.innerHtml = highlightNode.outerHTML;
//         // console.log(element.value);
//       }
//     }
//   );

//   console.table(metaData);
// }

const createRangeId = () => {
  let timestamp = new Date().getTime();
  const uniqueId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (char) {
      const random = (timestamp + Math.random() * 16) % 16 | 0;
      timestamp = Math.floor(timestamp / 16);
      return (char === 'x' ? random : (random & 0x3) | 0x8).toString(16);
    }
  );
  return uniqueId;
};

export default function highlightContent(pageNumber: number = 0) {
  try {
    const metaData: any = {};
    let start = false;
    let end = false;
    const range = document?.getSelection()?.getRangeAt(0);

    if (range && range.collapsed) {
      range.collapse();
      return;
    }

    if (
      !(
        document &&
        document.getElementsByClassName(
          'react-pdf__Page__textContent textLayer'
        )[0] &&
        document
          .getElementsByClassName('react-pdf__Page__textContent textLayer')[0]
          .getElementsByTagName('span')
      )
    ) {
      return;
    }

    Object.values(
      document
        .getElementsByClassName('react-pdf__Page__textContent textLayer')[0]
        .getElementsByTagName('span')
    ).forEach((element: any, index: any) => {
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
        const highlightNode = document.createElement('mark');
        highlightNode.textContent = element.textContent;
        element.textContent = '';
        element.appendChild(highlightNode);
      }
    });
    console.table(metaData);
    metaData.pageNumber = pageNumber;
    metaData.rangeId = createRangeId();
    return metaData;
  } catch (error) {
    throw new Error('Function highlight content not implemented!');
  }
}

const highlightElement = (element: any, darkerHighlight = false) => {
  const highlightNode = document.createElement('mark');
  if (darkerHighlight) {
    highlightNode.classList.add('darkerHighlight');
  }
  if (element && element.textContent) {
    highlightNode.textContent = element.textContent;
    element.textContent = '';
    element.appendChild(highlightNode);
  }
};

export const reDrawAllHighlight = (allHighlights: any) => {
  allHighlights.forEach((element: any) => {
    const { metadata } = element;
    const container = document.getElementsByClassName(
      'react-pdf__Page__textContent'
    )[0];
    const spans = container?.getElementsByTagName('span');
    if (!spans) return null;
    const startContainer = metadata.startContainerIndex;
    const endContainer = metadata.endContainerIndex;
    if (metadata.reverseHighlight) {
      // console.log('test');
    } else {
      for (let i = startContainer; i < endContainer; i += 1) {
        const currContainer = spans[i];
        highlightElement(currContainer, false);
      }
    }
  });
};

export const reDrawHighlight = (metadata: any) => {
  const container = document.getElementsByClassName(
    'react-pdf__Page__textContent'
  )[0];
  const spans = container?.getElementsByTagName('span');
  if (!spans) return null;
  const startContainer = metadata.startContainerIndex;
  const endContainer = metadata.endContainerIndex;

  if (metadata.reverseHighlight) {
    // console.log('test');
  } else {
    for (let i = startContainer; i < endContainer; i += 1) {
      const currContainer = spans[i];
      if (currContainer) {
        highlightElement(currContainer, true);
        // currContainer.children[0].classList.add('darkerHighlight');
      }
    }
  }
};

// NEED TO UPDATED WHEN THERE WILL BE MULTIPLE PDFs
export function pageHighlights(allHighlights: any, currPage: number) {
  if (allHighlights) {
    return allHighlights.filter(
      (highlight: { metadata: { pageNumber: number } }) =>
        highlight.metadata.pageNumber === currPage
    );
  }
  return null;
}
