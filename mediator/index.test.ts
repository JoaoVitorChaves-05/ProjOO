import { ConcreteColleague, ConcreteMediator } from "./index";

describe('Mediator Pattern - ConcreteMediator and ConcreteColleague', () => {
    let mediator: ConcreteMediator;
    let colleague1: ConcreteColleague;
    let colleague2: ConcreteColleague;

    beforeEach(() => {
        mediator = new ConcreteMediator();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('deve anunciar entrada e saida de colegas', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

        colleague1 = new ConcreteColleague('Ana', mediator);

        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith('Ana: Ana has joined the chat.');

        colleague2 = new ConcreteColleague('Bruno', mediator);

        expect(logSpy).toHaveBeenCalledTimes(3);
        expect(logSpy).toHaveBeenNthCalledWith(2, 'Bruno: Bruno has joined the chat.');
        expect(logSpy).toHaveBeenNthCalledWith(3, 'Bruno: Bruno has joined the chat.');

        logSpy.mockClear();

        colleague2.exit();

        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith('Bruno: Bruno has left the chat.');
    });

    test('deve enviar mensagens para todos os colegas', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

        colleague1 = new ConcreteColleague('Ana', mediator);
        colleague2 = new ConcreteColleague('Bruno', mediator);

        logSpy.mockClear();

        colleague1.send('Ola pessoal');

        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenNthCalledWith(1, 'Ana: Ola pessoal');
        expect(logSpy).toHaveBeenNthCalledWith(2, 'Ana: Ola pessoal');
    });

    test('nao deve enviar mensagens para colega removido', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

        colleague1 = new ConcreteColleague('Ana', mediator);
        colleague2 = new ConcreteColleague('Bruno', mediator);

        logSpy.mockClear();

        colleague2.exit();

        logSpy.mockClear();

        colleague1.send('Ping');

        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith('Ana: Ping');
    });

    test('deve incluir o remetente no broadcast', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

        colleague1 = new ConcreteColleague('Ana', mediator);
        colleague2 = new ConcreteColleague('Bruno', mediator);
        const colleague3 = new ConcreteColleague('Carla', mediator);

        logSpy.mockClear();

        colleague2.send('Mensagem geral');

        expect(logSpy).toHaveBeenCalledTimes(3);
        expect(logSpy).toHaveBeenNthCalledWith(1, 'Bruno: Mensagem geral');
        expect(logSpy).toHaveBeenNthCalledWith(2, 'Bruno: Mensagem geral');
        expect(logSpy).toHaveBeenNthCalledWith(3, 'Bruno: Mensagem geral');

        colleague3.exit();
    });

    test('deve permitir reentrada de colega apos saida', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

        colleague1 = new ConcreteColleague('Ana', mediator);
        colleague2 = new ConcreteColleague('Bruno', mediator);

        logSpy.mockClear();

        colleague2.exit();

        logSpy.mockClear();

        const colleague2Rejoin = new ConcreteColleague('Bruno', mediator);

        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenNthCalledWith(1, 'Bruno: Bruno has joined the chat.');
        expect(logSpy).toHaveBeenNthCalledWith(2, 'Bruno: Bruno has joined the chat.');

        colleague2Rejoin.exit();
    });
});