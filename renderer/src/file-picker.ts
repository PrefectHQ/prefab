import { filterByAccept, readFiles, type FileData } from "./file-utils";

/** Open one picker and release all DOM resources on success, cancel, or failure. */
export function openFilePicker(options: {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  signal?: AbortSignal;
}): Promise<FileData[]> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    let timer: ReturnType<typeof setTimeout> | undefined;
    let settled = false;
    let reading = false;
    const cleanup = () => {
      input.removeEventListener("change", onChange);
      window.removeEventListener("focus", onFocus);
      options.signal?.removeEventListener("abort", onAbort);
      clearTimeout(timer);
      input.remove();
    };
    const finish = (files?: FileData[], error?: unknown) => {
      if (settled) return;
      settled = true;
      cleanup();
      if (error !== undefined) reject(error);
      else resolve(files ?? []);
    };
    const onAbort = () =>
      finish(undefined, new DOMException("Cancelled", "AbortError"));
    const onChange = async () => {
      reading = true;
      clearTimeout(timer);
      try {
        const files = filterByAccept(
          Array.from(input.files ?? []),
          options.accept,
        );
        finish(await readFiles(files, options));
      } catch (error) {
        finish(undefined, error);
      }
    };
    const onFocus = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!reading) finish([]);
      }, 300);
    };
    if (options.signal?.aborted) {
      onAbort();
      return;
    }
    input.type = "file";
    if (options.accept) input.accept = options.accept;
    input.multiple = options.multiple ?? false;
    input.style.display = "none";
    input.addEventListener("change", onChange);
    window.addEventListener("focus", onFocus);
    options.signal?.addEventListener("abort", onAbort, { once: true });
    document.body.appendChild(input);
    try {
      input.click();
    } catch (error) {
      finish(undefined, error);
    }
  });
}
