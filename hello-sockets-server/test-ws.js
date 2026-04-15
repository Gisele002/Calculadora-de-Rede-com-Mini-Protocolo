const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:7001');
const tests = [
  { label: 'ADD 5.2 + 3.8',    msg: 'OPERATION: ADD\nOPERAND1: 5.2\nOPERAND2: 3.8' },
  { label: 'SUB 10 - 4',       msg: 'OPERATION: SUB\nOPERAND1: 10\nOPERAND2: 4' },
  { label: 'MUL 3 * 7',        msg: 'OPERATION: MUL\nOPERAND1: 3\nOPERAND2: 7' },
  { label: 'DIV 20 / 4',       msg: 'OPERATION: DIV\nOPERAND1: 20\nOPERAND2: 4' },
  { label: 'DIV por zero',     msg: 'OPERATION: DIV\nOPERAND1: 5\nOPERAND2: 0' },
  { label: 'Operação inválida',msg: 'OPERATION: MOD\nOPERAND1: 5\nOPERAND2: 2' },
  { label: 'Formato inválido', msg: 'HELLO WORLD' },
];

let idx = 0;

ws.on('open', () => {
  console.log('✅ Conectado ao servidor\n');
  sendNext();
});

ws.on('message', (data) => {
  console.log(`--- Resposta ---\n${data}\n`);
  if (idx < tests.length) {
    sendNext();
  } else {
    console.log('🔌 Encerrando conexão...');
    ws.send('');
  }
});

ws.on('close', () => console.log('❌ Conexão encerrada.'));
ws.on('error', (e) => console.error('Erro:', e.message));

function sendNext() {
  const t = tests[idx++];
  console.log(`[TESTE ${idx}] ${t.label}`);
  console.log(`--- Requisição ---\n${t.msg}\n`);
  ws.send(t.msg);
}
