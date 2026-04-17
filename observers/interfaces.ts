interface Subject {
    addObserver(observer: Observer): void;
    removeObserver(observer: Observer): void;
    notifyObservers(): void;

    getId(): number;
    getTemperature(): number;
    getHumidity(): number;
    getPH(): number;
}

interface Observer {
    update(subject: Subject): void;
}

export type { Subject, Observer };