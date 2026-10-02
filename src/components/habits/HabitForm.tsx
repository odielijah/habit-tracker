"use client";

import { useState, useEffect } from "react";
import { Habit } from "@/types/habit";
import { validateHabitName } from "@/lib/validators";

interface HabitFormProps {
  initialData?: Habit | null;
  onSave: (data: Partial<Habit>) => void;
  onCancel: () => void;
}

export default function HabitForm({
  initialData,
  onSave,
  onCancel,
}: HabitFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateHabitName(name);

    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    onSave({
      name: validation.value,
      description,
      frequency: "daily", // Section 12: Frequency remains daily
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
      <form
        onSubmit={handleSubmit}
        data-testid="habit-form"
        className="bg-white w-full max-w-md rounded-xl p-6 shadow-2xl"
      >
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Habit" : "Create Habit"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              data-testid="habit-name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="e.g. Drink Water"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description (Optional)
            </label>
            <textarea
              data-testid="habit-description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Frequency</label>
            <select
              data-testid="habit-frequency-select"
              className="w-full p-2 border rounded bg-gray-50"
              disabled
            >
              <option value="daily">Daily</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 border rounded font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            data-testid="habit-save-button"
            className="flex-1 py-2 bg-black text-white rounded font-bold"
          >
            Save Habit
          </button>
        </div>
      </form>
    </div>
  );
}
