"use client";

import { Habit } from "@/types/habit";
import HabitCard from "./HabitCard";

interface HabitListProps {
  habits: Habit[];
  onUpdate: (updatedHabit: Habit) => void;
  onDelete: (id: string) => void;
  onEdit: (habit: Habit) => void;
}

export default function HabitList({
  habits,
  onUpdate,
  onDelete,
  onEdit,
}: HabitListProps) {
  // Section 10 Requirement: Render empty state with specific data-testid
  if (habits.length === 0) {
    return (
      <div
        data-testid="empty-state"
        className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-2xl border border-dashed border-gray-300"
      >
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">🌱</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">No habits found</h3>
        <p className="text-gray-500 max-w-xs mt-1">
          You haven't created any habits yet. Click the button below to start
          your journey!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
