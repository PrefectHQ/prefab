/** Preserve input rows unless aggregation is explicitly enabled. */
export function aggregatePieData(
  data: Record<string, unknown>[],
  dataKey: string,
  nameKey: string,
  below?: number | null,
  except?: string[] | null,
): Record<string, unknown>[] {
  if (below == null && except == null) return data;
  if (below != null && except != null)
    throw new Error("Pie aggregation options are mutually exclusive");
  if (
    below != null &&
    (typeof below !== "number" ||
      !Number.isFinite(below) ||
      below < 0 ||
      below > 1)
  )
    throw new Error("Pie aggregateBelow must be a finite fraction from 0 to 1");
  if (
    except != null &&
    (!Array.isArray(except) ||
      except.some((label) => typeof label !== "string"))
  )
    throw new Error("Pie aggregateExcept must resolve to a list of labels");
  if (dataKey === nameKey)
    throw new Error("Pie aggregation requires different dataKey and nameKey");
  let total = 0;
  for (const row of data) {
    const value = row[dataKey];
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0)
      throw new Error(
        "Pie aggregation requires finite non-negative numeric values",
      );
    total += value;
  }
  if (!Number.isFinite(total))
    throw new Error("Pie aggregation requires a finite total");
  if (below != null && total === 0) return data;
  const labels = new Set(except);
  const keep = (row: Record<string, unknown>) =>
    below != null
      ? Number(row[dataKey]) / total >= below
      : labels.has(row[nameKey] as string);
  if (data.every(keep)) return data;
  const kept = [];
  let other = 0;
  const existingOther = data.find((row) => row[nameKey] === "Other");
  for (const row of data) {
    if (keep(row) && row[nameKey] !== "Other") kept.push(row);
    else other += row[dataKey] as number;
  }
  return [...kept, { ...existingOther, [nameKey]: "Other", [dataKey]: other }];
}
