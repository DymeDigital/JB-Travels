import { useEffect } from "react";
import { set, unset, useFormValue, type NumberInputProps } from "sanity";
import { sumLineItems, type LineItem } from "../../lib/lineItems";

/**
 * When the booking has line items, the quoted amount is their sum and can't be
 * typed by hand. With no line items it behaves like a normal number field.
 */
export function QuoteTotalInput(props: NumberInputProps) {
  const { value, onChange, readOnly } = props;
  const lineItems = useFormValue(["lineItems"]) as LineItem[] | undefined;
  const hasItems = Array.isArray(lineItems) && lineItems.length > 0;
  const total = hasItems ? sumLineItems(lineItems) : undefined;

  useEffect(() => {
    if (!hasItems || readOnly || total === value) return;
    onChange(total && total > 0 ? set(total) : unset());
  }, [hasItems, total, value, readOnly, onChange]);

  if (!hasItems) return props.renderDefault(props);

  return (
    <div>
      {props.renderDefault({ ...props, readOnly: true })}
      <p style={{ margin: "6px 0 0", fontSize: 13, opacity: 0.7 }}>
        {total && total > 0
          ? "Calculated from the line items above."
          : "Line items add up to zero or less. Adjust them before sending a payment link."}
      </p>
    </div>
  );
}
