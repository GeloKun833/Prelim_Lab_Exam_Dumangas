import { createPortal } from 'react-dom';

interface Props {
  visible?: boolean;
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingModal({ visible = false, message = 'LOADING', fullScreen = true }: Props) {
  if (!visible) return null;

  const content = (
    <div className={fullScreen ? 'loading-modal-overlay' : 'api-state loading-state'} role={fullScreen ? 'dialog' : 'status'} aria-modal={fullScreen ? true : undefined} aria-label={message} aria-live="polite">
      {fullScreen ? (
        <div className="loading-modal" role="status" aria-live="polite">
          <div className="spinner" aria-hidden="true" />
          <p className="loading-modal-message">{message}</p>
        </div>
      ) : (
        <>
          <div className="spinner" aria-hidden="true" />
          <p className="loading-message">{message}</p>
        </>
      )}
    </div>
  );

  if (fullScreen && typeof document !== 'undefined') {
    return createPortal(content, document.body);
  }

  return content;
} 
