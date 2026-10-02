import { describe, it, expect } from "vitest";
import { calculateCurrentStreak } from "@/lib/streaks";

const today = new Date().toISOString().split("T")[0];

function subtractDays(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split("T")[0];
}

const yesterday = subtractDays(1);
const twoDaysAgo = subtractDays(2);

/* MENTOR_TRACE_STAGE3_HABIT_A91 */
describe("calculateCurrentStreak", () => {
  it("returns 0 when completions is empty", () => {
    expect(calculateCurrentStreak([])).toBe(0);
  });

  it("returns 0 when today is not completed", () => {
    expect(calculateCurrentStreak([yesterday])).toBe(0);
  });

  it("returns the correct streak for consecutive completed days", () => {
    expect(calculateCurrentStreak([today, yesterday])).toBe(2);
  });

  it("ignores duplicate completion dates", () => {
    expect(calculateCurrentStreak([today, today, yesterday])).toBe(2);
  });

  it("breaks the streak when a calendar day is missing", () => {
    expect(calculateCurrentStreak([today, twoDaysAgo])).toBe(1);
  });
});
