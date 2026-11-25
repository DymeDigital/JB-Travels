import { useState } from "react";
import { type DocumentActionComponent, useClient } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

const formatZar = (n: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(n);

type BookingDoc = {
  customerName?: string;
  customerEmail?: string;
  quotedAmount?: number;
  status?: string;
  stitchLinkId?: string;
  quoteRequestedAt?: string;
  quoteError?: string;
};

/**
 * Stamps `quoteRequestedAt` on the published booking. A Sanity webhook
 * (app/api/webhooks/sanity) picks that up, creates the Stitch link server-side
 * and emails the customer. The Stitch credentials never touch the browser.
 */
export const SendPaymentLinkAction: DocumentActionComponent = (props) => {
  const { id, draft, published, onComplete } = props;
  const client = useClient({ apiVersion: "2025-01-01" });
  const [confirming, setConfirming] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const doc = published as BookingDoc | null;
  if (!doc) return null; // never published — nothing to send yet
  if (doc.stitchLinkId || doc.status === "paid" || doc.status === "cancelled") return null;

  const amount = Number(doc.quotedAmount) || 0;
  const sending = (submitting || doc.quoteRequestedAt) && !doc.quoteError;

  let disabledReason: string | undefined;
  if (draft) disabledReason = "Publish your changes first — the quote uses the published values.";
  else if (amount < 1) disabledReason = "Add line items or a Quoted Amount (Quote & Payment tab) and publish.";
  else if (!doc.customerEmail) disabledReason = "Add the customer's email and publish.";

  return {
    label: sending ? "Sending payment link…" : "Send payment link",
    icon: EnvelopeIcon,
    tone: "positive",
    disabled: Boolean(sending || disabledReason),
    title: disabledReason,
    onHandle: () => setConfirming(true),
    dialog: confirming && {
      type: "confirm",
      tone: "positive",
      message: `Email ${doc.customerName ?? "the customer"} (${doc.customerEmail}) a Stitch payment link for ${formatZar(amount)}?`,
      onCancel: () => {
        setConfirming(false);
        onComplete();
      },
      onConfirm: async () => {
        setConfirming(false);
        setSubmitting(true);
        try {
          await client
            .patch(id)
            .set({ quoteRequestedAt: new Date().toISOString() })
            .unset(["quoteError"])
            .commit();
        } finally {
          setSubmitting(false);
          onComplete();
        }
      },
    },
  };
};
