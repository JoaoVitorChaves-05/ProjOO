import { PCD_Subject, UniversityObserver } from './index';
import type { Observer } from './interfaces';

describe('Observer - PCD_Subject', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('deve iniciar com valores padrao quando nao recebe parametros', () => {
    const subject = new PCD_Subject();

    expect(subject.getTemperature()).toBe(0);
    expect(subject.getHumidity()).toBe(0);
    expect(subject.getPH()).toBe(0);
  });

  test('deve notificar observadores cadastrados', () => {
    const subject = new PCD_Subject(20, 40, 7);
    const observer: Observer = {
      update: jest.fn(),
    };

    subject.addObserver(observer);
    subject.notifyObservers();

    expect(observer.update).toHaveBeenCalledTimes(1);
    expect(observer.update).toHaveBeenCalledWith(subject);
  });

  test('nao deve notificar observador removido', () => {
    const subject = new PCD_Subject(20, 40, 7);
    const observer: Observer = {
      update: jest.fn(),
    };

    subject.addObserver(observer);
    subject.removeObserver(observer);
    subject.notifyObservers();

    expect(observer.update).not.toHaveBeenCalled();
  });

  test('deve atualizar os dados e notificar automaticamente pelo intervalo', () => {
    const randomSpy = jest.spyOn(Math, 'random')
      .mockReturnValueOnce(0.99)
      .mockReturnValueOnce(0.12)
      .mockReturnValueOnce(0.34)
      .mockReturnValueOnce(0.56)
      .mockReturnValue(0.5);

    const subject = new PCD_Subject();
    const observer: Observer = {
      update: jest.fn(),
    };

    subject.addObserver(observer);

    jest.advanceTimersByTime(5000);

    expect(subject.getTemperature()).toBeCloseTo(12);
    expect(subject.getHumidity()).toBeCloseTo(34);
    expect(subject.getPH()).toBeCloseTo(7.84);
    expect(observer.update).toHaveBeenCalledTimes(1);

    randomSpy.mockRestore();
  });

  test('deve notificar corretamente com varios PCDs e observers', () => {
    const pcdA = new PCD_Subject(20, 30, 6);
    const pcdB = new PCD_Subject(21, 31, 7);
    const pcdC = new PCD_Subject(22, 32, 8);

    const observerA: Observer = { update: jest.fn() };
    const observerB: Observer = { update: jest.fn() };
    const observerC: Observer = { update: jest.fn() };

    pcdA.addObserver(observerA);
    pcdA.addObserver(observerC);

    pcdB.addObserver(observerA);
    pcdB.addObserver(observerB);

    pcdC.addObserver(observerB);

    pcdA.notifyObservers();
    pcdB.notifyObservers();
    pcdC.notifyObservers();

    expect(observerA.update).toHaveBeenCalledTimes(2);
    expect(observerA.update).toHaveBeenNthCalledWith(1, pcdA);
    expect(observerA.update).toHaveBeenNthCalledWith(2, pcdB);

    expect(observerB.update).toHaveBeenCalledTimes(2);
    expect(observerB.update).toHaveBeenNthCalledWith(1, pcdB);
    expect(observerB.update).toHaveBeenNthCalledWith(2, pcdC);

    expect(observerC.update).toHaveBeenCalledTimes(1);
    expect(observerC.update).toHaveBeenCalledWith(pcdA);
  });
});

describe('Observer - UniversityObserver', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('deve registrar no console os dados recebidos do subject', () => {
    const subject = new PCD_Subject(25.123, 60.567, 7.891);
    const observer = new UniversityObserver('UFABC', 'contato@ufabc.br');
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

    observer.update(subject);

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(
      `Observer UFABC received update from Subject ${subject.getId()}: Temperature: 25.12, Humidity: 60.57, pH: 7.89`
    );
  });
});
