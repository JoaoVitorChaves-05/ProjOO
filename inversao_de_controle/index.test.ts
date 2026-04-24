import { PCD, University } from './index';
import { IObserver } from './interfaces';

describe('Inversão de Controle - PCD e University', () => {
    let pcd: PCD;
    let university1: University;
    let university2: University;

    beforeEach(() => {
        pcd = new PCD();
        university1 = new University();
        university2 = new University();
    });

    describe('PCD - Subject', () => {
        describe('Constructor', () => {
            it('deve criar uma instância com valores padrão (0)', () => {
                const newPcd = new PCD();
                expect(newPcd.getTemperature()).toBe(0);
                expect(newPcd.getHumidity()).toBe(0);
                expect(newPcd.getPH()).toBe(0);
            });

            it('deve criar uma instância com valores customizados', () => {
                const customPcd = new PCD(25, 60, 7);
                expect(customPcd.getTemperature()).toBe(25);
                expect(customPcd.getHumidity()).toBe(60);
                expect(customPcd.getPH()).toBe(7);
            });

            it('deve gerar um ID único para cada instância', () => {
                const pcd1 = new PCD();
                const pcd2 = new PCD();
                expect(pcd1.getId()).not.toBe(pcd2.getId());
            });

            it('deve gerar um ID entre 0 e 999', () => {
                for (let i = 0; i < 10; i++) {
                    const newPcd = new PCD();
                    expect(newPcd.getId()).toBeGreaterThanOrEqual(0);
                    expect(newPcd.getId()).toBeLessThan(1000);
                }
            });
        });

        describe('Getters', () => {
            it('deve retornar a temperatura corretamente', () => {
                const pcdTemp = new PCD(25, 0, 0);
                expect(pcdTemp.getTemperature()).toBe(25);
            });

            it('deve retornar a umidade corretamente', () => {
                const pcdHum = new PCD(0, 65, 0);
                expect(pcdHum.getHumidity()).toBe(65);
            });

            it('deve retornar o pH corretamente', () => {
                const pcdPH = new PCD(0, 0, 7.5);
                expect(pcdPH.getPH()).toBe(7.5);
            });

            it('deve retornar o ID', () => {
                expect(typeof pcd.getId()).toBe('number');
                expect(pcd.getId()).toBeGreaterThanOrEqual(0);
            });
        });

        describe('Setters e Notificação', () => {
            it('deve atualizar temperatura e notificar observadores', () => {
                const updateSpy = jest.spyOn(university1, 'updateTemperature');
                pcd.registerObserver(university1);

                pcd.setTemperature(28);

                expect(pcd.getTemperature()).toBe(28);
                expect(updateSpy).toHaveBeenCalledWith(28);
                expect(updateSpy).toHaveBeenCalledTimes(1);
            });

            it('deve atualizar umidade e notificar observadores', () => {
                const updateSpy = jest.spyOn(university1, 'updateHumidity');
                pcd.registerObserver(university1);

                pcd.setHumidity(70);

                expect(pcd.getHumidity()).toBe(70);
                expect(updateSpy).toHaveBeenCalledWith(70);
                expect(updateSpy).toHaveBeenCalledTimes(1);
            });

            it('deve atualizar pH e notificar observadores', () => {
                const updateSpy = jest.spyOn(university1, 'updatePH');
                pcd.registerObserver(university1);

                pcd.setPH(6.8);

                expect(pcd.getPH()).toBe(6.8);
                expect(updateSpy).toHaveBeenCalledWith(6.8);
                expect(updateSpy).toHaveBeenCalledTimes(1);
            });
        });

        describe('Registro de Observadores', () => {
            it('deve registrar um observador', () => {
                const updateSpy = jest.spyOn(university1, 'updateTemperature');
                pcd.registerObserver(university1);

                pcd.setTemperature(25);

                expect(updateSpy).toHaveBeenCalledWith(25);
            });

            it('deve registrar múltiplos observadores', () => {
                const spy1 = jest.spyOn(university1, 'updateTemperature');
                const spy2 = jest.spyOn(university2, 'updateTemperature');

                pcd.registerObserver(university1);
                pcd.registerObserver(university2);

                pcd.setTemperature(30);

                expect(spy1).toHaveBeenCalledWith(30);
                expect(spy2).toHaveBeenCalledWith(30);
            });

            it('deve registrar o mesmo observador múltiplas vezes', () => {
                const updateSpy = jest.spyOn(university1, 'updateTemperature');
                pcd.registerObserver(university1);
                pcd.registerObserver(university1);

                pcd.setTemperature(22);

                // Deve ser chamado 2 vezes pois foi registrado 2 vezes
                expect(updateSpy).toHaveBeenCalledTimes(2);
            });
        });

        describe('Remoção de Observadores', () => {
            it('deve remover um observador registrado', () => {
                const updateSpy = jest.spyOn(university1, 'updateTemperature');
                pcd.registerObserver(university1);
                pcd.removeObserver(university1);

                pcd.setTemperature(25);

                expect(updateSpy).not.toHaveBeenCalled();
            });

            it('deve permitir remover um observador e registrar outro', () => {
                const spy1 = jest.spyOn(university1, 'updateTemperature');
                const spy2 = jest.spyOn(university2, 'updateTemperature');

                pcd.registerObserver(university1);
                pcd.registerObserver(university2);
                pcd.removeObserver(university1);

                pcd.setTemperature(25);

                expect(spy1).not.toHaveBeenCalled();
                expect(spy2).toHaveBeenCalledWith(25);
            });

            it('deve não causar erro ao remover observador não registrado', () => {
                expect(() => {
                    pcd.removeObserver(university1);
                }).not.toThrow();
            });

            it('deve remover todas as instâncias se registrado múltiplas vezes', () => {
                const updateSpy = jest.spyOn(university1, 'updateTemperature');
                pcd.registerObserver(university1);
                pcd.registerObserver(university1);
                pcd.removeObserver(university1);

                pcd.setTemperature(25);

                // Remove TODAS as instâncias do observador
                expect(updateSpy).not.toHaveBeenCalled();
            });
        });

        describe('Notificação com múltiplos dados', () => {
            it('deve notificar múltiplos observadores com temperatura', () => {
                const spy1 = jest.spyOn(university1, 'updateTemperature');
                const spy2 = jest.spyOn(university2, 'updateTemperature');

                pcd.registerObserver(university1);
                pcd.registerObserver(university2);

                pcd.setTemperature(28);

                expect(spy1).toHaveBeenCalledWith(28);
                expect(spy2).toHaveBeenCalledWith(28);
            });

            it('deve notificar múltiplos observadores com umidade', () => {
                const spy1 = jest.spyOn(university1, 'updateHumidity');
                const spy2 = jest.spyOn(university2, 'updateHumidity');

                pcd.registerObserver(university1);
                pcd.registerObserver(university2);

                pcd.setHumidity(65);

                expect(spy1).toHaveBeenCalledWith(65);
                expect(spy2).toHaveBeenCalledWith(65);
            });

            it('deve notificar múltiplos observadores com pH', () => {
                const spy1 = jest.spyOn(university1, 'updatePH');
                const spy2 = jest.spyOn(university2, 'updatePH');

                pcd.registerObserver(university1);
                pcd.registerObserver(university2);

                pcd.setPH(7.2);

                expect(spy1).toHaveBeenCalledWith(7.2);
                expect(spy2).toHaveBeenCalledWith(7.2);
            });
        });
    });

    describe('University - Observer', () => {
        describe('Constructor', () => {
            it('deve criar uma instância com valores padrão (0)', () => {
                const university = new University();
                expect(university.getTemperature()).toBe(0);
                expect(university.getHumidity()).toBe(0);
                expect(university.getPH()).toBe(0);
            });

            it('deve gerar um ID único para cada instância', () => {
                const uni1 = new University();
                const uni2 = new University();
                expect(uni1.getId()).not.toBe(uni2.getId());
            });

            it('deve gerar um ID entre 0 e 999', () => {
                for (let i = 0; i < 10; i++) {
                    const university = new University();
                    expect(university.getId()).toBeGreaterThanOrEqual(0);
                    expect(university.getId()).toBeLessThan(1000);
                }
            });
        });

        describe('Getters', () => {
            it('deve retornar a temperatura corretamente', () => {
                university1.updateTemperature(25);
                expect(university1.getTemperature()).toBe(25);
            });

            it('deve retornar a umidade corretamente', () => {
                university1.updateHumidity(65);
                expect(university1.getHumidity()).toBe(65);
            });

            it('deve retornar o pH corretamente', () => {
                university1.updatePH(7.5);
                expect(university1.getPH()).toBe(7.5);
            });

            it('deve retornar o ID', () => {
                expect(typeof university1.getId()).toBe('number');
                expect(university1.getId()).toBeGreaterThanOrEqual(0);
            });
        });

        describe('Update Methods', () => {
            it('deve atualizar temperatura', () => {
                university1.updateTemperature(28);
                expect(university1.getTemperature()).toBe(28);
            });

            it('deve atualizar umidade', () => {
                university1.updateHumidity(70);
                expect(university1.getHumidity()).toBe(70);
            });

            it('deve atualizar pH', () => {
                university1.updatePH(6.8);
                expect(university1.getPH()).toBe(6.8);
            });

            it('deve suportar múltiplas atualizações', () => {
                university1.updateTemperature(25);
                university1.updateHumidity(60);
                university1.updatePH(7);

                expect(university1.getTemperature()).toBe(25);
                expect(university1.getHumidity()).toBe(60);
                expect(university1.getPH()).toBe(7);
            });

            it('deve permitir valores negativos', () => {
                university1.updateTemperature(-5);
                expect(university1.getTemperature()).toBe(-5);
            });

            it('deve permitir valores decimais', () => {
                university1.updateTemperature(25.5);
                university1.updateHumidity(65.7);
                university1.updatePH(7.3);

                expect(university1.getTemperature()).toBe(25.5);
                expect(university1.getHumidity()).toBe(65.7);
                expect(university1.getPH()).toBe(7.3);
            });
        });
    });

    describe('Integração - PCD com University', () => {
        it('deve permitir que University observe mudanças do PCD', () => {
            const pcd = new PCD(20, 50, 6.5);
            const university = new University();

            pcd.registerObserver(university);
            pcd.setTemperature(25);
            pcd.setHumidity(65);
            pcd.setPH(7);

            expect(university.getTemperature()).toBe(25);
            expect(university.getHumidity()).toBe(65);
            expect(university.getPH()).toBe(7);
        });

        it('deve permitir que múltiplas Universities observem o mesmo PCD', () => {
            const pcd = new PCD();
            const uni1 = new University();
            const uni2 = new University();
            const uni3 = new University();

            pcd.registerObserver(uni1);
            pcd.registerObserver(uni2);
            pcd.registerObserver(uni3);

            pcd.setTemperature(22);

            expect(uni1.getTemperature()).toBe(22);
            expect(uni2.getTemperature()).toBe(22);
            expect(uni3.getTemperature()).toBe(22);
        });

        it('deve permitir que uma University pare de observar um PCD', () => {
            const pcd = new PCD();
            const university = new University();

            pcd.registerObserver(university);
            pcd.setTemperature(25);
            expect(university.getTemperature()).toBe(25);

            pcd.removeObserver(university);
            pcd.setTemperature(30);
            expect(university.getTemperature()).toBe(25); // Não foi atualizado
        });

        it('deve garantir que observações de diferentes tipos de dados não se conflitem', () => {
            const pcd = new PCD();
            const uni1 = new University();
            const uni2 = new University();

            pcd.registerObserver(uni1);
            pcd.registerObserver(uni2);

            pcd.setTemperature(24);
            pcd.setHumidity(55);
            pcd.setPH(7.1);

            expect(uni1.getTemperature()).toBe(24);
            expect(uni1.getHumidity()).toBe(55);
            expect(uni1.getPH()).toBe(7.1);

            expect(uni2.getTemperature()).toBe(24);
            expect(uni2.getHumidity()).toBe(55);
            expect(uni2.getPH()).toBe(7.1);
        });
    });
});
