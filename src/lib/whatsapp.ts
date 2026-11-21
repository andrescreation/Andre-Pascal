import { site } from "@/content/site";

export interface WhatsAppPayload {
  name: string;
  email: string;
  type: string;
  budget?: string;
  message: string;
}

export function buildWhatsAppUrl(f: WhatsAppPayload): string {
  const digits = site.phone.replace(/[^\d]/g, "");
  const text = `Hi Andre, I'm ${f.name} (${f.email}).\nI'm reaching out about: ${f.type}\nBudget: ${f.budget || "Not specified"}\n\n${f.message}\n\n(Sent from andrescreation.vercel.app)`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
