import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';

// Interfaces TypeScript
interface CalculatorRequest {
  operation: string;
  operand1: number;
  operand2: number;
}

interface CalculatorResponse {
  result: number;
  status: 'OK' | 'ERROR';
  message: string;
}

// Constantes de mensagens
const MESSAGES = {
  SUCCESS: 'Operação concluída com sucesso',
  DIV_ZERO: 'Divisão por zero não é permitida',
  INVALID_FORMAT: 'Formato de mensagem inválido. Use OPERATION, OPERAND1 e OPERAND2',
  INVALID_OPERATION: (op: string) => `Operação inválida: ${op}. Use ADD, SUB, MUL ou DIV`
};

// Server HTTP básico para upgrade
const httpServer: http.Server = http.createServer((_, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is running');
});

const wss: WebSocketServer = new WebSocketServer({ server: httpServer });

// Função para parsear a mensagem do protocolo
function parseRequest(message: string): CalculatorRequest | null {
  const lines = message.trim().split('\n');
  const data: Record<string, string> = {};

  for (const line of lines) {
    const [key, value] = line.split(':').map(s => s.trim());
    if (key && value) {
      data[key] = value;
    }
  }

  if (!data.OPERATION || !data.OPERAND1 || !data.OPERAND2) {
    return null;
  }

  const operand1 = parseFloat(data.OPERAND1);
  const operand2 = parseFloat(data.OPERAND2);

  if (isNaN(operand1) || isNaN(operand2)) {
    return null;
  }

  return {
    operation: data.OPERATION,
    operand1,
    operand2
  };
}

// Função para executar a operação
function calculate(operation: string, operand1: number, operand2: number): { result: number; error?: string } {
  switch (operation) {
    case 'ADD':
      return { result: operand1 + operand2 };
    case 'SUB':
      return { result: operand1 - operand2 };
    case 'MUL':
      return { result: operand1 * operand2 };
    case 'DIV':
      if (operand2 === 0) {
        return { result: 0, error: MESSAGES.DIV_ZERO };
      }
      return { result: operand1 / operand2 };
    default:
      return { result: 0, error: MESSAGES.INVALID_OPERATION(operation) };
  }
}

// Função para formatar a resposta
function formatResponse(result: number, status: 'OK' | 'ERROR', message: string): string {
  return `RESULT: ${result}\nSTATUS: ${status}\nMESSAGE: ${message}`;
}

wss.on('connection', (ws: WebSocket) => {
  console.log('Novo cliente conectado');

  ws.on('message', (data) => {
    const msg: string = data.toString();
    console.log(`Mensagem recebida do cliente:\n${msg}`);

    // Verifica se é uma string vazia (sinal de encerramento)
    if (msg.trim() === '') {
      console.log('Cliente solicitou encerramento da conexão');
      ws.close();
      return;
    }

    // Parseia a requisição
    const request = parseRequest(msg);

    if (!request) {
      const response = formatResponse(0, 'ERROR', MESSAGES.INVALID_FORMAT);
      ws.send(response);
      return;
    }

    // Executa o cálculo
    const { result, error } = calculate(request.operation, request.operand1, request.operand2);

    // Formata e envia a resposta
    if (error) {
      const response = formatResponse(result, 'ERROR', error);
      ws.send(response);
    } else {
      const response = formatResponse(result, 'OK', MESSAGES.SUCCESS);
      ws.send(response);
    }
  });

  ws.on('close', () => console.log('Cliente desconectado'));
});

const PORT: number = 7001;
httpServer.listen(PORT, () => console.log(`Servidor WebSocket ouvindo na porta ${PORT}`));