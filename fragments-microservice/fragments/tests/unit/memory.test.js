const Memory = require('../../src/model/data/memory/index.js');

describe('memory', () => {
  beforeEach(() => {
    Memory.reset();
  });

  describe('writeFragment()', () => {
    test('expects two keys in fragment object', () => {
      expect(() => Memory.writeFragment()).toThrow();
      expect(() => Memory.writeFragment({})).toThrow();
      expect(() => Memory.writeFragment({ ownerId: 'a' })).toThrow();
      expect(() =>
        Memory.writeFragment({
          ownerId: 'a',
          data: {
            value: 123,
          },
        })
      ).toThrow();
    });

    test('returns nothing and resolves when successful at writing', async () => {
      const result = await Memory.writeFragment({
        ownerId: 'a',
        id: 'b',
        data: { value: 123 },
      });
      expect(result).toBe(undefined);

      await expect(
        Memory.writeFragment({
          ownerId: 'a',
          id: 'c',
          data: { value: 123 },
        })
      ).resolves.toBe(undefined);
    });
  });

  describe('readFragment()', () => {
    test('returns the fragment object of the passed in ownerID and id', async () => {
      let fragment = {
        ownerId: 'a',
        id: 'b',
        data: { value: 123 },
      };

      await Memory.writeFragment(fragment);
      const result = await Memory.readFragment('a', 'b');
      expect(result).toEqual(fragment);
    });

    test('id not existing in db returns nothing', async () => {
      await Memory.writeFragment({
        ownerId: 'a',
        id: 'b',
        data: { value: 123 },
      });
      const result = await Memory.readFragment('a', 'd');
      expect(result).toBe(undefined);

      const result2 = await Memory.readFragment('b', 'b');
      expect(result2).toBe(undefined);
    });
  });

  describe('writeFragmentData()', () => {
    test('expects two keys to be passed in', async () => {
      expect(() => Memory.writeFragmentData('a')).toThrow();
      expect(() => Memory.writeFragmentData('a', 123)).toThrow();
    });

    test('returns nothing and resolves when successful at writing', async () => {
      const result = await Memory.writeFragmentData('a', 'b', { value: 123 });
      expect(result).toBe(undefined);

      await expect(Memory.writeFragmentData('a', 'c', { value: 123 })).resolves.toBe(undefined);
    });
  });

  describe('readFragmentData()', () => {
    test('returns the data of a fragment with the passed in ownerID and id', async () => {
      await Memory.writeFragmentData('a', 'b', { value: 123 });
      const result = await Memory.readFragmentData('a', 'b');
      expect(result).toEqual({ value: 123 });
    });

    test('ownerID or id not in db returns nothing', async () => {
      await Memory.writeFragmentData('a', 'b', { value: 123 });
      const result = await Memory.readFragmentData('a', 'd');
      expect(result).toBe(undefined);

      const result2 = await Memory.readFragmentData('b', 'b');
      expect(result2).toBe(undefined);
    });
  });

  describe('listFragments()', () => {
    test('returns an array of fragment ids when existing ownerID passed in', async () => {
      await Memory.writeFragment({
        ownerId: 'a',
        id: 'b',
        data: { value: 123 },
      });
      await Memory.writeFragment({
        ownerId: 'a',
        id: 'c',
        data: { value: 123 },
      });
      const result = await Memory.listFragments('a');
      expect(result).toEqual(['b', 'c']);
    });

    test('ownerID not in db resolves and returns an empty array', async () => {
      await Memory.writeFragment({
        ownerId: 'a',
        id: 'b',
        data: { value: 123 },
      });
      await Memory.writeFragment({
        ownerId: 'a',
        id: 'c',
        data: { value: 123 },
      });
      await expect(Memory.listFragments('b')).resolves.toEqual([]);
    });

    test('ownerID not in db and expands set to true returns empty array', () => {
      return expect(Memory.listFragments('b', true)).resolves.toEqual([]);
    });
  });

  describe('deleteFragment()', () => {
    test('returns nothing and resolves when successful at deleting', async () => {
      await Memory.writeFragment({
        ownerId: 'a',
        id: 'b',
        data: { value: 123 },
      });

      await Memory.writeFragmentData('a', 'b', { value: 123 });

      await expect(Memory.deleteFragment('a', 'b')).resolves.toEqual([undefined, undefined]);
    });

    test('ownerID or id not in db rejects and throws', async () => {
      await Memory.writeFragment({
        ownerId: 'a',
        id: 'b',
        data: { value: 123 },
      });
      await Memory.writeFragment({
        ownerId: 'a',
        id: 'c',
        data: { value: 123 },
      });
      await expect(Memory.deleteFragment('a', 'd')).rejects.toThrow();

      await expect(Memory.deleteFragment('b', 'b')).rejects.toThrow();
    });
  });
});
