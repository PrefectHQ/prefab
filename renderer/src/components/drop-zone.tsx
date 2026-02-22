/**
 * DropZone — styled drag-and-drop file upload area.
 *
 * Accepts files via drag-and-drop or click-to-browse, reads them
 * to base64, and calls onChange with the structured file data.
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import { useIcon } from "@/lib/icons";
import { readFiles, filterByAccept } from "../file-utils";

interface PrefabDropZoneProps {
  icon?: string;
  label?: string;
  description?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  disabled?: boolean;
  name?: string;
  className?: string;
  onChange?: (data: unknown) => void;
}

export function PrefabDropZone({
  icon,
  label,
  description,
  accept,
  multiple = false,
  maxSize,
  disabled = false,
  className,
  onChange,
}: PrefabDropZoneProps) {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFiles = React.useCallback(
    async (files: File[]) => {
      const filtered = filterByAccept(files, accept);
      const result = await readFiles(filtered, { multiple, maxSize });
      if (result != null) {
        onChange?.(result);
      }
    },
    [accept, multiple, maxSize, onChange],
  );

  const handleDragOver = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragOver(true);
    },
    [disabled],
  );

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      if (disabled) return;
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) handleFiles(files);
    },
    [disabled, handleFiles],
  );

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      if (files.length > 0) handleFiles(files);
      // Reset so selecting the same file again still triggers onChange
      e.target.value = "";
    },
    [handleFiles],
  );

  const handleClick = React.useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && !disabled) {
        e.preventDefault();
        inputRef.current?.click();
      }
    },
    [disabled],
  );

  const IconComponent = useIcon(icon ?? "upload");

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "w-full flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-8 text-center transition-colors cursor-pointer",
        isDragOver
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-muted-foreground/50",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      {IconComponent && (
        <IconComponent className="size-6 text-muted-foreground" />
      )}

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-foreground">
          {label ?? "Drop files here or click to browse"}
        </p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
}
