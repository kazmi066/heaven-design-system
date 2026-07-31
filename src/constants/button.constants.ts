export const ButtonTypes = ["button", "submit", "reset"] as const;
export type ButtonType = (typeof ButtonTypes)[number];
