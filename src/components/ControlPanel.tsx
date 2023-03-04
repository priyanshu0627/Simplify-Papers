import React, { ChangeEvent } from 'react';
import PDFPrinter from './PDFPrinter';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FastForwardIcon from '@mui/icons-material/FastForward';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import DownloadIcon from '@mui/icons-material/Download';

const ControlPanel = (props : any) => {
  const { file, pageNumber, numPages, setPageNumber, scale, setScale } = props;

  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;

  const firstPageClass = isFirstPage ? 'disabled' : 'clickable';
  const lastPageClass = isLastPage ? 'disabled' : 'clickable';

  const goToFirstPage = () => {
    if (!isFirstPage) setPageNumber(1);
  };
  const goToPreviousPage = () => {
    if (!isFirstPage) setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    if (!isLastPage) setPageNumber(pageNumber + 1);
  };
  const goToLastPage = () => {
    if (!isLastPage) setPageNumber(numPages);
  };

  const onPageChange = (e : ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPageNumber(Number(value));
  };

  const isMinZoom = scale < 0.6;
  const isMaxZoom = scale >= 2.0;

  const zoomOutClass = isMinZoom ? 'disabled' : 'clickable';
  const zoomInClass = isMaxZoom ? 'disabled' : 'clickable';

  const zoomOut = () => {
    if (!isMinZoom) setScale(scale - 0.1);
  };

  const zoomIn = () => {
    if (!isMaxZoom) setScale(scale + 0.1);
  };

  return (
    <div className="flex text-[16px] text-black rounded p-4 my-4 bg-white justify-between items-center">
      <div className="flex justify-between items-center">
        <FastRewindIcon className={`mx-4 ${firstPageClass}`} onClick={goToFirstPage}/>
        <ArrowLeftIcon className={`mx-4 ${firstPageClass}`} onClick={goToPreviousPage}/>
        <span className='flex items-center mx-1'>
          Page
          <input name="pageNumber" type="number" min={1} max={numPages || 1} className="mx-2 px-1 border-2 border-black rounded" value={pageNumber} onChange={onPageChange} />{' '}
           of
        </span>
        {numPages}
        <ArrowRightIcon className={` mx-4 ${lastPageClass}`} onClick={goToNextPage}/>
        <FastForwardIcon className={`mx-4  ${lastPageClass}`} onClick={goToLastPage}/>
      </div>
      <div className="flex justify-between items-center">
        <ZoomOutIcon className={`mx-4 ${zoomInClass}`} onClick={zoomOut}/>
        <span>
          {(scale * 100).toFixed()}%
        </span>
        <ZoomInIcon className={`mx-4 ${zoomOutClass}`} onClick={zoomIn}/>
      </div>
      <div className="mx-4">
        <a href="/assets/docs/file-sample.pdf" download={true} title="download">
          <DownloadIcon className='mx-4'/>
        </a>
      </div>
      <div className="mx-4">
        <PDFPrinter file={file} />
      </div>
    </div>
  );
};

export default ControlPanel;
