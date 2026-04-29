"use client";

import { Habit } from "@/types/habit";
import { getHabitSlug } from "@/lib/slug";
import { calculateCurrentStreak } from "@/lib/streaks";
import { toggleHabitCompletion } from "@/lib/habits";
import { useState } from "react";

interface HabitCardProps {
  habit: Habit;
  onUpdate: (updatedHabit: Habit) => void;
  onDelete: (id: string) => void;
  onEdit: (habit: Habit) => void;
}

export default function HabitCard({
  habit,
  onUpdate,
  onDelete,
  onEdit,
}: HabitCardProps) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const slug = getHabitSlug(habit.name);
  const today = new Date().toISOString().split("T")[0];
  const isCompletedToday = habit.completions.includes(today);
  const streak = calculateCurrentStreak(habit.completions, today);

  const handleToggle = () => {
    const updatedHabit = toggleHabitCompletion(habit, today);
    onUpdate(updatedHabit);
  };

  const handleDelete = () => {
    setConfirmingDelete(true);
  };

  return (
    <div
      data-testid={`habit-card-${slug}`}
      className={`p-4 rounded-xl border transition-all ${
        isCompletedToday
          ? "bg-green-50 border-green-200"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex flex-col justify-between items-start">
        <div className="flex justify-between items-start w-full">
          <div>
            <h3 className="font-bold text-lg text-gray-900">{habit.name}</h3>
            <p className="text-sm text-gray-500">{habit.description}</p>
          </div>

          <div className="flex gap-1 md:gap-2">
            <button
              onClick={() => onEdit(habit)}
              data-testid={`habit-edit-${slug}`}
              className="p-2 text-[14px] md:text-[16px] text-gray-400 hover:text-black transition-colors"
              aria-label="Edit habit"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              data-testid={`habit-delete-${slug}`}
              className="p-2 text-[14px] md:text-[16px] text-gray-400 hover:text-red-600 transition-colors"
              aria-label="Delete habit"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Current Streak:
          </span>
          <span
            data-testid={`habit-streak-${slug}`}
            className="font-bold text-black"
          >
            {streak} {streak === 1 ? "day" : "days"}
          </span>
        </div>
      </div>

      <button
        onClick={handleToggle}
        data-testid={`habit-complete-${slug}`}
        className={`mt-4 w-full py-2 rounded-lg text-[14px] md:text-[16px] font-bold transition-all ${
          isCompletedToday
            ? "bg-green-600 text-white shadow-inner"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
        }`}
      >
        {isCompletedToday ? "✓ Completed Today" : "Mark as Done"}
      </button>
      {confirmingDelete && (
        <div className="mt-2 flex gap-2">
          <button
            data-testid="confirm-delete-button"
            onClick={() => onDelete(habit.id)}
            className="flex-1 p-2 text-[14px] md:text-[16px] bg-red-600 text-white rounded font-bold"
          >
            Confirm Delete
          </button>
          <button
            onClick={() => setConfirmingDelete(false)}
            className="flex-1 text-[14px] md:text-[16px] py-2 border rounded"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
