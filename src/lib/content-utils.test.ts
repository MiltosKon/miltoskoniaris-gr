import { describe, expect, it } from "vitest";
import { filterByTag, readTime } from "./content-utils";

describe("readTime", () => {
  it("rounds to minutes at 220 wpm, minimum 1", () => {
    expect(readTime("hello world")).toBe(1);
    expect(readTime(Array(660).fill("w").join(" "))).toBe(3);
  });
});

describe("filterByTag", () => {
  const items = [{ tags: ["qa"] }, { tags: ["data", "qa"] }, { tags: ["music"] }];
  it("returns only matching items, or all without a tag", () => {
    expect(filterByTag(items, "qa")).toHaveLength(2);
    expect(filterByTag(items, null)).toHaveLength(3);
  });
});
