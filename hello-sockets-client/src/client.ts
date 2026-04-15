const socket: WebSocket = new WebSocket('ws://localhost:7001');
const log: HTMLPreElement = document.getElementById('log')! as HTMLPreElement;
let isConnected = false;

// Declare global functions that are defined in HTML
declare function updateStatusBadge(connected: boolean): void;
declare function updateResult(value: string): void;
declare function getSelectedOperation(): string;

socket.onopen = () => {
  isConnected = true;
  log.innerText += '🟢 [SYSTEM] Connected to WebSocket server\n';
  updateButtonStates();
  if (typeof updateStatusBadge === 'function') {
    updateStatusBadge(true);
  }
};

socket.onmessage = (event) => {
  const response = event.data.toString();
  log.innerText += `\n📥 [SERVER RESPONSE]\n${response}\n`;
  log.scrollTop = log.scrollHeight;
  
  // Extract result from response
  const lines = response.split('\n');
  for (const line of lines) {
    if (line.startsWith('RESULT:')) {
      const result = line.split(':')[1].trim();
      if (typeof updateResult === 'function') {
        updateResult(result);
      }
      break;
    }
  }
};

socket.onclose = () => {
  isConnected = false;
  log.innerText += '\n🔴 [SYSTEM] Disconnected from server\n';
  log.innerText += '🔄 Reload page (F5) to reconnect\n';
  updateButtonStates();
  if (typeof updateStatusBadge === 'function') {
    updateStatusBadge(false);
  }
  if (typeof updateResult === 'function') {
    updateResult('--');
  }
};

socket.onerror = () => {
  log.innerText += '\n⚠️ [ERROR] Connection error\n';
  if (typeof updateStatusBadge === 'function') {
    updateStatusBadge(false);
  }
};

// Update button states
function updateButtonStates() {
  const calcBtn = document.getElementById('calcBtn') as HTMLButtonElement;
  const closeBtn = document.getElementById('closeBtn') as HTMLButtonElement;
  
  if (calcBtn && closeBtn) {
    calcBtn.disabled = !isConnected;
    closeBtn.disabled = !isConnected;
  }
}

// Format request according to protocol
function formatRequest(operation: string, operand1: number, operand2: number): string {
  return `OPERATION: ${operation}\nOPERAND1: ${operand1}\nOPERAND2: ${operand2}`;
}

// Calculate function
(window as unknown as Window & { calcular: () => void }).calcular = () => {
  if (!isConnected) {
    log.innerText += '\n⚠️ [ERROR] Not connected to server\n';
    return;
  }

  const operand1Input = document.getElementById('operand1')! as HTMLInputElement;
  const operand2Input = document.getElementById('operand2')! as HTMLInputElement;
  
  let operation = 'ADD';
  if (typeof getSelectedOperation === 'function') {
    operation = getSelectedOperation();
  }
  
  const operand1 = parseFloat(operand1Input.value);
  const operand2 = parseFloat(operand2Input.value);

  if (isNaN(operand1) || isNaN(operand2)) {
    log.innerText += '\n⚠️ [ERROR] Please enter valid numeric values\n';
    return;
  }

  const request = formatRequest(operation, operand1, operand2);
  socket.send(request);
  log.innerText += `\n📤 [REQUEST SENT]\n${request}\n`;
};

// Disconnect function
(window as unknown as Window & { encerrar: () => void }).encerrar = () => {
  if (!isConnected) {
    log.innerText += '\n⚠️ [INFO] Already disconnected\n';
    return;
  }
  
  socket.send('');
  log.innerText += '\n🔌 [SYSTEM] Closing connection...\n';
};
