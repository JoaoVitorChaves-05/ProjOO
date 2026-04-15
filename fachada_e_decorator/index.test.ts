import { CafeExpresso, Cappuccino, Cha, Leite, Chantilly, Canela, CaldaDeChocolate, HomeTheater } from './index';

describe('Fachada - Home Theater', () => {
  test('Deve ligar a TV e o sistema de som ao assistir a um filme', () => {
    const homeTheater = new HomeTheater();
    jest.spyOn(homeTheater, 'ligarTV');
    jest.spyOn(homeTheater, 'ligarSom');

    homeTheater.assistirFilme();

    expect(homeTheater.ligarTV).toHaveBeenCalled();
    expect(homeTheater.ligarSom).toHaveBeenCalled();
    expect(homeTheater.ligarTV).toHaveBeenCalledTimes(1);
    expect(homeTheater.ligarSom).toHaveBeenCalledTimes(1);
  });

  test('Deve desligar a TV e o sistema de som ao desligar a TV', () => {
    const homeTheater = new HomeTheater();
    jest.spyOn(homeTheater, 'desligarTV');
    jest.spyOn(homeTheater, 'desligarSom');

    homeTheater.desligarTV();

    expect(homeTheater.desligarTV).toHaveBeenCalled();
    expect(homeTheater.desligarSom).toHaveBeenCalled();
  });
});

describe('Decorator Bebidas', () => {
  test('CafeExpresso com Leite, Canela e CaldaDeChocolate - ingredientes e preco', () => {
    const cafe = new CafeExpresso(new Leite(new Canela(new CaldaDeChocolate())));
    expect(cafe.getNomeIngredientes()).toEqual([
      'CaldaDeChocolate',
      'Canela',
      'Leite',
      'CafeExpresso',
    ]);
    expect(cafe.getPreco()).toBe(10);
  });

  test('Cappuccino com Leite e Chantilly - ingredientes e preco', () => {
    const cappuccino = new Cappuccino(new Leite(new Chantilly()));
    expect(cappuccino.getNomeIngredientes()).toEqual([
      'Chantilly',
      'Leite',
      'Cappuccino',
    ]);
    expect(cappuccino.getPreco()).toBe(12);
  });

  test('Cha com Leite - ingredientes e preco', () => {
    const cha = new Cha(new Leite());
    expect(cha.getNomeIngredientes()).toEqual(['Leite', 'Cha']);
    expect(cha.getPreco()).toBe(6);
  });
});
