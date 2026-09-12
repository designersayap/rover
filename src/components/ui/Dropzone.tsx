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

      {children ? (
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
