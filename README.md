# Project Setup Instructions

Welcome to the project repository for the course **"Sui dApps with Move & React - Build Real Projects"**.

## About the Course

**Course Title:** Sui dApps with Move & React - Build Real Projects  
**Description:** Hands-on Sui dApp development with Move and React. Create a voting system and a meme coin. Learn smart contracts coding.

To get detailed instructions and learn about SUI and Move, enroll in the course: [Sui dApps with Move & React - Build Real Projects](https://academy.eincode.com/courses/sui-dapps-with-move-react-build-real-projects)

---

## Project Structure

- **frontend**: Contains a React JS application built using Vite.
- **contracts**: Contains the Move language smart contracts.

---

## Prerequisites

1. **SUI CLI Setup:**  
   - Follow the official SUI documentation to install the CLI and create an account: [SUI Setup Instructions](https://docs.sui.io/guides/developer/getting-started/sui-install)

2. **Node.js & pnpm:**  
   Ensure you have Node.js installed. Then install pnpm globally:

   ```bash
   npm install -g pnpm
   ```

---

## Step-by-Step Setup

### 1. Publish the Smart Contract

Navigate to the `contracts` folder and publish the contract using the SUI CLI:

```bash
sui client publish
```

This will provide you with the package ID and object IDs. Make note of these IDs as they are required in the frontend configuration.

### 2. Configure the Frontend

1. Navigate to the `frontend/src/constants.ts` file.
2. Replace the placeholder values with your published contract and object IDs:

```typescript
export const DEVNET_PACKAGE_ID = "<your-devnet-package-id>";
export const TESTNET_PACKAGE_ID = "<your-testnet-package-id>";
export const MAINNET_PACKAGE_ID = "<your-mainnet-package-id>";

export const DEVNET_DASHBOARD_ID = "<your-devnet-dashboard-id>";
export const TESTNET_DASHBOARD_ID = "<your-testnet-dashboard-id>";
export const MAINNET_DASHBOARD_ID = "<your-mainnet-dashboard-id>";
```

### 3. Install and Run the Frontend

1. Navigate to the `frontend` folder:

   ```bash
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

---

## Additional Resources

- Official SUI Documentation: [https://docs.sui.io](https://docs.sui.io)
- Course Link: [https://academy.eincode.com/courses/sui-dapps-with-move-react-build-real-projects](https://academy.eincode.com/courses/sui-dapps-with-move-react-build-real-projects)

Happy coding! 🚀
