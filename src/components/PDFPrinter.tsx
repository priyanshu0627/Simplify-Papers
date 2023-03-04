import React from 'react';
import PrintIcon from '@mui/icons-material/Print';

const PDFPrinter = ({ file } : any) => {
  const print = () => {
    const pdfFrame = document.createElement('iframe');
    pdfFrame.style.visibility = 'hidden';
    pdfFrame.src = file;

    document.body.appendChild(pdfFrame);

    pdfFrame.contentWindow.focus();
    pdfFrame.contentWindow.print();
  };
  return (
    // <i className="fas fa-print clickable" onClick={print} title="download" />
    <PrintIcon onClick={print}/>
  );
};

export default PDFPrinter;
