import { IBebida, IHomeTheater } from "./interfaces";

class HomeTheater implements IHomeTheater {
    assistirFilme(): void {
        this.ligarTV();
        this.ligarSom();
        console.log("Preparando o ambiente para assistir filme...");
        console.log("Ajustando o som...");
        console.log("Diminuindo as luzes...");
        console.log("Filme pronto para ser assistido!");
    }

    ouvirMusica(): void {
        this.ligarSom();
        console.log("Ajustando o volume...");
        console.log("Música pronta para ser ouvida!");
    }

    ligarTV(): void {
        console.log("Ligando TV...");
    }

    desligarTV(): void {
        this.desligarSom();
        console.log("Desligando TV...");
    }

    ligarSom(): void {
        console.log("Ligando o sistema de som...");
    }

    desligarSom(): void {
        console.log("Desligando o sistema de som...");
    }
}

class BebidaDecorator implements IBebida {
    protected ingrediente: IBebida;
    public bebida: string[];

    constructor(ingrediente?: IBebida) {
        this.ingrediente = ingrediente as IBebida;
        this.bebida = [];
        if (ingrediente) {
            this.bebida = [...ingrediente.getNomeIngredientes()];
        }
        this.bebida.push(this.constructor.name);
    }

    getNomeIngredientes(): string[] {
        return this.bebida;
    }

    getPreco(): number {
        let preco = 0;
        for (const ingrediente of this.bebida) {
            switch (ingrediente) {
                case "CafeExpresso":
                    preco += 5;
                    break;
                case "Cappuccino":
                    preco += 7;
                    break;
                case "Cha":
                    preco += 4;
                    break;
                case "Leite":
                    preco += 2;
                    break;
                case "Chantilly":
                    preco += 3;
                    break;
                case "Canela":
                    preco += 1;
                    break;
                case "CaldaDeChocolate":
                    preco += 2;
                    break;
                default:
                    break;
            }
        }
        return preco;
    }
}

class CafeExpresso extends BebidaDecorator {
    constructor(ingrediente?: IBebida) {
        super(ingrediente);
    }
}

class Cappuccino extends BebidaDecorator {
    constructor(ingrediente?: IBebida) {
        super(ingrediente);
    }
}

class Cha extends BebidaDecorator {
    constructor(ingrediente?: IBebida) {
        super(ingrediente);
    }
}

class Leite extends BebidaDecorator {
    constructor(ingrediente?: IBebida) {
        super(ingrediente);
    }
}

class Chantilly extends BebidaDecorator {
    constructor(ingrediente?: IBebida) {
        super(ingrediente);
    }
}

class Canela extends BebidaDecorator {
    constructor(ingrediente?: IBebida) {
        super(ingrediente);
    }
}

class CaldaDeChocolate extends BebidaDecorator {
    constructor(ingrediente?: IBebida) {
        super(ingrediente);
    }
}

export { CafeExpresso, Cappuccino, Cha, Leite, Chantilly, Canela, CaldaDeChocolate, HomeTheater };