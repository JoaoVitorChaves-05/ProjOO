interface MessagerMediator {
    sendMessage(message: string, sender: Colleague): void;
    addColleague(colleague: Colleague): void;
    removeColleague(colleague: Colleague): void;
}

interface Colleague {
    name: string;
    mediator: MessagerMediator;
    send(message: string): void;
    receive(message: string, sender: Colleague): void;
    exit(): void;
}

export type { MessagerMediator, Colleague };