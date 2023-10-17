const { Fragment } = require('../../model/fragment');
const { createSuccessResponse, createErrorResponse } = require('../../utils/response');
const logger = require('../../logger');

/**
 * Saves a fragment to the database for the current user
 */
module.exports = (req, res) => {
  const url = 'http://' + req.headers.host || 'http://localhost:8080';
  const type = req.get('Content-Type');
  const fragmentData = req.body;
  const hashedEmail = req.user;

  // Content type acceptance handling
  if (Buffer.isBuffer(fragmentData) === false) {
    logger.error(
      { fragmentData, type },
      `The data is empty as an invalid type was passed in or the data is not a buffer`
    );

    return res
      .status(415)
      .json(
        createErrorResponse(415, 'Content-Type of fragment is not supported or content missing')
      );
  }

  // Data acceptance handling
  if (fragmentData.byteLength === 0) {
    logger.error('The data is empty');
    return res.status(406).json(createErrorResponse(406, 'Content missing'));
  }

  const fragment = new Fragment({ ownerId: hashedEmail, type: type });

  if (!fragment)
    logger.debug(
      { type, fragmentData, hashedEmail },
      'If this is logged, the fragment was not created properly'
    );

  fragment
    .save()
    .then(() => {
      logger.info(`Fragment saved for user ` + hashedEmail.slice(0, 8));
      fragment
        .setData(fragmentData)
        .then(() => {
          res.set('Location', url + '/v1/fragments/' + fragment.id);
          res.status(201).json(
            createSuccessResponse({
              fragment: fragment,
            })
          );
        })
        .catch((err) => {
          logger.error('Error setting data for fragment: ', err);
          res.status(500).json(createErrorResponse(500, 'Internal server error' + err));
        });
    })
    .catch((err) => {
      logger.error('Error saving fragment: ' + err);
      res.status(500).json(createErrorResponse(500, 'Internal server error' + err));
    });
};
