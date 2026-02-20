/**
 * Shared utilities for reading files to base64.
 *
 * Used by both the OpenFilePicker action and the DropZone component
 * to produce a consistent file data shape for $event.
 */

import { toast } from "sonner";

/** Shape of a single file in the $event payload. */
export interface FileData {
  name: string;
  size: number;
  type: string;
  /** Raw base64-encoded file content (no data-URL prefix). */
  data: string;
}

/**
 * Read a File to raw base64 (no data-URL prefix).
 */
function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // result is "data:<type>;base64,<data>" — strip the prefix
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(",", 2)[1] ?? "";
      resolve(base64);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * Read a FileList into structured FileData objects.
 *
 * - Validates each file against maxSize (if provided), showing a toast
 *   for rejected files.
 * - Returns a single FileData for single-file mode, or an array for
 *   multiple-file mode.
 */
export async function readFiles(
  files: FileList | File[],
  options: { multiple?: boolean; maxSize?: number } = {},
): Promise<FileData | FileData[] | null> {
  const fileArray = Array.from(files);
  if (fileArray.length === 0) return null;

  const results: FileData[] = [];

  for (const file of fileArray) {
    if (options.maxSize && file.size > options.maxSize) {
      const maxMB = (options.maxSize / (1024 * 1024)).toFixed(1);
      toast.error(`File "${file.name}" exceeds ${maxMB}MB limit`);
      continue;
    }

    const data = await readFileAsBase64(file);
    results.push({
      name: file.name,
      size: file.size,
      type: file.type,
      data,
    });
  }

  if (results.length === 0) return null;
  return options.multiple ? results : results[0];
}

/**
 * Filter files against an `accept` attribute string.
 *
 * Accepts comma-separated MIME types (e.g. "image/*"), extensions
 * (e.g. ".csv"), or a mix. Returns only files that match at least
 * one accept token.
 */
export function filterByAccept(
  files: File[],
  accept: string | undefined,
): File[] {
  if (!accept) return files;

  const tokens = accept
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  const accepted: File[] = [];
  for (const file of files) {
    const fileType = file.type.toLowerCase();
    const fileName = file.name.toLowerCase();
    const matches = tokens.some((token) => {
      if (token.startsWith(".")) {
        return fileName.endsWith(token);
      }
      if (token.endsWith("/*")) {
        return fileType.startsWith(token.slice(0, -1));
      }
      return fileType === token;
    });
    if (matches) {
      accepted.push(file);
    } else {
      toast.error(
        `File "${file.name}" doesn't match accepted types (${accept})`,
      );
    }
  }
  return accepted;
}
