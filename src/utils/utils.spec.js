const colorGenerator = require("./utils");

describe('colorGenerator', () => {
    test('generates an array', () => {
        expect(colorGenerator([])).toEqual([]);
    })
    test('generates a single colour when passed one item', () => {
        expect(colorGenerator(['burglary'])).toHaveLength(1)
    })
    test('generates multiple colours when passed multiple items', () => {
        expect(colorGenerator(['burglary', 'violent crime'])).toHaveLength(2)
    })
})

