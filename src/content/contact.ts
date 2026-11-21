import { ContactSchema } from "./schema";

export const contactContent = ContactSchema.parse({
  tag: "Contact",
  heading: "LET'S BUILD SOMETHING",
  paragraph:
    "Hiring for a design or design engineering role? Need a brand and a website that match? Tell me what you're working on. I usually reply within a day.",
  recruiterLine:
    "Recruiters: my CV is one click away, and I'm happy to do a call in UK, EU or US hours.",
  helperText:
    "This opens WhatsApp with your message ready to send. Prefer email? Write to andrescreation1@gmail.com.",
  fields: {
    name: {
      label: "Your name",
      placeholder: "Jane Doe",
      error: "Please add your name.",
    },
    email: {
      label: "Your email",
      placeholder: "jane@company.com",
      error: "Please add a valid email.",
    },
    type: {
      label: "What do you need?",
      options: [
        "A full time hire",
        "Brand identity",
        "Website or landing page",
        "Product UI/UX",
        "Something else",
      ],
      error: "Please pick one.",
    },
    budget: {
      label: "Budget",
      options: [
        "Under $1,000",
        "$1,000 to $3,000",
        "$3,000 to $7,000",
        "$7,000+",
        "Not sure yet",
        "It's a salaried role",
      ],
    },
    message: {
      label: "Message",
      placeholder: "A few lines about the role or project",
      error: "A short message helps me reply properly.",
    },
    submit: "Send on WhatsApp",
  },
});
