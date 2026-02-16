import { atomWithStorage } from "jotai/utils"

// Define an atom with storage for OTP email
export const otpEmailAtom = atomWithStorage<string | null>("otp-email", null)
