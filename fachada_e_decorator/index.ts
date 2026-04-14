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

    constructor(ingrediente: IBebida) {
        this.ingrediente = ingrediente;
        this.bebida = [];
        this.bebida.push(ingrediente.constructor.name);
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
    constructor(ingrediente: IBebida) {
        super(ingrediente);
        //this.bebida.push("CafeExpresso");
    }
}

class Cappuccino extends BebidaDecorator {
    constructor(ingrediente: IBebida) {
        super(ingrediente);
        //this.bebida.push("Cappuccino");
    }
}

class Cha extends BebidaDecorator {
    constructor(ingrediente: IBebida) {
        super(ingrediente);
        //this.bebida.push("Cha");
    }
}

class Leite extends BebidaDecorator {
    constructor(ingrediente: IBebida) {
        super(ingrediente);
        //this.bebida.push("Leite");
    }
}

class Chantilly extends BebidaDecorator {
    constructor(ingrediente: IBebida) {
        super(ingrediente);
        //this.bebida.push("Chantilly");
    }
}

class Canela extends BebidaDecorator {
    constructor(ingrediente: IBebida) {
        super(ingrediente);
        //this.bebida.push("Canela");
    }
}

class CaldaDeChocolate extends BebidaDecorator {
    constructor(ingrediente: IBebida) {
        super(ingrediente);
        //this.bebida.push("CaldaDeChocolate");
    }
}


function main() {
    // Padrão de projeto fachada: O cliente interage com uma interface simplificada (HomeTheater) que oculta a complexidade dos subsistemas (TV, Som, Luzes).
    const homeTheater = new HomeTheater();

    homeTheater.assistirFilme();
    console.log("\n");
    homeTheater.ouvirMusica();

    // Padrão de projeto decorator: O cliente pode adicionar ingredientes a uma bebida de forma flexível, sem alterar a estrutura original da bebida.
    const cafe = new CafeExpresso(new Leite(new Canela(new CaldaDeChocolate())));
    const cappuccino = new Cappuccino(new Leite(new Chantilly()));
    const cha = new Cha(new Leite());


}

main();