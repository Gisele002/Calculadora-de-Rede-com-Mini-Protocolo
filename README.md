# ⚡ WebSocket Calculator Pro

**Modern WebSocket Calculator with Real-time Communication**

## 🎯 Overview

A redesigned, modern WebSocket-based calculator featuring a sleek dark theme interface with real-time communication between client and server. This project demonstrates WebSocket protocol implementation with TypeScript.

## ✨ Features

- **Modern UI**: Dark theme with gradient backgrounds and glassmorphism effects
- **Real-time Communication**: WebSocket-based bidirectional communication
- **Visual Operation Selection**: Clickable operation buttons instead of dropdown
- **Live Result Display**: Dedicated result panel with large font
- **Connection Status**: Real-time connection status badge
- **Communication Log**: Detailed log of all WebSocket messages
- **Error Handling**: Comprehensive error handling for division by zero, invalid operations, and malformed messages

## �️ Tech Stack

- **Frontend**: TypeScript, HTML5, CSS3 (Flexbox/Grid), WebSocket API
- **Backend**: Node.js, TypeScript, WebSocket (ws library)
- **Build Tools**: Parcel (client), TypeScript Compiler (server)
- **Styling**: Modern CSS with gradients, animations, and responsive design

## � Project Structure

```
WebSocket-Calculator-Pro/
├── hello-sockets-server/         # WebSocket Server
│   ├── src/
│   │   └── server.ts            # Server implementation
│   ├── dist/                    # Compiled JavaScript
│   └── package.json
│
├── hello-sockets-client/        # Web Client
│   ├── src/
│   │   ├── index.html           # Modern HTML interface
│   │   └── client.ts            # Client-side WebSocket logic
│   └── package.json
│
└── README.md                    # This documentation
```

## � Quick Start

### 1. Start the Server
```bash
cd "hello-sockets-server"
npm install
npm run build
npm start
```
Server runs on **port 7001**.

### 2. Start the Client
```bash
cd "hello-sockets-client"
npm install
npm start
```
Client opens at **http://localhost:1234**.

## 📡 Communication Protocol

### Request Format (Client → Server)
```
OPERATION: ADD
OPERAND1: 5.2
OPERAND2: 3.8
```

### Response Format (Server → Client)
```
RESULT: 9
STATUS: OK
MESSAGE: Operation completed successfully
```

## � Supported Operations

| Operation | Symbol | Description |
|-----------|--------|-------------|
| **ADD** | ➕ | Addition |
| **SUB** | ➖ | Subtraction |
| **MUL** | ✖️ | Multiplication |
| **DIV** | ➗ | Division |

## ⚠️ Error Handling

The server handles:
- **Division by zero** → Returns error with message
- **Invalid operation** → Returns error with suggestions
- **Malformed messages** → Returns format error
- **Connection issues** → Automatic reconnection handling

## 🎨 UI Features

1. **Operation Selection**: Visual buttons instead of dropdown
2. **Live Status**: Connection status badge (🟢 Connected / 🔴 Disconnected)
3. **Result Display**: Large, centered result panel
4. **Communication Log**: Scrollable log with timestamp-like formatting
5. **Responsive Design**: Works on desktop and mobile
6. **Animations**: Smooth transitions and hover effects

## 🔌 Connection Management

- **Auto-connect**: Client automatically connects on page load
- **Manual disconnect**: "Disconnect" button sends empty string to server
- **Reconnection**: Reload page to reconnect after disconnect

## 👤 Author

**Gisele002** - Network Calculator with WebSocket Protocol

## 📄 License

Open source for educational purposes. Feel free to modify and distribute.
