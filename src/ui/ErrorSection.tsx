import { AlertTriangle, RefreshCw, X } from "lucide-react";

interface ErrorProps {
  title?: string;
  message?: string;
  type?: "error" | "warning";
  onRetry?: () => void;
  onDismiss?: () => void;
  fullPage?: boolean;
}

function ErrorSection({
  title = "ERROR",
  message = "Component failed to load.",
  type = "error",
  onRetry,
  onDismiss,
  fullPage = false,
}: ErrorProps) {
  const colors = {
    error: {
      border: "border-black dark:border-white",
      bg: "bg-[#FF3A3A] dark:bg-[#FF5252]",
      text: "text-black dark:text-black",
    },
    warning: {
      border: "border-black dark:border-white",
      bg: "bg-[#FFD60A] dark:bg-[#FFE03A]",
      text: "text-black dark:text-black",
    },
  };

  const containerClasses = fullPage
    ? "fixed inset-0 flex items-center justify-center p-4 z-50 bg-white dark:bg-black"
    : "w-full h-full min-h-[200px] flex items-center justify-center p-4";

  return (
    <div className={containerClasses}>
      <div
        className={`border-4 ${colors[type].border} max-w-md w-full transform rotate-1 overflow-hidden`}
      >
        {/* Header */}
        <div
          className={`${colors[type].bg} p-4 flex items-center justify-between`}
        >
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 mr-2" />
            <h3 className="font-mono font-bold text-xl">{title}</h3>
          </div>
          {onDismiss && (
            <button
              aria-label="close alert"
              onClick={onDismiss}
              className="h-8 w-8 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="bg-white dark:bg-black p-6 border-t-4 border-black dark:border-white">
          <p className="font-mono mb-6">{message}</p>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            {onRetry && (
              <button
                aria-label="retry button"
                onClick={onRetry}
                className="px-4 py-2 border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors flex items-center"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                RETRY
              </button>
            )}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="h-2 bg-black dark:bg-white"></div>
        <div className="flex">
          <div className="h-4 w-1/3 bg-black dark:bg-white"></div>
          <div className="h-4 w-1/3"></div>
          <div className="h-4 w-1/3 bg-black dark:bg-white"></div>
        </div>
      </div>
    </div>
  );
}

export default ErrorSection;
