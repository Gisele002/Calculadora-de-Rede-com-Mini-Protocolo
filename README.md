# ⚡ Calculadora de Rede com WebSocket

**Calculadora WebSocket Moderna com Comunicação em Tempo Real**

## 🎯 Visão Geral

Uma calculadora moderna baseada em WebSocket com interface elegante e comunicação em tempo real entre cliente e servidor. Este projeto demonstra a implementação do protocolo WebSocket com TypeScript para aplicações acadêmicas.

## ✨ Funcionalidades

- **Interface Moderna**: Tema escuro com gradientes e efeitos visuais
- **Comunicação em Tempo Real**: Comunicação bidirecional baseada em WebSocket
- **Seleção Visual de Operações**: Botões clicáveis ao invés de dropdown
- **Exibição de Resultado ao Vivo**: Painel dedicado com fonte grande
- **Status de Conexão**: Badge de status de conexão em tempo real
- **Log de Comunicação**: Log detalhado de todas as mensagens WebSocket
- **Tratamento de Erros**: Tratamento abrangente para divisão por zero, operações inválidas e mensagens malformadas

## 🛠️ Stack Tecnológica

- **Frontend**: TypeScript, HTML5, CSS3 (Flexbox/Grid), WebSocket API
- **Backend**: Node.js, TypeScript, WebSocket (biblioteca ws)
- **Ferramentas de Build**: Parcel (cliente), TypeScript Compiler (servidor)
- **Estilização**: CSS moderno com gradientes, animações e design responsivo

## 📁 Estrutura do Projeto

```
Calculadora-de-Rede-com-WebSocket/
├── hello-sockets-server/         # Servidor WebSocket
│   ├── src/
│   │   └── server.ts            # Implementação do servidor
│   ├── dist/                    # JavaScript compilado
│   └── package.json
│
├── hello-sockets-client/        # Cliente Web
│   ├── src/
│   │   ├── index.html           # Interface HTML moderna
│   │   └── client.ts            # Lógica WebSocket do cliente
│   └── package.json
│
└── README.md                    # Esta documentação
```

## 🚀 Início Rápido

### 1. Iniciar o Servidor
```bash
cd "Calculadora-de-Rede-com-Mini-Protocolo"
cd "hello-sockets-server"
npm install
npm run build
npm start
```
Servidor executa na **porta 7001**.

### 2. Iniciar o Cliente
```bash
cd "Calculadora-de-Rede-com-Mini-Protocolo"
cd "hello-sockets-client"
npm install
npm start
```
Cliente abre em **http://localhost:1234**.

## 📡 Protocolo de Comunicação

### Formato de Requisição (Cliente → Servidor)
```
OPERATION: ADD
OPERAND1: 5.2
OPERAND2: 3.8
```

### Formato de Resposta (Servidor → Cliente)
```
RESULT: 9
STATUS: OK
MESSAGE: Operação concluída com sucesso
```

## 🧮 Operações Suportadas

| Operação | Símbolo | Descrição |
|----------|---------|-----------|
| **ADD** | ➕ | Adição |
| **SUB** | ➖ | Subtração |
| **MUL** | ✖️ | Multiplicação |
| **DIV** | ➗ | Divisão |

## ⚠️ Tratamento de Erros

O servidor trata:
- **Divisão por zero** → Retorna erro com mensagem
- **Operação inválida** → Retorna erro com sugestões
- **Mensagens malformadas** → Retorna erro de formato
- **Problemas de conexão** → Tratamento automático de reconexão

## 🎨 Recursos da Interface

1. **Seleção de Operações**: Botões visuais ao invés de dropdown
2. **Status ao Vivo**: Badge de status de conexão (🟢 Conectado / 🔴 Desconectado)
3. **Exibição de Resultado**: Painel grande e centralizado para resultados
4. **Log de Comunicação**: Log rolável com formatação tipo timestamp
5. **Design Responsivo**: Funciona em desktop e mobile
6. **Animações**: Transições suaves e efeitos de hover

## 🔌 Gerenciamento de Conexão

- **Conexão Automática**: Cliente conecta automaticamente ao carregar a página
- **Desconexão Manual**: Botão "Desconectar" envia string vazia para o servidor
- **Reconexão**: Recarregue a página para reconectar após desconexão

## 👤 Autor

**Gisele002** - Calculadora de Rede com Protocolo WebSocket

## 📄 Licença

Código aberto para fins educacionais. Sinta-se livre para modificar e distribuir.
