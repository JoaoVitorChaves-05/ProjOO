import { ISubject, IObserver, Data } from "./interfaces";

class PCD implements ISubject {
    private observers: IObserver[] = [];
    private id: number;
    private temperature: number;
    private humidity: number;
    private pH: number;

    constructor(temperature?: number, humidity?: number, pH?: number) {
        this.temperature = temperature || 0;
        this.humidity = humidity || 0;
        this.pH = pH || 0;
        this.id = Math.floor(Math.random() * 1000);
    }

    getId() {
        return this.id;
    }

    getTemperature() {
        return this.temperature;
    }

    getHumidity() {
        return this.humidity;
    }

    getPH() {
        return this.pH;
    }

    setTemperature(temperature: number) {
        this.temperature = temperature;
        this.notifyObservers({ data_type: 'temperature', value: temperature });
    }

    setHumidity(humidity: number) {
        this.humidity = humidity;
        this.notifyObservers({ data_type: 'humidity', value: humidity });
    }

    setPH(pH: number) {
        this.pH = pH;
        this.notifyObservers({ data_type: 'pH', value: pH });
    }

    registerObserver(observer: IObserver): void {
        this.observers.push(observer);
    }

    removeObserver(observer: IObserver): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    /*
        * Notifica os observadores com base no tipo de dado atualizado
        De acordo com o princípio de inversão de controle, o sujeito (PCD) 
        é responsável por notificar os observadores sobre as mudanças em seus dados. 
        O método notifyObservers é chamado sempre que um dos dados 
        (temperatura, umidade ou pH) é atualizado, e ele passa um objeto Data contendo o 
        tipo de dado atualizado e seu valor para os observadores registrados. 
        Os observadores, por sua vez, implementam a lógica para lidar com essas notificações
         e atualizar suas próprias informações conforme necessário.

        Dessa forma, o PCD mantém o controle sobre quando e como os observadores são notificados,
         enquanto os observadores dependem do PCD para receber as atualizações, 
         seguindo o princípio de inversão de controle.
    */
    notifyObservers(data: Data): void {
        for (const observer of this.observers) {
            switch (data.data_type) {
                case 'temperature':
                    observer.updateTemperature(data.value);
                    break;
                case 'humidity':
                    observer.updateHumidity(data.value);
                    break;
                case 'pH':
                    observer.updatePH(data.value);
                    break;
            }
        }
    }
}

class University implements IObserver {
    private id: number
    private temperature: number;
    private humidity: number;
    private pH: number;

    constructor() {
        this.temperature = 0;
        this.humidity = 0;
        this.pH = 0;
        this.id = Math.floor(Math.random() * 1000);
    }

    getId() {
        return this.id;
    }

    getTemperature() {
        return this.temperature;
    }

    getHumidity() {
        return this.humidity;
    }

    getPH() {
        return this.pH;
    }

    updateTemperature(temperature: number): void {
        this.temperature = temperature;
        console.log(`University ${this.id} updated temperature: ${temperature}`);
    }

    updateHumidity(humidity: number): void {
        this.humidity = humidity;
        console.log(`University ${this.id} updated humidity: ${humidity}`);
    }

    updatePH(pH: number): void {
        this.pH = pH;
        console.log(`University ${this.id} updated pH: ${pH}`);
    }

}

export { PCD, University };