interface IHomeTheater {
    assistirFilme(): void;
    ouvirMusica(): void;
    ligarTV(): void;
    desligarTV(): void;
    ligarSom(): void;
    desligarSom(): void;
}

interface IBebida {
    getNomeIngredientes(): string[];
    getPreco(): number;
}

export type { IHomeTheater, IBebida };