import { MessagerMediator, Colleague } from "./interfaces";

class ConcreteMediator implements MessagerMediator {
    private colleagues: Colleague[] = [];

    sendMessage(message: string, sender: Colleague): void {
        for (const c of this.colleagues) {
            c.receive(message, sender);
        }
    }

    addColleague(colleague: Colleague): void {
        this.colleagues.push(colleague);
        this.sendMessage(`${colleague.name} has joined the chat.`, colleague);
    }

    removeColleague(colleague: Colleague): void {
        this.colleagues = this.colleagues.filter(c => c !== colleague);
        this.sendMessage(`${colleague.name} has left the chat.`, colleague);
    }
}

class ConcreteColleague implements Colleague {
    name: string;
    mediator: MessagerMediator;

    constructor(name: string, mediator: MessagerMediator) {
        this.name = name;
        this.mediator = mediator;
        this.mediator.addColleague(this);
    }

    send(message: string): void {
        this.mediator.sendMessage(message, this);
    }

    receive(message: string, sender: Colleague): void {
        console.log(`${sender.name}: ${message}`);
    }

    exit(): void {
        this.mediator.removeColleague(this);
    }
}

export { ConcreteMediator, ConcreteColleague };