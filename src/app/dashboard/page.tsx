"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, logOut } from "@/lib/auth";
import { getHabits, saveHabits } from "@/lib/storage";
import { Habit } from "@/types/habit";
import HabitList from "@/components/habits/HabitList";
import HabitForm from "@/components/habits/HabitForm";

export default function DashboardPage() {
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [session, setSession] = useState<{ userId: string; email: string } | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  useEffect(() => {
    const currentSession = getSession();
    if (!currentSession) {
      router.push("/login");
      return;
    }
    setSession(currentSession);
    refreshHabits(currentSession.userId);
  }, [router]);

  const refreshHabits = (userId: string) => {
    const all = getHabits();
    setHabits(all.filter((h) => h.userId === userId));
  };

  const handleSaveHabit = (data: Partial<Habit>) => {
    const all = getHabits();
    if (editingHabit) {
      // Edit logic (Section 12: preserve immutable fields)
      const updated = all.map((h) => h.id === editingHabit.id ? { ...h, ...data } : h);
      saveHabits(updated);
    } else {
      // Create logic (Section 12: belong to logged-in user)
      const newHabit: Habit = {
        id: crypto.randomUUID(),
        userId: session!.userId,
        name: data.name!,
        description: data.description || "",
        frequency: 'daily',
        createdAt: new Date().toISOString(),
        completions: [],
      };
      saveHabits([...all, newHabit]);
    }
    setIsFormOpen(false);
    setEditingHabit(null);
    refreshHabits(session!.userId);
  };

  const handleUpdateCompletions = (updatedHabit: Habit) => {
    const all = getHabits();
    saveHabits(all.map((h) => (h.id === updatedHabit.id ? updatedHabit : h)));
    refreshHabits(session!.userId);
  };

  const handleDeleteHabit = (id: string) => {
    const all = getHabits();
    saveHabits(all.filter((h) => h.id !== id));
    refreshHabits(session!.userId);
  };

  if (!session) return null;

  return (
    <main data-testid="dashboard-page" className="min-h-screen bg-gray-50 pb-24">
      <nav className="bg-white border-b p-4 mb-6">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <h1 className="font-bold text-xl">Habit Tracker</h1>
          <button 
            data-testid="auth-logout-button" 
            onClick={() => { logOut(); router.push("/login"); }}
            className="text-sm font-medium text-red-500"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4">
        <HabitList 
          habits={habits} 
          onUpdate={handleUpdateCompletions}
          onDelete={handleDeleteHabit}
          onEdit={(h) => { setEditingHabit(h); setIsFormOpen(true); }}
        />
      </div>

      <button
        data-testid="create-habit-button"
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-8 py-4 rounded-full font-bold shadow-xl active:scale-95 transition-transform"
      >
        + Add New Habit
      </button>

      {isFormOpen && (
        <HabitForm 
          initialData={editingHabit} 
          onSave={handleSaveHabit} 
          onCancel={() => { setIsFormOpen(false); setEditingHabit(null); }} 
        />
      )}
    </main>
  );
}