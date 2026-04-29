import { describe, it, expect } from "vitest";
import { toggleHabitCompletion } from "@/lib/habits";
import { Habit } from "@/types/habit";

const baseHabit: Habit = {
  id: "1",
  userId: "user1",
  name: "Drink Water",
  description: "",
  frequency: "daily",
  createdAt: new Date().toISOString(),
  completions: [],
};

const today = new Date().toISOString().split("T")[0];

describe("toggleHabitCompletion", () => {
  it("adds a completion date when the date is not present", () => {
    const result = toggleHabitCompletion(baseHabit, today);
    expect(result.completions).toContain(today);
  });

  it("removes a completion date when the date already exists", () => {
    const habit = { ...baseHabit, completions: [today] };
    const result = toggleHabitCompletion(habit, today);
    expect(result.completions).not.toContain(today);
  });

  it("does not mutate the original habit object", () => {
    const habit = { ...baseHabit, completions: [] };
    toggleHabitCompletion(habit, today);
    expect(habit.completions).toHaveLength(0);
  });

  it("does not return duplicate completion dates", () => {
    const habit = { ...baseHabit, completions: [today] };
    const result = toggleHabitCompletion(habit, today);
    const count = result.completions.filter((d) => d === today).length;
    expect(count).toBeLessThanOrEqual(1);
  });
});
