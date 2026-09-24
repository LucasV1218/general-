# PROMPT MASTER — DESENVOLVIMENTO DO JOGO GENERAL

> **Objetivo deste documento:** servir como especificação completa para uma IA de desenvolvimento (Claude, Claude Code, Cursor, etc.) ou como briefing técnico/visual para Figma/Figma Make.
>
> **Prioridade:** não apenas criar uma interface bonita. O resultado deve ser um sistema funcional, coerente com os requisitos, com regras de negócio explícitas, código organizado e possibilidade de evolução futura.

---

# 1. PAPEL DA IA

Atue como um **desenvolvedor full-stack front-end experiente, analista de requisitos, arquiteto de software e designer de interfaces**.

Você deverá transformar esta especificação em uma aplicação funcional chamada **GENERAL**, um jogo de dados para navegador.

Não faça alterações arbitrárias nas regras do jogo.

Antes de implementar:

1. interprete os requisitos;
2. identifique possíveis ambiguidades;
3. adote as decisões documentadas neste arquivo;
4. organize a arquitetura;
5. implemente;
6. valide as regras;
7. revise a interface;
8. faça testes funcionais;
9. corrija problemas encontrados.

Não entregue apenas uma demonstração visual.

O jogo precisa funcionar de verdade.

---

# 2. CONTEXTO DO PROJETO

O projeto é um exercício prático de desenvolvimento de sistemas.

O objetivo é desenvolver uma versão digital do jogo tradicional **General**, executada diretamente no navegador.

Tecnologias obrigatórias:

- HTML
- CSS
- JavaScript

Não utilizar:

- backend;
- banco de dados;
- servidor;
- frameworks obrigatórios;
- bibliotecas externas desnecessárias.

A aplicação deve funcionar localmente abrindo o `index.html`.

---

# 3. DECISÃO IMPORTANTE SOBRE O NÚMERO DE RODADAS

O enunciado original apresenta **11 categorias de pontuação**, porém em determinado exemplo menciona 10 rodadas.

Para eliminar essa inconsistência, adote obrigatoriamente:

> **11 categorias = 11 rodadas.**

Cada rodada corresponde a uma categoria.

Cada categoria pode ser utilizada somente uma vez durante a partida.

Portanto:

```text
11 categorias
      ↓
11 rodadas
      ↓
1 categoria preenchida por rodada
      ↓
partida encerrada
```

Não implemente 10 rodadas.

---

# 4. OBJETIVO DO JOGO

O jogador deverá:

1. informar seu nome;
2. iniciar uma partida;
3. lançar cinco dados;
4. realizar até três lançamentos por rodada;
5. analisar os dados;
6. escolher uma categoria disponível;
7. receber a pontuação correspondente;
8. avançar para a próxima rodada;
9. repetir o processo até preencher todas as categorias;
10. visualizar a pontuação final.

---

# 5. REQUISITOS FUNCIONAIS

Implemente obrigatoriamente os seguintes requisitos.

## RF01 — Iniciar partida

O sistema deverá permitir iniciar uma nova partida.

O jogador deverá informar seu nome.

Caso o nome esteja vazio, o sistema deverá impedir o início e apresentar uma mensagem clara.

---

## RF02 — Identificação do jogador

O sistema deverá armazenar e exibir o nome do jogador durante a partida.

---

## RF03 — Criar rodada

Ao iniciar uma partida, o sistema deverá iniciar a rodada 1 de 11.

---

## RF04 — Lançar dados

O sistema deverá gerar cinco valores aleatórios.

Cada dado deverá possuir um valor entre:

```text
1
2
3
4
5
6
```

---

## RF05 — Controlar lançamentos

Cada rodada poderá possuir no máximo:

```text
3 lançamentos
```

O sistema deverá impedir um quarto lançamento.

O contador deverá apresentar:

```text
0 / 3
1 / 3
2 / 3
3 / 3
```

conforme o estado da rodada.

---

## RF06 — Exibir dados

Os cinco dados deverão ser apresentados visualmente.

A interface deverá deixar claro qual valor pertence a cada dado.

---

## RF07 — Identificar combinações

O sistema deverá identificar automaticamente combinações especiais:

- Trinca;
- Quadra;
- Full House;
- Sequência;
- General.

A combinação detectada deverá aparecer na interface.

---

## RF08 — Calcular pontuação

O sistema deverá calcular automaticamente a pontuação possível de cada categoria com base nos dados atuais.

---

## RF09 — Selecionar categoria

O jogador deverá conseguir selecionar uma categoria disponível.

---

## RF10 — Bloquear categoria utilizada

Uma categoria já utilizada deverá permanecer bloqueada durante o restante da partida.

---

## RF11 — Registrar pontuação

Após escolher uma categoria, a pontuação deverá ser registrada no placar.

---

## RF12 — Atualizar pontuação total

O sistema deverá atualizar automaticamente o total acumulado.

---

## RF13 — Avançar rodada

Depois de registrar uma categoria:

```text
pontuação registrada
        ↓
lançamentos zerados
        ↓
nova rodada
```

---

## RF14 — Finalizar partida

Quando todas as 11 categorias forem utilizadas, a partida deverá ser encerrada.

---

## RF15 — Exibir resultado final

Ao finalizar a partida, apresentar:

- nome do jogador;
- pontuação de cada categoria;
- pontuação total;
- mensagem de encerramento.

---

## RF16 — Reiniciar partida

O jogador deverá poder iniciar uma nova partida.

Ao reiniciar:

- rodada volta para 1;
- pontuação volta para 0;
- categorias ficam disponíveis;
- lançamentos são zerados;
- dados são limpos;
- estado anterior é descartado.

---

# 6. REQUISITOS NÃO FUNCIONAIS

## RNF01 — Responsividade

A interface deverá funcionar em:

- desktop;
- notebook;
- tablet;
- smartphone.

---

## RNF02 — Usabilidade

O jogador deverá compreender imediatamente:

- em qual rodada está;
- quantos lançamentos realizou;
- quais categorias estão disponíveis;
- qual pontuação possui;
- qual ação deve realizar.

---

## RNF03 — Acessibilidade

Utilizar:

- labels;
- foco visual;
- contraste adequado;
- botões identificáveis;
- mensagens de status;
- textos alternativos ou `aria-label` quando necessário.

Não depender exclusivamente de cor para comunicar estado.

---

## RNF04 — Desempenho

A geração dos dados e os cálculos deverão ocorrer imediatamente, sem chamadas externas.

---

## RNF05 — Compatibilidade

A aplicação deverá funcionar nos navegadores modernos:

- Google Chrome;
- Microsoft Edge;
- Mozilla Firefox.

---

## RNF06 — Organização

Separar:

```text
HTML
CSS
JavaScript
```

Não colocar toda a aplicação dentro de um único arquivo.

---

## RNF07 — Manutenibilidade

O código deverá possuir:

- funções pequenas;
- nomes significativos;
- responsabilidades separadas;
- constantes centralizadas;
- comentários em português nos principais trechos;
- baixa duplicação.

---

# 7. REGRAS DE NEGÓCIO

Estas regras são obrigatórias.

## RN01 — Quantidade de dados

Cada rodada utiliza exatamente cinco dados.

---

## RN02 — Limite de lançamentos

Cada rodada permite no máximo três lançamentos.

---

## RN03 — Quantidade de rodadas

A partida possui 11 rodadas.

---

## RN04 — Categorias únicas

Cada categoria pode ser utilizada apenas uma vez.

---

## RN05 — Lançamento obrigatório

O jogador precisa realizar pelo menos um lançamento antes de registrar uma categoria.

---

## RN06 — Pontuação inválida

Se a combinação exigida pela categoria não existir, a categoria poderá ser registrada com:

```text
0 pontos
```

---

## RN07 — Ás

Soma todos os dados com valor 1.

Exemplo:

```text
1 1 2 4 6

Pontuação = 2
```

---

## RN08 — Duque

Soma todos os dados com valor 2.

Exemplo:

```text
2 2 3 4 6

Pontuação = 4
```

---

## RN09 — Terno

Soma todos os dados com valor 3.

---

## RN10 — Quadra / valor 4

Soma todos os dados com valor 4.

Importante:

Esta categoria representa a **face 4**, não a combinação de quatro dados iguais.

---

## RN11 — Quina

Soma todos os dados com valor 5.

---

## RN12 — Sena

Soma todos os dados com valor 6.

---

## RN13 — Trinca

Trinca ocorre quando existem pelo menos três dados iguais.

Neste projeto:

> A pontuação da Trinca será a soma dos cinco dados.

Exemplo:

```text
3 3 3 2 5

3 + 3 + 3 + 2 + 5 = 16
```

---

## RN14 — Quadra

Quadra ocorre quando existem pelo menos quatro dados iguais.

A pontuação será a soma dos cinco dados.

Exemplo:

```text
4 4 4 4 2

4 + 4 + 4 + 4 + 2 = 18
```

---

## RN15 — Full House

Full House ocorre quando existem:

```text
uma trinca + um par
```

Exemplo:

```text
2 2 2 5 5
```

Pontuação:

```text
25 pontos
```

---

## RN16 — Sequência

Sequência válida:

```text
1 2 3 4 5
```

ou:

```text
2 3 4 5 6
```

Pontuação:

```text
30 pontos
```

A ordem em que os dados aparecem não importa.

Exemplo:

```text
5 2 4 1 3
```

também é sequência.

---

## RN17 — General

General ocorre quando os cinco dados são iguais.

Exemplo:

```text
6 6 6 6 6
```

Pontuação:

```text
50 pontos
```

---

## RN18 — Registro de categoria

Depois que uma categoria for selecionada:

- registrar pontuação;
- bloquear categoria;
- atualizar total;
- iniciar próxima rodada.

---

## RN19 — Final da partida

Quando as 11 categorias estiverem preenchidas:

```text
partida = finalizada
```

O botão de lançamento deverá ser bloqueado.

---

## RN20 — Pontuação final

A pontuação final será:

```text
soma das 11 categorias
```

---

# 8. TABELA OFICIAL DE PONTUAÇÃO

| Categoria | Critério | Pontuação |
|---|---|---:|
| Ás | Soma dos dados 1 | Soma |
| Duque | Soma dos dados 2 | Soma |
| Terno | Soma dos dados 3 | Soma |
| Quadra (valor 4) | Soma dos dados 4 | Soma |
| Quina | Soma dos dados 5 | Soma |
| Sena | Soma dos dados 6 | Soma |
| Trinca | Pelo menos 3 iguais | Soma dos 5 dados |
| Quadra (4 iguais) | Pelo menos 4 iguais | Soma dos 5 dados |
| Full House | Trinca + par | 25 |
| Sequência | 1-2-3-4-5 ou 2-3-4-5-6 | 30 |
| General | 5 iguais | 50 |

---

# 9. HIERARQUIA VISUAL

A interface deve deixar o estado do jogo óbvio.

Prioridade visual:

```text
1. Dados
2. Rodada / lançamentos
3. Ação principal
4. Categorias
5. Pontuação total
6. Mensagens
```

O usuário não deve precisar procurar a informação principal.

---

# 10. DIREÇÃO VISUAL

Criar uma interface moderna, limpa e com aparência de jogo casual premium.

Não criar algo com aparência de:

- sistema empresarial;
- formulário escolar;
- dashboard corporativo;
- site genérico de cassino.

A identidade deve transmitir:

- jogo;
- precisão;
- diversão;
- simplicidade;
- confiança.

---

# 11. LAYOUT

## Desktop

Utilizar estrutura semelhante a:

```text
┌─────────────────────────────────────────────────────────────┐
│ GENERAL                              JOGADOR: Lucas         │
│ Jogo de dados para um jogador                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  RODADA 5/11      LANÇAMENTOS 2/3       PONTOS 42          │
│                                                             │
│       ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                  │
│       │  ⚄ │ │  ⚁ │ │  ⚅ │ │  ⚅ │ │  ⚃ │                  │
│       └────┘ └────┘ └────┘ └────┘ └────┘                  │
│                                                             │
│                [ LANÇAR DADOS ]                             │
│                                                             │
│  Trinca identificada                                       │
│                                                             │
├───────────────────────────────┬─────────────────────────────┤
│                               │ CATEGORIAS                  │
│                               │                             │
│                               │ Ás              4           │
│                               │ Duque           6           │
│                               │ Terno           —           │
│                               │ Trinca          0           │
│                               │ Full House      0           │
│                               │ Sequência       30          │
│                               │ General         0           │
│                               │                             │
│                               │ TOTAL           42          │
└───────────────────────────────┴─────────────────────────────┘
```

---

# 12. CABEÇALHO

O cabeçalho deverá apresentar:

- nome GENERAL;
- subtítulo;
- identificação do jogador;
- botão Novo Jogo.

Não sobrecarregar o cabeçalho.

---

# 13. ÁREA DOS DADOS

Os cinco dados são o elemento central da aplicação.

Cada dado deve:

- possuir tamanho suficiente para leitura;
- possuir contraste alto;
- possuir indicação clara do valor;
- ter aparência consistente;
- possuir animação discreta quando lançado, se implementada.

Não utilizar animações excessivas.

---

# 14. CONTROLES

Botão principal:

```text
LANÇAR DADOS
```

Botão secundário:

```text
NOVO JOGO
```

Quando o limite de três lançamentos for atingido:

```text
LANÇAR DADOS
```

deve ficar desabilitado.

---

# 15. CATEGORIAS

Cada categoria deve funcionar como uma opção selecionável.

Estado disponível:

- destaque sutil;
- cursor de ação;
- pontuação possível visível.

Estado utilizado:

- visualmente bloqueado;
- indicação “Registrada”;
- não pode ser selecionado novamente.

Estado atual:

- destaque visual;
- pontuação calculada claramente apresentada.

---

# 16. PONTUAÇÃO POSSÍVEL

Após os dados serem lançados, o sistema deverá mostrar a pontuação possível em cada categoria.

Exemplo:

```text
Ás
Pontuação possível: 2

Trinca
Pontuação possível: 16

Full House
Pontuação possível: 0

General
Pontuação possível: 0
```

Isso permite que o jogador tome a decisão de qual categoria utilizar.

---

# 17. MENSAGENS DE STATUS

Criar mensagens claras.

Exemplos:

```text
Informe o nome do jogador antes de iniciar.
```

```text
Partida iniciada.
Clique em “Lançar Dados” para começar.
```

```text
Lançamento 2 de 3.
```

```text
General identificada!
```

```text
Essa categoria já foi utilizada.
```

```text
Partida encerrada.
Você terminou com 87 pontos.
```

Evitar mensagens técnicas para o usuário.

Errado:

```text
undefined category error
```

Correto:

```text
Não foi possível selecionar essa categoria.
```

---

# 18. RESPONSIVIDADE

## Desktop

Usar duas áreas principais:

```text
Jogo | Placar
```

## Tablet

Reduzir espaçamentos e manter:

```text
Jogo
Placar
```

## Smartphone

Organizar verticalmente:

```text
GENERAL

Jogador

Rodada
Lançamentos
Pontuação

Dados

Lançar Dados

Categorias

Total
```

Os cinco dados devem continuar visíveis sem quebrar o layout.

---

# 19. ARQUITETURA DO JAVASCRIPT

Utilizar um estado centralizado.

Exemplo conceitual:

```javascript
const estado = {
    jogador: "",
    rodada: 0,
    lancamentos: 0,
    dados: [],
    pontuacoes: {},
    partidaIniciada: false,
    partidaFinalizada: false
};
```

Centralizar as configurações:

```javascript
const CONFIG = {
    QUANTIDADE_DADOS: 5,
    MAX_LANCAMENTOS: 3,
    TOTAL_RODADAS: 11
};
```

Não espalhar números mágicos pelo código.

---

# 20. FUNÇÕES RECOMENDADAS

Organizar o código aproximadamente com:

```text
iniciarPartida()
lancarDados()
selecionarCategoria()
calcularPontuacao()
identificarMelhorCombinacao()
obterFrequencias()
somarDados()
ehSequencia()
calcularPontuacaoTotal()
finalizarPartida()
reiniciarPartida()
renderizar()
renderizarDados()
renderizarCategorias()
mostrarMensagem()
```

As funções podem ser reorganizadas se houver justificativa técnica, mas as responsabilidades devem permanecer separadas.

---

# 21. COMENTÁRIOS NO CÓDIGO

Os comentários devem explicar responsabilidade e intenção.

Bom:

```javascript
// Impede um quarto lançamento na mesma rodada,
// preservando o limite definido pela regra de negócio.
if (estado.lancamentos >= CONFIG.MAX_LANCAMENTOS) {
    return;
}
```

Ruim:

```javascript
// Soma 1
contador++;
```

Evitar comentários óbvios.

---

# 22. TRATAMENTO DE ERROS

Tratar situações como:

- nome vazio;
- categoria inexistente;
- tentativa de categoria já utilizada;
- tentativa de lançar após o final;
- tentativa de lançar quatro vezes;
- estado inválido.

O sistema não deverá quebrar por uma interação incorreta do usuário.

---

# 23. TESTES OBRIGATÓRIOS

Criar pelo menos os seguintes casos:

| ID | Cenário | Resultado esperado |
|---|---|---|
| CT01 | Iniciar partida | Partida iniciada |
| CT02 | Primeiro lançamento | Cinco dados exibidos |
| CT03 | Segundo lançamento | Contador 2/3 |
| CT04 | Quarto lançamento | Ação bloqueada |
| CT05 | Trinca | Combinação identificada |
| CT06 | General | Combinação identificada |
| CT07 | Full House | Combinação identificada |
| CT08 | Categoria repetida | Seleção bloqueada |
| CT09 | Sequência | Combinação identificada |
| CT10 | Final da partida | Partida encerrada |
| CT11 | Novo jogo | Placar reiniciado |
| CT12 | Categoria inválida | 0 pontos |

---

# 24. DADOS DE TESTE OBRIGATÓRIOS

Utilize estes exemplos para validar a lógica:

## Trinca

```text
3, 3, 3, 2, 5
```

Resultado:

```text
16
```

---

## Quadra

```text
4, 4, 4, 4, 2
```

Resultado:

```text
18
```

---

## Full House

```text
2, 2, 2, 5, 5
```

Resultado:

```text
25
```

---

## Sequência

```text
1, 2, 3, 4, 5
```

Resultado:

```text
30
```

---

## General

```text
6, 6, 6, 6, 6
```

Resultado:

```text
50
```

---

# 25. TESTE DE CATEGORIA SEM COMBINAÇÃO

Exemplo:

```text
1, 2, 3, 4, 5
```

Selecionar:

```text
General
```

Resultado:

```text
0
```

A categoria deve ser marcada como utilizada mesmo recebendo zero.

---

# 26. FLUXO PRINCIPAL

```text
INÍCIO
   ↓
Informar jogador
   ↓
Novo Jogo
   ↓
Rodada 1
   ↓
Lançar dados
   ↓
Lançamentos < 3?
   ├── SIM → permitir novo lançamento
   │
   └── NÃO → exigir escolha de categoria
   ↓
Escolher categoria
   ↓
Calcular pontuação
   ↓
Registrar categoria
   ↓
Existem categorias restantes?
   ├── SIM → próxima rodada
   │
   └── NÃO → finalizar partida
   ↓
Exibir resultado final
   ↓
FIM
```

---

# 27. EVOLUÇÃO FUTURA

A arquitetura deve permitir futuramente:

## Funcionalidade A — Dados mantidos

O jogador poderá clicar em um dado para mantê-lo.

Exemplo:

```text
[ 3 ] [ 3 ] [ 3 ] [ 2 ] [ 5 ]
  ↑     ↑     ↑
 mantidos
```

Ao lançar novamente:

```text
3 3 3
```

permanecem iguais.

Somente:

```text
2 e 5
```

serão rerrolados.

---

## Funcionalidade B — Dois jogadores

Futuramente o sistema poderá possuir:

```text
Jogador 1
Jogador 2
```

Cada jogador deverá possuir:

- seus próprios dados;
- suas próprias categorias;
- sua própria pontuação;
- seu próprio turno.

---

# 28. ESTRUTURA PREPARADA PARA EVOLUÇÃO

Não misturar regras de pontuação com manipulação do DOM.

Evitar:

```javascript
function clicarBotao() {
    // gera dados
    // calcula pontuação
    // altera HTML
    // muda rodada
    // salva placar
    // verifica final
}
```

Preferir:

```text
evento
 ↓
regra
 ↓
atualização do estado
 ↓
renderização
```

Conceitualmente:

```text
INTERFACE
    ↓
CONTROLE
    ↓
ESTADO
    ↓
REGRAS
    ↓
RESULTADO
    ↓
INTERFACE
```

---

# 29. ESTRUTURA DE ARQUIVOS

Criar:

```text
general/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
└── docs/
    ├── requisitos.md
    └── testes.md
```

Se necessário, adicionar:

```text
README.md
```

com instruções de execução.

---

# 30. CRITÉRIOS DE ACEITE

A aplicação somente deverá ser considerada concluída quando:

- [ ] Novo jogo funciona.
- [ ] Nome do jogador é validado.
- [ ] Cinco dados são gerados.
- [ ] Dados possuem valores de 1 a 6.
- [ ] Contador de lançamentos funciona.
- [ ] Quarto lançamento é bloqueado.
- [ ] 11 rodadas são controladas.
- [ ] As 11 categorias aparecem.
- [ ] Categorias utilizadas ficam bloqueadas.
- [ ] Pontuação é calculada corretamente.
- [ ] Trinca funciona.
- [ ] Quadra funciona.
- [ ] Full House funciona.
- [ ] Sequência funciona.
- [ ] General funciona.
- [ ] Categorias numéricas funcionam.
- [ ] Total acumulado funciona.
- [ ] Partida é finalizada.
- [ ] Novo jogo limpa o estado anterior.
- [ ] Interface funciona em telas menores.
- [ ] Não existem erros no console.
- [ ] Código está separado em HTML/CSS/JS.
- [ ] Código está legível.
- [ ] Principais regras possuem comentários.
- [ ] Testes foram realizados.

---

# 31. INSTRUÇÕES ESPECÍFICAS PARA CLAUDE CODE

Se você estiver executando este prompt no Claude Code:

1. Analise primeiro a estrutura existente do projeto.
2. Não apague arquivos existentes sem necessidade.
3. Se o projeto estiver vazio, crie toda a estrutura.
4. Implemente o sistema completo.
5. Execute verificações de sintaxe.
6. Se houver ambiente de navegador disponível, execute testes de interface.
7. Verifique o console em busca de erros.
8. Revise as regras de pontuação com os dados de teste deste documento.
9. Corrija os problemas encontrados.
10. Ao final, apresente:
   - arquivos criados/alterados;
   - funcionalidades implementadas;
   - testes realizados;
   - problemas encontrados;
   - problemas corrigidos;
   - eventuais limitações.

**Não diga que um teste foi realizado se ele não foi realmente executado.**

Se não houver navegador disponível para teste automatizado, informe isso explicitamente.

---

# 32. INSTRUÇÕES ESPECÍFICAS PARA FIGMA / FIGMA MAKE

Se a ferramenta for utilizada principalmente para criar a interface:

Priorize:

1. hierarquia visual;
2. clareza do estado do jogo;
3. responsividade;
4. acessibilidade;
5. estados dos componentes;
6. consistência visual.

Criar os seguintes estados:

### Estado 1 — Inicial

```text
Nenhuma partida iniciada
```

### Estado 2 — Partida iniciada

```text
Rodada 1/11
Lançamentos 0/3
```

### Estado 3 — Dados lançados

Mostrar cinco dados.

### Estado 4 — Combinação identificada

Exemplo:

```text
Trinca identificada!
```

### Estado 5 — Categoria utilizada

Categoria visualmente bloqueada.

### Estado 6 — Última rodada

Mostrar claramente que a partida está chegando ao fim.

### Estado 7 — Resultado

Mostrar:

```text
PARTIDA FINALIZADA

Jogador
Lucas

Pontuação final
87

[ NOVO JOGO ]
```

---

# 33. MICROINTERAÇÕES

Podem ser utilizadas animações discretas para:

- lançamento de dados;
- seleção de categoria;
- atualização de pontuação;
- finalização da partida.

Não utilizar:

- efeitos piscantes;
- animações longas;
- sons obrigatórios;
- excesso de movimento.

A animação deve reforçar a informação, não competir com ela.

---

# 34. IMPORTANTE — NÃO INVENTAR REGRAS

Se existir alguma dúvida não definida neste documento:

1. não invente uma regra silenciosamente;
2. procure manter o comportamento mais simples;
3. registre a decisão;
4. mantenha a regra consistente em toda a aplicação.

Nunca permitir que a interface apresente uma regra diferente daquela usada pelo JavaScript.

---

# 35. ENTREGA ESPERADA

Ao concluir, o projeto deverá conter:

```text
GENERAL
│
├── aplicação funcional
│
├── requisitos
│
├── regras de negócio
│
├── fluxo
│
├── código organizado
│
├── testes
│
└── documentação
```

O resultado deve parecer um **pequeno produto funcional**, e não apenas uma tela demonstrativa.

---

# 36. RESPOSTA FINAL DA QUESTÃO ACADÊMICA

Após implementar o projeto, produzir também uma resposta explicando:

> Como o levantamento de requisitos e a definição das regras de negócio influenciaram a implementação do código?

A resposta deverá apresentar pelo menos três exemplos concretos.

Utilizar exemplos como:

1. limite de três lançamentos;
2. bloqueio de categorias;
3. cálculo de combinações;
4. encerramento após 11 categorias;
5. cálculo do total.

---

# 37. SITUAÇÃO-PROBLEMA — EVOLUÇÃO

Responder também:

## 1. Quais requisitos seriam alterados?

Considerar:

- lançamentos;
- dados;
- turnos;
- resultado;
- placar.

## 2. Quais novos requisitos seriam necessários?

Considerar:

- manter dados;
- dois jogadores;
- alternância de turnos;
- placar individual;
- resultado final.

## 3. Quais regras seriam modificadas?

Considerar:

- controle dos dados mantidos;
- turno de cada jogador;
- categorias individuais;
- condição de encerramento.

## 4. Quais partes do código seriam afetadas?

Considerar principalmente:

- estado;
- lançamento;
- seleção de categoria;
- renderização;
- controle de turno.

## 5. Como estruturar o código para facilitar mudanças?

Explicar a separação entre:

```text
Estado
Regras
Controle
Interface
```

---

# 38. PRINCÍPIO FINAL

Não trate este projeto apenas como:

> "um jogo de dados em JavaScript".

Trate-o como um pequeno projeto real de software.

O fluxo correto é:

```text
PROBLEMA
   ↓
REQUISITOS
   ↓
REGRAS DE NEGÓCIO
   ↓
MODELO DO ESTADO
   ↓
ARQUITETURA
   ↓
INTERFACE
   ↓
IMPLEMENTAÇÃO
   ↓
TESTES
   ↓
VALIDAÇÃO
   ↓
EVOLUÇÃO
```

A implementação deve ser consequência da especificação.

Não faça o contrário.

# FIM DO PROMPT
