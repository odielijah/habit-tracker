import { Habit } from "@/types/habit";

export function toggleHabitCompletion(habit: Habit, date: string): Habit {
  const completions = habit.completions;

  const alreadyCompleted = completions.includes(date);

  const newCompletions = alreadyCompleted
    ? completions.filter((d) => d !== date) // remove it
    : [...new Set([...completions, date])]; // add it, no duplicates

  return { ...habit, completions: newCompletions }; // return new object, don't mutate
}
