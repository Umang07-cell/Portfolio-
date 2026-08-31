const VARIANT_COLOR = {
  success: "var(--success)",
  accent: "var(--accent-primary)",
  warning: "var(--warning)",
};

export default function Badge({ children, variant = "success" }) {
  const color = VARIANT_COLOR[variant] || VARIANT_COLOR.success;
  return (
    <span
      className="badge mono"
      style={{
        color,
        borderColor: color,
      }}
    >
      {children}
    </span>
  );
}
