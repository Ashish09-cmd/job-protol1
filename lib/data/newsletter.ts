import type { NewsletterValues } from "@/lib/validation/newsletter";

/**
 * Temporary stand-in so the form can be built and tested.
 * TODO: replace the body with a real request, e.g.
 *   const res = await fetch("/api/newsletter", { method: "POST", body: JSON.stringify(values) });
 *   if (!res.ok) throw new Error("Subscription failed");
 * Validate the same schema again on the server. Never trust the browser.
 */
export async function subscribeToNewsletter(
  values: NewsletterValues,
): Promise<void> {
  void values;
  await new Promise((resolve) => setTimeout(resolve, 600));
}
