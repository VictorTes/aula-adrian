const soma = require('../soma.js')

test('soma de 2 + 3 deve ser 5', () => {
    expect(soma(2,3)).toBe(5);
});

//fazer outros 2 testes com outros valores