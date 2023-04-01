export function stylizeHighlightedString() {
  // let text = window.getSelection();

  // For diagnostics
  // let start = text.anchorOffset;
  // let end = text.focusOffset - text.anchorOffset;

  const range = window.getSelection()!.getRangeAt(0);

  const selectionContents = range.extractContents();
  const span = document.createElement('span');

  span.appendChild(selectionContents);

  span.style.backgroundColor = 'yellow';
  span.style.color = 'black';

  range.insertNode(span);
}
