'use client';

import React, {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
  DragEvent,
  ChangeEvent,
  HTMLAttributes,
} from 'react';

export interface DropzoneRef {
  open: () => void;
}

export interface DropzoneProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrop'> {
  onDropFiles?: (files: FileList) => void;
  title?: string;
  hint?: string;
  icon?: React.ReactNode;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  previewUrl?: string;
  previewTitle?: string;
  previewHint?: string;
  onReplace?: () => void;
  onRemove?: () => void;
  replaceLabel?: string;
  removeLabel?: string;
  removeIcon?: React.ReactNode;
}

export const Dropzone = forwardRef<DropzoneRef, DropzoneProps>(function Dropzone(
  {
    onDropFiles,
    title = 'Drag and drop media here',
    hint = 'or click to browse files',
    icon,
    accept,
    multiple = true,
    disabled = false,
    previewUrl,
    previewTitle = 'File uploaded',
    previewHint = 'Click replace or drop new file to change',
    onReplace,
    onRemove,
    replaceLabel = 'Replace',
    removeLabel,
    removeIcon,
    className = '',
    children,
    ...props
  },
  ref
) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      if (!disabled) {
        inputRef.current?.click();
      }
    },
  }));

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isDragging) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onDropFiles?.(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onDropFiles?.(e.target.files);
    }
  };

  return (
    <div
      onClick={() => {
        if (!disabled) {
          inputRef.current?.click();
        }
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`rv-dropzone ${isDragging ? 'rv-dropzoneActive' : ''} ${className}`.trim()}
      role="button"
      tabIndex={0}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />

      {previewUrl ? (
        <div
          className="rv-dropzoneCard"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <img src={previewUrl} alt={previewTitle} className="rv-dropzoneCardThumb" />
          <div className="rv-dropzoneCardMeta">
            <span className="rv-dropzoneCardTitle">{previewTitle}</span>
            <span className="rv-dropzoneCardHint">{previewHint}</span>
          </div>
          <div className="rv-dropzoneCardActions">
            <button
              type="button"
              className="rv-btn rv-btnGhost rv-btnSm"
              onClick={(e) => {
                e.stopPropagation();
                if (onReplace) {
                  onReplace();
                } else {
                  inputRef.current?.click();
                }
              }}
            >
              {replaceLabel}
            </button>
            {onRemove && (
              <button
                type="button"
                className="rv-btn rv-btnGhost rv-btnIconSm"
                style={{ color: 'var(--rv-danger, #ef4444)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                title={removeLabel || 'Remove file'}
              >
                {removeIcon || (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      ) : children ? (
        children
      ) : (
        <>
          {icon && <div className="rv-dropzoneIcon">{icon}</div>}
          <div className="rv-dropzoneTitle">{title}</div>
          <div className="rv-dropzoneHint">{hint}</div>
        </>
      )}
    </div>
  );
});
