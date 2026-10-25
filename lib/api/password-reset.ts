export type ResetRole = "jobseeker" | "employer";

export type ResetResult = { ok: true } | { ok: false; message: string };
export type VerifyResult =
  | { ok: true; resetToken: string }
  | { ok: false; message: string };

const wait = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * TODO: replace these three functions with your real API calls. Demo stubs only.
 *
 * Server rules to keep:
 * - requestPasswordReset must answer the same way whether or not the email has an
 *   account, so nobody can use it to find out who is registered.
 * - Limit how often codes can be requested and how many wrong codes are allowed.
 * - verifyPasswordResetOtp returns a short-lived, single-use token. resetPassword
 *   needs that token, so the reset step cannot be reached without the code.
 */

/** Sends the code. Also used for "resend". */
export async function requestPasswordReset(
  _role: ResetRole,
  _email: string,
): Promise<ResetResult> {
  await wait();
  return { ok: true };
}

/** The demo code "000000" fails so you can see the error state. */
export async function verifyPasswordResetOtp(
  _role: ResetRole,
  _email: string,
  code: string,
): Promise<VerifyResult> {
  await wait();
  if (code === "000000") {
    return {
      ok: false,
      message:
        "That code is not correct or has expired. Check it or request a new one.",
    };
  }
  return { ok: true, resetToken: "demo-reset-token" };
}

export async function resetPassword(
  _role: ResetRole,
  _resetToken: string,
  _newPassword: string,
): Promise<ResetResult> {
  await wait();
  return { ok: true };
}
