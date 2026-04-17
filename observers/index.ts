import { Subject, Observer } from "./interfaces";

class PCD_Subject implements Subject {
    private observers: Observer[] = [];
    private id: number;

    private temperature: number;
    private humidity: number;
    private pH: number;

    constructor(temperature?: number, humidity?: number, pH?: number) {
        this.temperature = temperature || 0;
        this.humidity = humidity || 0;
        this.pH = pH || 0;
        this.id = Math.floor(Math.random() * 1000);

        setInterval(() => {
            this.setTemperature(Math.random() * 100);
            this.setHumidity(Math.random() * 100);
            this.setPH(Math.random() * 14);
            this.notifyObservers();
        }, 5000);
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
    }

    setHumidity(humidity: number) {
        this.humidity = humidity;
    }

    setPH(pH: number) {
        this.pH = pH;
    }

    addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    removeObserver(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(): void {
        for (const observer of this.observers) {
            observer.update(this);
        }
    }
}

class UniversityObserver implements Observer {
    private name: string;
    private email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    update(subject: Subject): void {
        console.log(`Observer ${this.name} received update from Subject ${subject.getId()}: Temperature: ${subject.getTemperature().toFixed(2)}, Humidity: ${subject.getHumidity().toFixed(2)}, pH: ${subject.getPH().toFixed(2)}`);
    }
}

export { PCD_Subject, UniversityObserver };