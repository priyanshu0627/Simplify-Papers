import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DownloadIcon from '@mui/icons-material/Download';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import type { ChangeEvent } from 'react';
import React from 'react';

import PDFPrinter from './PDFPrinter';

const ControlPanel = (props: any) => {
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

  const onPageChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    <div className="my-4 flex items-center justify-between rounded bg-white p-4 text-[16px] text-black">
      <div className="flex items-center justify-between">
        <FastRewindIcon
          className={` ${firstPageClass}`}
          onClick={goToFirstPage}
        />
        <ArrowLeftIcon
          className={` ${firstPageClass}`}
          onClick={goToPreviousPage}
        />
        <span className="mx-1 flex items-center">
          Page
          <input
            name="pageNumber"
            type="number"
            min={1}
            max={numPages || 1}
            className="mx-2 rounded border-2 border-black px-1"
            value={pageNumber}
            onChange={onPageChange}
          />{' '}
          of
        </span>
        {numPages}
        <ArrowRightIcon className={`${lastPageClass}`} onClick={goToNextPage} />
        <FastForwardIcon
          className={`${lastPageClass}`}
          onClick={goToLastPage}
        />
      </div>
      <div className="flex items-center justify-between">
        <ZoomOutIcon className={`${zoomInClass}`} onClick={zoomOut} />
        <span>{(scale * 100).toFixed()}%</span>
        <ZoomInIcon className={`${zoomOutClass}`} onClick={zoomIn} />
      </div>
      <a href="/assets/docs/file-sample.pdf" download={true} title="download">
        <DownloadIcon className="text-green-800	" />
      </a>
      <PDFPrinter file={file} />
    </div>
  );
};

export default ControlPanel;
