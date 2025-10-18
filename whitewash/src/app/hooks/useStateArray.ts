import { useState } from "react"

export const useStateArray = <T>(
  intialValue: T[],
): readonly [T[], (newValue: T) => void] => {
  const [value, setValue] = useState<T[]>(intialValue)

  const addValue = (newValue: T) => setValue((prev) => [...prev, newValue])

  return [value, addValue] as const
}
