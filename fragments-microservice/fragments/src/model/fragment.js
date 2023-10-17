const { randomUUID } = require('crypto');
// Use https://www.npmjs.com/package/content-type to create/parse Content-Type headers
const contentType = require('content-type');

// Functions for working with fragment metadata/data using our DB
const {
  readFragment,
  writeFragment,
  readFragmentData,
  writeFragmentData,
  listFragments,
  deleteFragment,
} = require('./data');

class Fragment {
  constructor({ id, ownerId, created, updated, type, size = 0 }) {
    // Set ID
    this.id = id || randomUUID();

    // Set ownerId
    if (!ownerId) throw new Error('ownerId is required');
    this.ownerId = ownerId;

    // Set created and updated
    this.created = created || new Date().toISOString();
    this.updated = updated || new Date().toISOString();

    // Set type
    if (!type) throw new Error('type is required');
    if (
      contentType.parse(type).type !== 'text/plain' &&
      contentType.parse(type).type !== 'text/markdown' &&
      contentType.parse(type).type !== 'text/html' &&
      contentType.parse(type).type != 'application/json' &&
      contentType.parse(type).type != 'image/png' &&
      contentType.parse(type).type != 'image/jpeg' &&
      contentType.parse(type).type != 'image/gif' &&
      contentType.parse(type).type != 'image/webp'
    )
      throw new Error('type not supported');

    this.type = type;

    // Set size
    if (size < 0) throw new Error('size must be positive');
    if (typeof size !== 'number') throw new Error('size must be a number');
    this.size = size || 0;
  }

  /**
   * Get all fragments (id or full) for the given user
   * @param {string} ownerId user's hashed email
   * @param {boolean} expand whether to expand ids to full fragments
   * @returns Promise<Array<Fragment>>
   */
  static async byUser(ownerId, expand = false) {
    if (ownerId) return listFragments(ownerId, expand);
    else return Promise.reject(new Error('ownerId is required'));
  }

  /**
   * Gets a fragment for the user by the given id.
   * @param {string} ownerId user's hashed email
   * @param {string} id fragment's id
   * @returns Promise<Fragment>
   */
  static async byId(ownerId, id) {
    try {
      return new Fragment(await readFragment(ownerId, id));
    } catch {
      return Promise.reject(new Error('Fragment not found'));
    }
  }

  /**
   * Delete the user's fragment data and metadata for the given id
   * @param {string} ownerId user's hashed email
   * @param {string} id fragment's id
   * @returns Promise
   */
  static delete(ownerId, id) {
    return deleteFragment(ownerId, id);
  }

  /**
   * Saves the current fragment to the database
   * @returns Promise
   */
  save() {
    this.updated = new Date().toISOString();
    return writeFragment(this);
  }

  /**
   * Gets the fragment's data from the database
   * @returns Promise<Buffer>
   */
  getData() {
    return readFragmentData(this.ownerId, this.id);
  }

  /**
   * Set's the fragment's data in the database
   * @param {Buffer} data
   * @returns Promise
   */
  async setData(data) {
    // if not data is provided return a rejected promise
    if (!data) return Promise.reject(new Error('data is required'));
    this.size = Buffer.byteLength(data);
    this.updated = new Date().toISOString();
    await writeFragment(this);

    return writeFragmentData(this.ownerId, this.id, data);
  }

  /**
   * Returns the mime type (e.g., without encoding) for the fragment's type:
   * "text/html; charset=utf-8" -> "text/html"
   * @returns {string} fragment's mime type (without encoding)
   */
  get mimeType() {
    const { type } = contentType.parse(this.type);
    return type;
  }

  /**
   * Returns true if this fragment is a text/* mime type
   * @returns {boolean} true if fragment's type is text/*
   */
  get isText() {
    return this.mimeType.startsWith('text/');
  }

  /**
   * Returns the formats into which this fragment type can be converted
   * @returns {Array<string>} list of supported mime types
   */
  get formats() {
    switch (this.mimeType) {
      case 'text/plain':
        return ['text/plain'];
      case 'text/markdown':
        return ['text/markdown', 'text/plain', 'text/html'];
      case 'text/html':
        return ['text/html', 'text/plain'];
      case 'application/json':
        return ['application/json', 'text/plain'];
      case 'image/png':
        return ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
      case 'image/jpeg':
        return ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      case 'image/gif':
        return ['image/gif', 'image/png', 'image/jpeg', 'image/webp'];
      case 'image/webp':
        return ['image/webp', 'image/png', 'image/jpeg', 'image/gif'];
      default:
        return [this.mimeType];
    }
  }

  /**
   * Returns true if we know how to work with this content type
   * @param {string} value a Content-Type value (e.g., 'text/plain' or 'text/plain: charset=utf-8')
   * @returns {boolean} true if we support this Content-Type (i.e., type/subtype)
   */
  static isSupportedType(value) {
    return (
      contentType.parse(value).type === 'text/plain' ||
      contentType.parse(value).type === 'text/markdown' ||
      contentType.parse(value).type === 'text/html' ||
      contentType.parse(value).type === 'application/json' ||
      contentType.parse(value).type === 'image/png' ||
      contentType.parse(value).type === 'image/jpeg' ||
      contentType.parse(value).type === 'image/gif' ||
      contentType.parse(value).type === 'image/webp'
    );
  }
}

module.exports.Fragment = Fragment;
