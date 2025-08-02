# 🗳️ Simple Voting App

> A decentralized voting application built on the SUI blockchain using Move smart contracts and React.

## 🏗️ Project Structure

```
simple-voting-app/
├── 📱 frontend/     # React JS application (Vite)
└── 📜 contracts/    # Move language smart contracts
```

---

## ⚡ Quick Start

### Prerequisites Checklist
- [ ] **SUI CLI Setup** - [Installation Guide](https://docs.sui.io/guides/developer/getting-started/sui-install)
- [ ] **Node.js** (v18+)
- [ ] **pnpm** package manager

```bash
# Install pnpm globally
npm install -g pnpm
```

---

## 🚀 Setup Guide

### Step 1: Deploy Smart Contract

```bash
cd contracts
sui client publish
```

> 💡 **Important:** Save the package ID and object IDs from the output - you'll need them for frontend configuration.

### Step 2: Configure Frontend

Update `frontend/src/constants.ts` with your contract details:

```typescript
// Replace with your actual IDs
export const DEVNET_PACKAGE_ID = "0x...";
export const TESTNET_PACKAGE_ID = "0x...";
export const MAINNET_PACKAGE_ID = "0x...";

export const DEVNET_DASHBOARD_ID = "0x...";
export const TESTNET_DASHBOARD_ID = "0x...";
export const MAINNET_DASHBOARD_ID = "0x...";
```

### Step 3: Launch Application

```bash
cd frontend
pnpm install
pnpm dev
```

🎉 **Success!** Your app should now be running at `http://localhost:5173`

---

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |

---

## 📚 Resources

- 📖 [SUI Documentation](https://docs.sui.io)
- 🎓 [Course: SUI DApps with Move & React](https://academy.eincode.com/courses/sui-dapps-with-move-react-build-real-projects)
- 🐛 [Report Issues](https://github.com/your-username/simple-voting-app/issues)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Happy coding!** 🚀✨