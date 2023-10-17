// src/routes/api/index.js

const express = require('express');
const router = express.Router();
const contentType = require('content-type');
const { Fragment } = require('../../model/fragment');
const { getFragments, getFragmentInfo, getFragment } = require('./get');

// Support sending various Content-Types on the body up to 5M in size
const rawBody = () =>
  express.raw({
    inflate: true,
    limit: '5mb',
    type: (req) => {
      // See if we can parse this content type. If we can, `req.body` will be
      // a Buffer (e.g., `Buffer.isBuffer(req.body) === true`). If not, `req.body`
      // will be equal to an empty Object `{}` and `Buffer.isBuffer(req.body) === false`
      const { type } = contentType.parse(req);
      return Fragment.isSupportedType(type);
    },
  });

// All of the API endpoints are mounted on the /v1/fragments path
router.get('/fragments', getFragments);
router.get('/fragments/:id', getFragment);
router.get('/fragments/:id/info', getFragmentInfo);
router.post('/fragments', rawBody(), require('./post'));
router.put('/fragments/:id', rawBody(), require('./put'));
router.delete('/fragments/:id', require('./delete'));

// Other routes will go here later on...

module.exports = router;
