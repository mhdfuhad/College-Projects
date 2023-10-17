const contentType = require('content-type');
const { createSuccessResponse, createErrorResponse } = require('../../utils/response');
const { Fragment } = require('../../model/fragment');
const logger = require('../../logger');

/**
 * Update a fragment for the current user
 */

module.exports = (req, res) => {
  const { type } = contentType.parse(req);
  const fragmentData = req.body;
  const ownerId = req.user;
  const id = req.params.id;

  // Data acceptance handling
  if (fragmentData.length === 0) {
    logger.error('The data is empty');
    return res.status(406).json(createErrorResponse(406, 'Content missing'));
  }

  Fragment.byId(ownerId, id)
    .then((fragment) => {
      if (fragment) {
        if (fragment.mimeType === type) {
          fragment.setData(fragmentData).then(
            () => {
              logger.info('Fragment updated');
              return res.status(200).json(createSuccessResponse('Updated'));
            },
            (err) => {
              logger.error(err);
              return res.status(500).json(createErrorResponse(500, 'Internal server error'));
            }
          );
        } else
          res
            .status(400)
            .json(createErrorResponse(400, 'Content-Type of fragment cannot be changed'));
      }
    })
    .catch((err) => {
      if (err.message == 'Fragment not found') {
        logger.error('Fragment not found, does not exist for user ' + ownerId.slice(0, 8));
        res
          .status(404)
          .json(
            createErrorResponse(
              404,
              'Fragment not found, does not exist for user ' + ownerId.slice(0, 8)
            )
          );
      } else {
        logger.error({ err }, 'Error getting fragment');
        res.status(500).json(createErrorResponse(500, 'Internal server error ' + err));
      }
    });
};
