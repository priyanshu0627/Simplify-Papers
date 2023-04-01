export {};

// mouseXPosition = 0;
// $(document).ready(function () {
//   $('#test-text').mousedown(function (e1) {
//     mouseXPosition = e1.pageX; // register the mouse down position
//   });

//   $('#test-text').mouseup(function (e2) {
//     let highlighted = false;
//     let selection = window.getSelection();
//     let selectedText = selection.toString();
//     let startPoint = window.getSelection().getRangeAt(0).startOffset;
//     let endPoint = window.getSelection().getRangeAt(0).endOffset;
//     let anchorTag = selection.anchorNode.parentNode;
//     let focusTag = selection.focusNode.parentNode;
//     if (e2.pageX - mouseXPosition < 0) {
//       focusTag = selection.anchorNode.parentNode;
//       anchorTag = selection.focusNode.parentNode;
//     }
//     if (selectedText.length === endPoint - startPoint) {
//       highlighted = true;

//       if (anchorTag.className !== 'highlight') {
//         highlightSelection();
//       } else {
//         var afterText =
//           selectedText +
//           "<span class = 'highlight'>" +
//           anchorTag.innerHTML.substr(endPoint) +
//           '</span>';
//         anchorTag.innerHTML = anchorTag.innerHTML.substr(0, startPoint);
//         anchorTag.insertAdjacentHTML('afterend', afterText);
//       }
//     } else  if(anchorTag.className !== "highlight" && focusTag.className !== "highlight"){
//                 highlightSelection();
//                 highlighted = true;
//             }

//       anchorTag.className === 'highlight' &&
//       focusTag.className === 'highlight' &&
//       !highlighted
//     ) {
//       highlighted = true;

//       var afterHtml = anchorTag.innerHTML.substr(startPoint);
//       var outerHtml = selectedText.substr(
//         afterHtml.length,
//         selectedText.length - endPoint - afterHtml.length
//       );
//       let anchorInnerhtml = anchorTag.innerHTML.substr(0, startPoint);
//       let focusInnerHtml = focusTag.innerHTML.substr(endPoint);
//       let focusBeforeHtml = focusTag.innerHTML.substr(0, endPoint);
//       selection.deleteFromDocument();
//       anchorTag.innerHTML = anchorInnerhtml;
//       focusTag.innerHTml = focusInnerHtml;
//       let anchorafterHtml = afterHtml + outerHtml + focusBeforeHtml;
//       anchorTag.insertAdjacentHTML('afterend', anchorafterHtml);
//     }

//     if (anchorTag.className === 'highlight' && !highlighted) {
//       highlighted = true;
//       let Innerhtml = anchorTag.innerHTML.substr(0, startPoint);
//       var afterHtml = anchorTag.innerHTML.substr(startPoint);
//       var outerHtml = selectedText.substr(
//         afterHtml.length,
//         selectedText.length
//       );
//       selection.deleteFromDocument();
//       anchorTag.innerHTML = Innerhtml;
//       anchorTag.insertAdjacentHTML('afterend', afterHtml + outerHtml);
//     }

//     if (focusTag.className === 'highlight' && !highlighted) {
//       highlighted = true;
//       let beforeHtml = focusTag.innerHTML.substr(0, endPoint);
//       var outerHtml = selectedText.substr(
//         0,
//         selectedText.length - beforeHtml.length
//       );
//       selection.deleteFromDocument();
//       focusTag.innerHTml = focusTag.innerHTML.substr(endPoint);
//       outerHtml += beforeHtml;
//       focusTag.insertAdjacentHTML('beforebegin', outerHtml);
//     }
//     if (!highlighted) {
//       highlightSelection();
//     }
//     $('.highlight').each(function () {
//       if ($(this).html() == '') {
//         $(this).remove();
//       }
//     });
//     selection.removeAllRanges();
//   });
// });

// function highlightSelection() {
//   let selection;

//   // Get the selected stuff
//   if (window.getSelection) selection = window.getSelection();
//   else if (typeof document.selection != 'undefined')
//     selection = document.selection;

//   // Get a the selected content, in a range object
//   let range = selection.getRangeAt(0);

//   // If the range spans some text, and inside a tag, set its css class.
//   if (range && !selection.isCollapsed) {
//     if (selection.anchorNode.parentNode == selection.focusNode.parentNode) {
//       let span = document.createElement('span');
//       span.className = 'highlight';
//       span.textContent = selection.toString();
//       selection.deleteFromDocument();
//       range.insertNode(span);
//       //                        range.surroundContents(span);
//     }
//   }
// }
