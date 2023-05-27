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

export default function highlightContent() {
  try {
    const metaData: any = {};
    let start = false;
    let end = false;
    // const range: any = window.getSelection();
    const range = document?.getSelection()?.getRangeAt(0);
    Object.values(
      $('.react-pdf__Page__textContent.textLayer')[0].children
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
    return metaData;
  } catch (error) {
    throw new Error('Function not implemented.');
  }
}

const highlightElement = (element: any) => {
  const highlightNode = document.createElement('mark');
  highlightNode.textContent = element.textContent;
  element.textContent = '';
  element.appendChild(highlightNode);
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
      const currContainer = spans[i - 1];
      highlightElement(currContainer);
    }
  }
};
