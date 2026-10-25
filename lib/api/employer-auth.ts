import type { CompanyRegistration } from "@/lib/validation/employer-auth";

export type AuthResult =
  | { ok: true }
  | { ok: false; message: string; field?: "email" };

const wait = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * TODO: replace the three functions below with your real API calls.
 * They are demo stubs and always succeed, except the OTP "000000", which fails
 * so you can see the error state.
 */

/** Creates the company and sends the OTP email. */
export async function registerCompany(
  _data: CompanyRegistration,
): Promise<AuthResult> {
  await wait();
  // If the email is taken, return:
  // { ok: false, field: "email", message: "This email is already registered." }
  return { ok: true };
}

/** Checks the code. On success the server should also start the session (cookie). */
export async function verifyCompanyOtp(
  _email: string,
  code: string,
): Promise<AuthResult> {
  await wait();
  if (code === "000000") {
    return {
      ok: false,
      message:
        "That code is not correct or has expired. Check it or request a new one.",
    };
  }
  return { ok: true };
}

export async function resendCompanyOtp(_email: string): Promise<AuthResult> {
  await wait();
  return { ok: true };
}
