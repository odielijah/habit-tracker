import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import * as auth from "@/lib/auth";

// Mock useRouter
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

beforeEach(() => {
  localStorage.clear();
});

describe("auth flow", () => {
  it("submits the signup form and creates a session", async () => {
    render(<SignupForm />);
    fireEvent.change(screen.getByTestId("auth-signup-email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("auth-signup-password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByTestId("auth-signup-submit"));

    await waitFor(() => {
      const session = localStorage.getItem("habit-tracker-session");
      expect(session).not.toBeNull();
    });
  });

  it("shows an error for duplicate signup email", async () => {
    // Create user first
    auth.signUp("test@example.com", "password123");

    render(<SignupForm />);
    fireEvent.change(screen.getByTestId("auth-signup-email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("auth-signup-password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByTestId("auth-signup-submit"));

    await waitFor(() => {
      expect(screen.getByText("User already exists")).toBeTruthy();
    });
  });

  it("submits the login form and stores the active session", async () => {
    auth.signUp("test@example.com", "password123");
    auth.logOut();

    render(<LoginForm />);
    fireEvent.change(screen.getByTestId("auth-login-email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("auth-login-password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByTestId("auth-login-submit"));

    await waitFor(() => {
      const session = localStorage.getItem("habit-tracker-session");
      expect(session).not.toBeNull();
    });
  });

  it("shows an error for invalid login credentials", async () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByTestId("auth-login-email"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByTestId("auth-login-password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByTestId("auth-login-submit"));

    await waitFor(() => {
      expect(screen.getByText("Invalid email or password")).toBeTruthy();
    });
  });
});
