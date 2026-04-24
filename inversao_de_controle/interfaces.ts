interface ISubject {
    registerObserver(observer: IObserver): void;
    removeObserver(observer: IObserver): void;
    notifyObservers(data: Data): void;

    getTemperature(): number;
    getHumidity(): number;
    getPH(): number;

    setTemperature(temperature: number): void;
    setHumidity(humidity: number): void;
    setPH(pH: number): void;
}

interface IObserver {
    updateTemperature(temperature: number): void;
    updateHumidity(humidity: number): void;
    updatePH(pH: number): void;

    getTemperature(): number;
    getHumidity(): number;
    getPH(): number;
}

interface ILogger {
    log(message: string): void;
}

interface Data {
    data_type: 'temperature' | 'humidity' | 'pH';
    value: number;
}

export type { ISubject, IObserver, Data };