import { toast, ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  style: {
    backgroundColor: '#000000',
    color: '#ffffff',
    border: '4px solid #000000',
    fontFamily: 'JetBrains Mono, monospace',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  }
};

export const notifications = {
  success: (message: string, options?: ToastOptions) => {
    toast.success(`✅ ${message}`, {
      ...defaultOptions,
      style: {
        ...defaultOptions.style,
        backgroundColor: '#22c55e',
        color: '#ffffff',
        border: '4px solid #22c55e',
      },
      ...options
    });
  },

  error: (message: string, options?: ToastOptions) => {
    toast.error(`❌ ${message}`, {
      ...defaultOptions,
      style: {
        ...defaultOptions.style,
        backgroundColor: '#ef4444',
        color: '#ffffff',
        border: '4px solid #ef4444',
      },
      autoClose: 5000,
      ...options
    });
  },

  warning: (message: string, options?: ToastOptions) => {
    toast.warning(`⚠️ ${message}`, {
      ...defaultOptions,
      style: {
        ...defaultOptions.style,
        backgroundColor: '#f59e0b',
        color: '#000000',
        border: '4px solid #f59e0b',
      },
      ...options
    });
  },

  info: (message: string, options?: ToastOptions) => {
    toast.info(`ℹ️ ${message}`, {
      ...defaultOptions,
      style: {
        ...defaultOptions.style,
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        border: '4px solid #3b82f6',
      },
      ...options
    });
  },

  loading: (message: string, options?: ToastOptions) => {
    return toast.loading(`⏳ ${message}`, {
      ...defaultOptions,
      autoClose: false,
      style: {
        ...defaultOptions.style,
        backgroundColor: '#6b7280',
        color: '#ffffff',
        border: '4px solid #6b7280',
      },
      ...options
    });
  },

  transaction: {
    pending: (message: string = "PROCESSING TRANSACTION") => {
      return notifications.loading(message, { autoClose: false });
    },
    
    success: (message: string = "TRANSACTION SUCCESSFUL", toastId?: string | number) => {
      if (toastId) {
        toast.dismiss(toastId);
      }
      notifications.success(message);
    },
    
    error: (message: string = "TRANSACTION FAILED", toastId?: string | number) => {
      if (toastId) {
        toast.dismiss(toastId);
      }
      notifications.error(message);
    }
  },

  vote: {
    casting: () => notifications.transaction.pending("CASTING VOTE"),
    success: (voteType: "YES" | "NO") => 
      notifications.success(`VOTE ${voteType} RECORDED SUCCESSFULLY!`),
    error: () => notifications.error("FAILED TO CAST VOTE"),
    alreadyVoted: () => notifications.warning("YOU HAVE ALREADY VOTED ON THIS PROPOSAL"),
    expired: () => notifications.warning("VOTING PERIOD HAS EXPIRED")
  },

  proposal: {
    creating: () => notifications.transaction.pending("CREATING PROPOSAL"),
    created: () => notifications.success("PROPOSAL CREATED SUCCESSFULLY!"),
    createError: () => notifications.error("FAILED TO CREATE PROPOSAL"),
    statusChanged: (status: string) => 
      notifications.success(`PROPOSAL ${status.toUpperCase()} SUCCESSFULLY!`),
    deleted: () => notifications.success("PROPOSAL DELETED SUCCESSFULLY!")
  },

  wallet: {
    connected: () => notifications.success("WALLET CONNECTED"),
    disconnected: () => notifications.info("WALLET DISCONNECTED"),
    connectionFailed: () => notifications.error("FAILED TO CONNECT WALLET"),
    insufficientFunds: () => notifications.error("INSUFFICIENT SUI FOR GAS FEES")
  }
};
