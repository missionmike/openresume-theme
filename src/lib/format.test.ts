import { formatLongDate } from "@/lib/format";

describe("formatDate", () => {
  it("should return an empty string for null or undefined timestamp", () => {
    expect(formatLongDate(null)).toBe("");
    expect(formatLongDate(undefined)).toBe("");
  });

  it("should format the timestamp correctly", () => {
    const timestamp = (parseInt("1633046400000") + 24 * 60 * 60 * 1000).toString(); // October 2, 2021
    expect(formatLongDate(timestamp)).toBe("October 2021");
  });
});
