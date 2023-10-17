const sharp = require('sharp');

module.exports = async (type, data, currType) => {
  if (type === 'text/plain') {
    return data.toString();
  } else if (type === 'application/json') {
    return JSON.parse(data);
  } else if (type === 'text/html') {
    if (currType === 'text/markdown') {
      return require('markdown-it')().render(data.toString());
    }
    return data;
  } else if (type === 'image/png') {
    return await sharp(data).png().toBuffer();
  } else if (type === 'image/jpeg') {
    return await sharp(data).jpeg().toBuffer();
  } else if (type === 'image/gif') {
    return await sharp(data).gif().toBuffer();
  } else if (type === 'image/webp') {
    return await sharp(data).webp().toBuffer();
  } else {
    return data;
  }
};
