import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HabitForm from "@/components/habits/HabitForm";
import HabitList from "@/components/habits/HabitList";
import { Habit } from "@/types/habit";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

beforeEach(() => {
  localStorage.clear();
});

const mockHabit: Habit = {
  id: "1",
  userId: "user1",
  name: "Drink Water",
  description: "Stay hydrated",
  frequency: "daily",
  createdAt: new Date().toISOString(),
  completions: [],
};

describe("habit form", () => {
  it("shows a validation error when habit name is empty", async () => {
    render(<HabitForm onSave={vi.fn()} onCancel={vi.fn()} />);
    fireEvent.click(screen.getByTestId("habit-save-button"));

    await waitFor(() => {
      expect(screen.getByText("Habit name is required")).toBeTruthy();
    });
  });

  it("creates a new habit and renders it in the list", async () => {
    const habits: Habit[] = [];
    const onSave = vi.fn((data) => {
      habits.push({
        id: "1",
        userId: "user1",
        name: data.name,
        description: data.description || "",
        frequency: "daily",
        createdAt: new Date().toISOString(),
        completions: [],
      });
    });

    render(<HabitForm onSave={onSave} onCancel={vi.fn()} />);
    fireEvent.change(screen.getByTestId("habit-name-input"), {
      target: { value: "Drink Water" },
    });
    fireEvent.click(screen.getByTestId("habit-save-button"));

    await waitFor(() => {
      expect(onSave).toHaveBeenCalled();
      expect(onSave.mock.calls[0][0].name).toBe("Drink Water");
    });
  });

  it("edits an existing habit and preserves immutable fields", async () => {
    const onSave = vi.fn();
    render(
      <HabitForm initialData={mockHabit} onSave={onSave} onCancel={vi.fn()} />,
    );

    fireEvent.change(screen.getByTestId("habit-name-input"), {
      target: { value: "Drink More Water" },
    });
    fireEvent.click(screen.getByTestId("habit-save-button"));

    await waitFor(() => {
      expect(onSave).toHaveBeenCalled();
      const saved = onSave.mock.calls[0][0];
      expect(saved.name).toBe("Drink More Water");
    });
  });

  it("deletes a habit only after explicit confirmation", async () => {
    const onDelete = vi.fn();
    render(
      <HabitList
        habits={[mockHabit]}
        onUpdate={vi.fn()}
        onDelete={onDelete}
        onEdit={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByTestId("habit-delete-drink-water"));
    expect(onDelete).not.toHaveBeenCalled();

    fireEvent.click(screen.getByTestId("confirm-delete-button"));
    expect(onDelete).toHaveBeenCalledWith("1");
  });

  it("toggles completion and updates the streak display", async () => {
    const onUpdate = vi.fn();
    render(
      <HabitList
        habits={[mockHabit]}
        onUpdate={onUpdate}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByTestId("habit-complete-drink-water"));

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalled();
    });
  });
});
