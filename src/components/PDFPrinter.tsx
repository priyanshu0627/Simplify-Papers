import PrintIcon from '@mui/icons-material/Print';
import React from 'react';

const PDFPrinter = ({ file }: any) => {
  const print = () => {
    const pdfFrame = document.createElement('iframe');
    pdfFrame.style.visibility = 'hidden';
    pdfFrame.src = file;

    document.body.appendChild(pdfFrame);

    pdfFrame.contentWindow!.focus();
    pdfFrame.contentWindow!.print();
  };
  return <PrintIcon className="text-green-800" onClick={print} />;
};

export default PDFPrinter;
