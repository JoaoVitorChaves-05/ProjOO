# Repositório de Projeto Orientado a Objetos - UNIFESP (2026)

Aluno: João Vitor Mâncio Chaves  
RA: 176.534

## Atividade 1 (07/04/2026)

A primeira atividade deste repositório apresenta um exercício em TypeScript utilizando os padrões de projeto Factory e Singleton, com foco em praticar conceitos de Programação Orientada a Objetos.

As próximas atividades serão adicionadas neste mesmo repositório.

## Atividade 2 (10/04/2026)

Implementação em TypeScript dos padrões de projeto Adapter e Proxy. Veja [adapter_e_proxy/index.ts](adapter_e_proxy/index.ts) e [adapter_e_proxy/interfaces.ts](adapter_e_proxy/interfaces.ts).

As implementações incluem um `SendSMSAdapter` (adapta `SomeAPI` para `ISender`) e um `MessageFactoryProxy` (validação e controle simples de criação).

## Atividade 3 (14/04/2026)

Implementação em TypeScript dos padrões de projeto Fachada (Facade) e Decorator. Veja [fachada_e_decorator/index.ts](fachada_e_decorator/index.ts) e [fachada_e_decorator/interfaces.ts](fachada_e_decorator/interfaces.ts).

As implementações incluem uma `HomeTheater` (fachada para operações de entretenimento) e os decoradores de bebida (`CafeExpresso`, `Cappuccino`, `Cha` com ingredientes adicionais).

Também foram adicionados testes unitários com Jest para validar os comportamentos principais da atividade. Veja [fachada_e_decorator/index.test.ts](fachada_e_decorator/index.test.ts).

## Atividade 4 (17/04/2026)

Implementação em TypeScript do padrão de projeto Observer. Veja [observers/index.ts](observers/index.ts) e [observers/interfaces.ts](observers/interfaces.ts).

As implementações incluem um `PCD_Subject` (sujeito que mantém e notifica estado de temperatura, umidade e pH) e um `UniversityObserver` (observador que recebe e registra as atualizações do sujeito).

Também foram adicionados testes unitários com Jest para validar os comportamentos principais da atividade, incluindo cenários com múltiplos PCDs e observadores. Veja [observers/index.test.ts](observers/index.test.ts).

----

Atualizado em 17/04/2026.