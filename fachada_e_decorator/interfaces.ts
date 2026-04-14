interface IHomeTheater {
    assistirFilme(): void;
    ouvirMusica(): void;
    ligarTV(): void;
    desligarTV(): void;
}

interface IBebida {
    getNomeIngredientes(): string[];
    getPreco(): number;
}

interface CafeExpresso {
    prepararCafe(): void;
}

interface Cappuccino {
    prepararCappuccino(): void;
}

interface Cha {
    prepararCha(): void;
}

interface Leite {
    prepararLeite(): void;
}

interface Chantilly {
    prepararChantilly(): void;
}

interface Canela {
    prepararCanela(): void;
}

interface CaldaDeChocolate {
    prepararCaldaDeChocolate(): void;
}

export type { IHomeTheater, IBebida, CafeExpresso, Cappuccino, Cha, Leite, Chantilly, Canela, CaldaDeChocolate };