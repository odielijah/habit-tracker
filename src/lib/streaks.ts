
export function calculateCurrentStreak(
  completions: string[],
  today?: string,
): number {
  const todayDate = today ?? getLocalDateString(new Date())
  

  const unique = [...new Set(completions)].sort()

  if (!unique.includes(todayDate)) return 0

  let streak = 0
  let currentDate = new Date(todayDate + 'T12:00:00')

  while (true) {
    const dateStr = getLocalDateString(currentDate)
    if (unique.includes(dateStr)) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else {
      break
    }
  }

  return streak
}

function getLocalDateString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}