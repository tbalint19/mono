export type AddResult = {
  value: number
}

export const add = (a: number, b: number): AddResult => {
  console.log("IIIITTTT")
  return { value: a + b}
}