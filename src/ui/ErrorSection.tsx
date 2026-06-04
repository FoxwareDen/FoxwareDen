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
      gradient: "from-vibrant-pink to-vibrant-purple",
      icon: "text-white",
      border: "border-vibrant-pink/30",
    },
    warning: {
      gradient: "from-vibrant-amber to-vibrant-pink",
      icon: "text-white",
      border: "border-vibrant-amber/30",
    },
  };

  const containerClasses = fullPage
    ? "fixed inset-0 flex items-center justify-center p-4 z-50 bg-background/80 backdrop-blur-sm"
    : "w-full h-full min-h-[200px] flex items-center justify-center p-4";

  return (
    <div className={containerClasses}>
      <div
        className={`border ${colors[type].border} max-w-md w-full overflow-hidden rounded-2xl bg-card shadow-xl animate-scale-in`}
      >
        {/* Header */}
        <div
          className={`bg-gradient-to-r ${colors[type].gradient} p-4 flex items-center justify-between`}
        >
          <div className="flex items-center text-white">
            <AlertTriangle className="h-6 w-6 mr-2" />
            <h3 className="font-mono font-bold text-xl">{title}</h3>
          </div>
          {onDismiss && (
            <button
              aria-label="close alert"
              onClick={onDismiss}
              className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors text-white"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="font-mono text-muted-foreground mb-6">{message}</p>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            {onRetry && (
              <button
                aria-label="retry button"
                onClick={onRetry}
                className="px-4 py-2 bg-gradient-to-r from-vibrant-purple to-vibrant-teal text-white rounded-lg hover:shadow-lg hover:shadow-vibrant-purple/25 transition-all duration-300 hover:-translate-y-0.5 flex items-center font-mono"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                RETRY
              </button>
            )}
          </div>
        </div>

        {/* Decorative gradient bar */}
        <div className={`h-1 bg-gradient-to-r ${colors[type].gradient}`} />
      </div>
    </div>
  );
}

export default ErrorSection;
