export default function TechTag({ children, style }) {
  return (
    <span className="tech-tag mono" style={style}>
      {children}
    </span>
  );
}
