if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require, import/extensions
  module.exports = require('pdfjs-dist/build/pdf.worker.min.js');
} else {
  // eslint-disable-next-line global-require
  module.exports = require('pdfjs-dist/build/pdf.worker.entry');
}
