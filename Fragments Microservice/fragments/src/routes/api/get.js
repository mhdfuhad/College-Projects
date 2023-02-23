//const logger = require('../../logger');
const { createSuccessResponse, createErrorResponse } = require('../../utils/response');
const { Fragment } = require('../../model/fragment');
const converter = require('../../utils/converter');
const logger = require('../../logger');

/**
 * Get a list of fragments for the current user be it ids or full, empty array returned if no fragments no error to be shown
 */
module.exports.getFragments = (req, res) => {
  const expand = req.query.expand == 1 || false;
  const ownerId = req.user;

  logger.debug(
    { expand, ownerId },
    'Check if expand is set properly if full representation not shown'
  );

  Fragment.byUser(ownerId, expand)
    .then((fragments) => {
      logger.info('Got fragments for user ' + ownerId.slice(0, 8));
      res.status(200).json(createSuccessResponse({ fragments }));
    })
    .catch((err) => {
      logger.error({ err }, 'Error getting fragments');
      res.status(500).json(createErrorResponse(500, 'Internal server error' + err));
    });
};

/**
 * Get a single fragment for the current user, if not found return error 404. It also converts the content type as per the request
 */
module.exports.getFragment = (req, res) => {
  let id = req.params.id || null;
  let conversionType = null;
  const typeTemp = id.split('.')[1];
  const ownerId = req.user;

  if (id) {
    const mimeLookup = require('mime-types').lookup(typeTemp);
    conversionType = mimeLookup ? mimeLookup : 'invalid';
    id = id.split('.')[0];
    logger.debug(`The type and id are ${conversionType} and ${id}`);
  }

  Fragment.byId(ownerId, id)
    .then((fragment) => {
      logger.info('Got fragment ' + id.slice(0, 8));

      fragment
        .getData()
        .then((data) => {
          if (typeTemp) {
            logger.debug('Check if conversion possible');
            if (!fragment.formats.includes(conversionType)) {
              logger.info('Type not supported for conversion');
              res.status(415).json(createErrorResponse(415, 'Unsupported conversion type'));
              return;
            }
          } else {
            logger.debug('No conversion type specified');
            conversionType = fragment.mimeType;
          }

          res.setHeader('Content-Type', conversionType);

          converter(conversionType, data, fragment.mimeType)
            .then((convertedData) => {
              logger.info('Converted data');
              res.status(200).send(convertedData);
            })
            .catch((err) => {
              logger.error({ err, conversionType }, 'Error converting data');
              res.status(500).json(createErrorResponse(500, 'Internal server error' + err));
            });
        })
        .catch((err) => {
          if (err.message == 'Fragment not found') {
            logger.error({ err, id }, 'Fragment not found');
            res.status(404).json(createErrorResponse(404, 'Fragment not found'));
          } else {
            logger.error({ err }, 'Error sending fragment');
            res.status(500).json(createErrorResponse(500, 'Internal server error ' + err));
          }
        });
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

/**
 * Gets the metadata for a single fragment for the current user, if not found return error 404
 */
module.exports.getFragmentInfo = (req, res) => {
  const ownerId = req.user;
  const id = req.params.id;

  Fragment.byId(ownerId, id)
    .then((fragment) => {
      logger.info('Got fragment ' + id.slice(0, 8));
      res.status(200).json(createSuccessResponse({ fragment }));
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
