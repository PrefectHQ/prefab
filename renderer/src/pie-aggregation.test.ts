import { expect, it } from "vitest";
import { aggregatePieData } from "./pie-aggregation";
import { pieChartSchema } from "./schemas/chart";

const data = [
  { label: "A", amount: 60, note: "keep" },
  { label: "B", amount: 20 },
  { label: "C", amount: 15 },
  { label: "D", amount: 5 },
];
it("uses original totals and includes threshold boundaries without mutating rows", () => {
  const result = aggregatePieData(data, "amount", "label", 0.2);
  expect(result).toEqual([data[0], data[1], { label: "Other", amount: 20 }]);
  expect(result[0]).toBe(data[0]);
  expect(data).toHaveLength(4);
  expect(result.reduce((sum, row) => sum + Number(row.amount), 0)).toBe(100);
});
it("keeps selected labels, including an empty selection", () => {
  expect(aggregatePieData(data, "amount", "label", undefined, ["C"])).toEqual([
    data[2],
    { label: "Other", amount: 85 },
  ]);
  expect(aggregatePieData(data, "amount", "label", undefined, [])).toEqual([
    { label: "Other", amount: 100 },
  ]);
});
it("handles empty input, zero totals, thresholds0 and1, and no aggregated rows", () => {
  expect(aggregatePieData([], "amount", "label", 0.2)).toEqual([]);
  expect(aggregatePieData(data, "amount", "label", 0)).toEqual(data);
  expect(aggregatePieData(data, "amount", "label", 1)).toEqual([
    { label: "Other", amount: 100 },
  ]);
  const zeros = [
    { label: "A", amount: 0 },
    { label: "B", amount: 0 },
  ];
  expect(aggregatePieData(zeros, "amount", "label", 0.1)).toEqual(zeros);
  expect(aggregatePieData(zeros, "amount", "label", 0)).toEqual(zeros);
});
it.each([-1, NaN, Infinity, "10", true, null, undefined])(
  "rejects enabled invalid value%j but preserves disabled behavior",
  (value) => {
    const rows = [{ label: "A", amount: value }];
    expect(() => aggregatePieData(rows, "amount", "label", 0.2)).toThrow(
      /finite non-negative/,
    );
    expect(aggregatePieData(rows, "amount", "label")).toBe(rows);
  },
);
it("rejects nonfinite totals and same keys, coalescing existing Other rows", () => {
  expect(() =>
    aggregatePieData(
      [
        { label: "A", amount: Number.MAX_VALUE },
        { label: "B", amount: Number.MAX_VALUE },
      ],
      "amount",
      "label",
      0.2,
    ),
  ).toThrow(/total/);
  expect(() => aggregatePieData([], "x", "x", 0.2)).toThrow(/different/);
  const rows = [
    { label: "Other", amount: 9 },
    { label: "A", amount: 1 },
  ];
  expect(
    aggregatePieData(rows, "amount", "label", undefined, ["Other"]),
  ).toEqual([{ label: "Other", amount: 10 }]);
  expect(aggregatePieData(rows, "amount", "label", undefined, [])).toEqual([
    { label: "Other", amount: 10 },
  ]);
});
it("validates options in the wire schema before interpolation", () => {
  const base = { type: "PieChart", dataKey: "amount", nameKey: "label", data };
  expect(
    pieChartSchema.parse({ ...base, aggregateExcept: "{{ selected }}" })
      .aggregateExcept,
  ).toBe("{{ selected }}");
  for (const options of [
    { aggregateBelow: -1 },
    { aggregateBelow: NaN },
    { aggregateBelow: Infinity },
    { aggregateBelow: "0.2" },
    { aggregateExcept: [1] },
    { aggregateBelow: 0, aggregateExcept: [] },
    { dataKey: "label", aggregateBelow: 0.2 },
  ]) {
    expect(pieChartSchema.safeParse({ ...base, ...options }).success).toBe(
      false,
    );
  }
});

it("coalesces existing Other rows with the first row's metadata", () => {
  const rows = [
    { label: "Other", amount: 10, note: "first" },
    { label: "A", amount: 70, note: "retained" },
    { label: "Other", amount: 5, note: "second" },
    { label: "B", amount: 15 },
  ];
  const result = aggregatePieData(rows, "amount", "label", undefined, [
    "A",
    "Other",
  ]);
  expect(result).toEqual([
    rows[1],
    { label: "Other", amount: 30, note: "first" },
  ]);
  expect(result[0]).toBe(rows[1]);
  expect(rows[0].amount).toBe(10);
});
it("validates enabled static values but permits inline templates before interpolation", () => {
  const base = {
    type: "PieChart",
    dataKey: "amount",
    nameKey: "label",
    aggregateBelow: 0.2,
  };
  expect(
    pieChartSchema.safeParse({
      ...base,
      data: [{ label: "{{label}}", amount: "{{amount}}" }],
    }).success,
  ).toBe(true);
  for (const amount of [-1, Infinity, NaN, "1", true, null]) {
    expect(
      pieChartSchema.safeParse({ ...base, data: [{ label: "A", amount }] })
        .success,
    ).toBe(false);
  }
});
