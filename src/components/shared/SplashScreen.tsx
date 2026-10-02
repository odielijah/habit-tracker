"use client";

const SplashScreen = () => {
  return (
    <div
      data-testid="splash-screen"
      className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
    >
      <div className="flex flex-col items-center animate-pulse">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Habit Tracker
        </h1>
        <p className="mt-2 text-gray-500 font-medium">
          Loading your progress...
        </p>
      </div>

      <div className="absolute bottom-10">
        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
