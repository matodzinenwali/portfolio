export function LoadingState({ label = 'loading' }) {
  return (
    <div className="status-state mono" role="status">
      <span className="status-dot status-dot--loading" aria-hidden="true" />
      {label}...
    </div>
  );
}

export function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="status-state status-state--error mono" role="alert">
      <span className="status-dot status-dot--error" aria-hidden="true" />
      {message}
      {onRetry && (
        <button className="btn status-retry" onClick={onRetry}>
          retry
        </button>
      )}
    </div>
  );
}

export function EmptyState({ message = 'Nothing here yet.' }) {
  return (
    <div className="status-state mono">
      <span className="status-dot" aria-hidden="true" />
      {message}
    </div>
  );
}
