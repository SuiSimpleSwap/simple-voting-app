import { FC } from "react";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "medium" | "large";
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ 
  message = "LOADING...", 
  size = "medium" 
}) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8", 
    large: "w-12 h-12"
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} border-4 border-black border-t-transparent animate-spin mb-4`}></div>
      <p className="font-mono font-bold uppercase tracking-wider text-sm">{message}</p>
    </div>
  );
};

interface ErrorDisplayProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorDisplay: FC<ErrorDisplayProps> = ({ 
  title = "ERROR", 
  message, 
  onRetry 
}) => (
  <div className="bg-black text-white border-4 border-black p-6 text-center shadow-brutal">
    <h3 className="text-lg font-bold font-mono uppercase tracking-wider mb-2">{title}</h3>
    <p className="font-mono text-sm mb-4">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-white text-black border-4 border-white font-mono font-bold uppercase tracking-wider px-4 py-2 hover:bg-black hover:text-white hover:border-black transition-all duration-150 shadow-brutal active:shadow-none active:translate-x-1 active:translate-y-1"
      >
        RETRY
      </button>
    )}
  </div>
);

interface SuccessDisplayProps {
  title?: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
}

export const SuccessDisplay: FC<SuccessDisplayProps> = ({ 
  title = "SUCCESS", 
  message, 
  actionText,
  onAction 
}) => (
  <div className="bg-green-500 text-white border-4 border-green-500 p-6 text-center shadow-brutal">
    <h3 className="text-lg font-bold font-mono uppercase tracking-wider mb-2">✅ {title}</h3>
    <p className="font-mono text-sm mb-4">{message}</p>
    {actionText && onAction && (
      <button
        onClick={onAction}
        className="bg-white text-green-500 border-4 border-white font-mono font-bold uppercase tracking-wider px-4 py-2 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-150 shadow-brutal active:shadow-none active:translate-x-1 active:translate-y-1"
      >
        {actionText}
      </button>
    )}
  </div>
);

interface WarningDisplayProps {
  title?: string;
  message: string;
}

export const WarningDisplay: FC<WarningDisplayProps> = ({ 
  title = "WARNING", 
  message 
}) => (
  <div className="bg-yellow-500 text-black border-4 border-yellow-500 p-6 text-center shadow-brutal">
    <h3 className="text-lg font-bold font-mono uppercase tracking-wider mb-2">⚠️ {title}</h3>
    <p className="font-mono text-sm">{message}</p>
  </div>
);

interface InfoDisplayProps {
  title?: string;
  message: string;
}

export const InfoDisplay: FC<InfoDisplayProps> = ({ 
  title = "INFO", 
  message 
}) => (
  <div className="bg-blue-500 text-white border-4 border-blue-500 p-6 text-center shadow-brutal">
    <h3 className="text-lg font-bold font-mono uppercase tracking-wider mb-2">ℹ️ {title}</h3>
    <p className="font-mono text-sm">{message}</p>
  </div>
);

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: FC<EmptyStateProps> = ({ 
  icon = "📭", 
  title, 
  description,
  actionText,
  onAction 
}) => (
  <div className="bg-white border-4 border-black p-8 text-center shadow-brutal">
    <div className="text-6xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold font-mono uppercase tracking-wider mb-2">{title}</h3>
    <p className="font-mono text-sm text-gray-600 mb-4">{description}</p>
    {actionText && onAction && (
      <button
        onClick={onAction}
        className="bg-black text-white border-4 border-black font-mono font-bold uppercase tracking-wider px-6 py-3 hover:bg-white hover:text-black transition-all duration-150 shadow-brutal active:shadow-none active:translate-x-1 active:translate-y-1"
      >
        {actionText}
      </button>
    )}
  </div>
);
