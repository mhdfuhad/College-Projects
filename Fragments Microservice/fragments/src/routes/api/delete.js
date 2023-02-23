const { createSuccessResponse, createErrorResponse } = require('../../utils/response');
const { Fragment } = require('../../model/fragment');
const logger = require('../../logger');

/**
 * Delete a fragment for the current user
 */
module.exports = (req, res) => {
  const id = req.params.id;
  const ownerId = req.user;

  Fragment.delete(ownerId, id)
    .then(() => {
      logger.info('Fragment deleted for user ' + ownerId.slice(0, 8));
      res.status(200).json(createSuccessResponse({}));
    })
    .catch((err) => {
      if (err.message.includes('missing entry'))
        res
          .status(404)
          .json(
            createErrorResponse(404, 'Fragment not found, non existing fragment cannot be deleted')
          );
      else {
        logger.error({ err }, 'Error deleting fragment');
        res.status(500).json(createErrorResponse(500, 'Internal server error ' + err));
      }
    });
};
