# 17. FUNCIONALIDADES ADICIONAIS — APROFUNDAMENTO

Além dos requisitos mínimos, a solução deverá implementar **pelo menos três funcionalidades adicionais** da lista abaixo.

O aluno poderá implementar funcionalidades diferentes das três sugeridas, desde que sejam tecnicamente justificadas e documentadas.

### Funcionalidades disponíveis

* manter dados entre lançamentos;
* animação dos dados;
* ranking de pontuações;
* armazenamento da partida no `localStorage`;
* histórico de partidas;
* modo para dois jogadores;
* estatísticas do jogador;
* efeitos sonoros;
* modo escuro;
* botão de desfazer;
* tela de instruções;
* sistema de recordes.

## 17.1 Funcionalidades adicionais obrigatórias desta implementação

Para esta implementação, utilizar obrigatoriamente:

### FA01 — Manutenção do estado dos dados

Os valores dos dados deverão permanecer armazenados no estado da aplicação entre os lançamentos da mesma rodada.

O sistema não deve depender exclusivamente do conteúdo visual do HTML para saber quais são os valores atuais dos dados.

O estado deverá permitir recuperar:

* valores atuais dos cinco dados;
* quantidade de lançamentos realizados;
* rodada atual;
* categoria selecionada;
* pontuação da rodada;
* pontuação acumulada.

### FA02 — Persistência da partida com `localStorage`

O sistema deverá utilizar o `localStorage` do navegador para armazenar os dados necessários para recuperar uma partida em andamento.

A persistência deverá ocorrer, no mínimo, após alterações relevantes no estado da partida, como:

* início de uma nova partida;
* lançamento dos dados;
* seleção de categoria;
* encerramento de uma rodada;
* atualização da pontuação;
* mudança de rodada.

Ao recarregar a página, o sistema deverá verificar se existe uma partida salva.

Caso exista, deverá oferecer ao jogador a possibilidade de continuar a partida.

O sistema não deverá apresentar erro caso não exista nenhuma partida armazenada.

### FA03 — Histórico de partidas

O sistema deverá manter um histórico das partidas finalizadas utilizando `localStorage`.

Cada registro do histórico deverá conter, no mínimo:

* identificador da partida;
* nome do jogador;
* pontuação final;
* quantidade de rodadas;
* data e hora da partida;
* resultado/status da partida.

O jogador deverá conseguir visualizar o histórico através de uma área específica da interface.

O sistema deverá permitir limpar o histórico mediante uma ação explícita do usuário.

---

# 18. NOVOS REQUISITOS FUNCIONAIS

As funcionalidades adicionais deverão ser incorporadas aos requisitos funcionais existentes.

### RF17 — Manter estado dos dados

O sistema deve manter os valores atuais dos cinco dados no estado interno da aplicação durante a execução da partida.

### RF18 — Persistir partida

O sistema deve salvar os dados necessários para recuperar uma partida em andamento no `localStorage`.

### RF19 — Recuperar partida

O sistema deve identificar uma partida previamente salva e permitir que o jogador continue essa partida após recarregar a página.

### RF20 — Registrar histórico

O sistema deve armazenar no `localStorage` informações das partidas finalizadas.

### RF21 — Consultar histórico

O sistema deve permitir ao jogador visualizar partidas anteriores e suas respectivas pontuações.

### RF22 — Limpar histórico

O sistema deve permitir a exclusão do histórico mediante confirmação do usuário.

---

# 19. NOVAS REGRAS DE NEGÓCIO

### RN21 — Persistência do estado

Enquanto uma partida estiver em andamento, o estado atual deverá representar fielmente:

* rodada;
* lançamentos;
* dados;
* categorias utilizadas;
* pontuação acumulada;
* jogador.

### RN22 — Persistência automática

Alterações relevantes no estado da partida deverão atualizar a informação armazenada no `localStorage`.

### RN23 — Recuperação

Ao carregar a aplicação, uma partida salva poderá ser recuperada.

A recuperação deverá restaurar o estado da partida em vez de iniciar automaticamente uma nova partida.

### RN24 — Partida finalizada

Uma partida somente deverá ser adicionada ao histórico quando todas as categorias disponíveis tiverem sido utilizadas e a pontuação final tiver sido calculada.

### RN25 — Integridade do histórico

Uma partida finalizada registrada no histórico não poderá ser alterada pela continuação de uma nova partida.

### RN26 — Identificação

Cada partida armazenada no histórico deverá possuir um identificador próprio.

### RN27 — Ausência de histórico

Caso não existam partidas anteriores, a interface deverá informar claramente que o histórico está vazio.

### RN28 — Limpeza

A exclusão do histórico deverá exigir uma ação explícita do usuário, evitando remoção acidental.

### RN29 — Dados inválidos

Caso os dados armazenados no `localStorage` estejam corrompidos ou sejam incompatíveis com a estrutura atual da aplicação, o sistema deverá tratar a situação sem interromper a execução do jogo.

### RN30 — Nova partida

Ao iniciar uma nova partida, o sistema não deverá apagar automaticamente o histórico de partidas finalizadas.

---

# 20. ESTRUTURA DE DADOS PARA PERSISTÊNCIA

Utilizar uma estrutura organizada para representar a partida.

Exemplo conceitual:

```javascript
const estado = {
    jogador: "",
    rodadaAtual: 1,
    lancamentos: 0,
    dados: [1, 2, 3, 4, 5],
    categoriasUsadas: [],
    pontuacaoTotal: 0,
    partidaEmAndamento: true
};
```

Para o histórico:

```javascript
const partidaHistorico = {
    id: "",
    jogador: "",
    pontuacaoFinal: 0,
    rodadas: 11,
    dataHora: "",
    status: "finalizada"
};
```

Os nomes podem ser adaptados conforme a arquitetura escolhida, mas a separação entre **estado da partida atual** e **histórico de partidas finalizadas** deverá ser preservada.

---

# 21. NOVOS TESTES OBRIGATÓRIOS

Além dos testes mínimos já definidos, criar testes para as funcionalidades adicionais.

### CT13 — Persistência da partida

**Cenário:** partida em andamento é salva.

**Ação:** realizar lançamentos e recarregar a página.

**Resultado esperado:** os dados da partida são preservados.

### CT14 — Recuperação da partida

**Cenário:** existe uma partida válida no `localStorage`.

**Ação:** abrir/recarregar a aplicação.

**Resultado esperado:** o sistema identifica a partida e permite continuar de onde parou.

### CT15 — Registro no histórico

**Cenário:** partida é finalizada.

**Ação:** completar todas as rodadas.

**Resultado esperado:** a partida é adicionada ao histórico.

### CT16 — Consulta do histórico

**Cenário:** existem partidas finalizadas armazenadas.

**Ação:** acessar a tela/seção de histórico.

**Resultado esperado:** as partidas armazenadas são apresentadas com suas informações principais.

### CT17 — Histórico vazio

**Cenário:** não existem partidas armazenadas.

**Ação:** acessar o histórico.

**Resultado esperado:** o sistema apresenta uma mensagem informando que não existem partidas registradas.

### CT18 — Limpeza do histórico

**Cenário:** existem partidas no histórico.

**Ação:** solicitar a limpeza e confirmar.

**Resultado esperado:** os registros são removidos do `localStorage` e a interface é atualizada.

### CT19 — Dados corrompidos

**Cenário:** o `localStorage` contém dados inválidos.

**Ação:** abrir a aplicação.

**Resultado esperado:** o jogo não quebra e trata a informação inválida de forma segura.

---

# 22. INTERFACE PARA AS FUNCIONALIDADES ADICIONAIS

A implementação deverá incluir elementos visuais para tornar as novas funcionalidades descobríveis.

Adicionar, conforme necessário:

* indicador de partida recuperada;
* botão "Continuar partida";
* botão "Nova partida";
* acesso ao "Histórico";
* lista/tabela de partidas anteriores;
* pontuação final de cada partida;
* data da partida;
* nome do jogador;
* botão para limpar histórico;
* mensagens de confirmação;
* estados vazios para quando não houver histórico.

A interface não deverá ficar visualmente sobrecarregada.

As funcionalidades adicionais devem ser integradas à hierarquia visual existente.

---

# 23. ARQUITETURA PARA AS FUNCIONALIDADES ADICIONAIS

Manter a separação:

```text
ESTADO
  ↓
REGRAS DO JOGO
  ↓
PERSISTÊNCIA
  ↓
CONTROLE DA APLICAÇÃO
  ↓
INTERFACE
```

Criar funções específicas para persistência, evitando espalhar chamadas ao `localStorage` por todo o código.

Exemplos de responsabilidades:

```javascript
salvarPartida()
carregarPartida()
removerPartidaSalva()
registrarPartidaHistorico()
carregarHistorico()
limparHistorico()
renderizarHistorico()
```

A lógica do jogo não deverá depender diretamente da interface.

Por exemplo:

```text
calcularPontuacao()
```

deve calcular a pontuação independentemente de saber onde ela será exibida.

Da mesma forma:

```text
salvarPartida()
```

deve ser responsável pela persistência, sem assumir responsabilidades de renderização da interface.

---

# 24. CRITÉRIO DE ACEITAÇÃO DAS FUNCIONALIDADES ADICIONAIS

As funcionalidades adicionais somente serão consideradas implementadas se:

* estiverem funcionando no navegador;
* estiverem documentadas como requisitos;
* estiverem documentadas como regras de negócio quando aplicável;
* estiverem integradas ao estado da aplicação;
* possuírem tratamento de erros;
* possuírem testes;
* não quebrarem as funcionalidades básicas do jogo;
* forem consideradas na arquitetura do JavaScript;
* forem refletidas na interface;
* estiverem documentadas na entrega final.

A implementação não deverá ser apenas visual.

Por exemplo, criar um botão "Histórico" sem realmente armazenar e recuperar partidas **não caracteriza a implementação da funcionalidade**.

---

# 25. PRINCÍPIO PARA O DESENVOLVIMENTO

As funcionalidades adicionais devem seguir o mesmo fluxo utilizado para os requisitos originais:

```text
NECESSIDADE
    ↓
REQUISITO
    ↓
REGRA DE NEGÓCIO
    ↓
ESTADO
    ↓
ARQUITETURA
    ↓
IMPLEMENTAÇÃO
    ↓
INTERFACE
    ↓
TESTE
    ↓
VALIDAÇÃO
```

O objetivo é demonstrar que uma funcionalidade adicional não é apenas um recurso visual, mas uma mudança real no sistema que precisa ser especificada, implementada, testada e validada.
