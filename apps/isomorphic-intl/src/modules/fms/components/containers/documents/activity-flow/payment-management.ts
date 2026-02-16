export const paymentManagementWorkflow = [
  {
    title: "Payment Setup",
    description:
      "Configure payment methods and options.",
    tasks: [
      {
        title: "Define Modes of Payment",
        description: "Configure available payment types (e.g., cash, bank transfer, card).",
      },
    ],
  },
  {
    title: "Payment Processing",
    description:
      "Manage the payment request and approval workflow.",
    tasks: [
      {
        title: "Submit Payment Requests",
        description: "Initiate requests for vendor or employee payments.",
      },
      {
        title: "Approve Requests",
        description: "Review and approve payment transactions.",
      },
      {
        title: "Create and Process Payments",
        description: "Finalize payment transactions.",
      },
      {
        title: "Stripe Integration (Optional)",
        description: "Enable online payments using the Stripe gateway.",
      },
    ],
  },
]; 