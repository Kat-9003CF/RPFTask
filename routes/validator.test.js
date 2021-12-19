const validator = require('./validator');

test('Should equal true if username is valid', () => {
    expect(validator.isValidUsername('Kat')).toBe(true);
});

test('Should equal false if username empty', () => {
    expect(validator.isValidUsername()).toBe(false);
});

test('Should equal true if password longer than 8 characters', () => {
    expect(validator.isValidPass('123456789')).toBe(true);
});

test('Should equal false if password 8 characters or fewer', () => {
    expect(validator.isValidPass('12345678')).toBe(false);
});

test('Should equal true if email contains @', () => {
    expect(validator.isValidEmail('Kat@Kat.com')).toBe(true);
});

test('Should equal false if email does not contain @', () => {
    expect(validator.isValidEmail('Kat')).toBe(false);
});