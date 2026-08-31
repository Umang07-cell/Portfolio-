import { motion } from "framer-motion";
import { useMemo, useState } from "react";

export default function ArchitectureDiagram({ nodes }) {
  const [activeId, setActiveId] = useState(null);

  const rows = useMemo(() => {
    const grouped = [];
    let currentRow = null;
    let bucket = [];
    nodes.forEach((node) => {
      if (node.row !== currentRow) {
        if (bucket.length) grouped.push(bucket);
        bucket = [node];
        currentRow = node.row;
      } else {
        bucket.push(node);
      }
    });
    if (bucket.length) grouped.push(bucket);
    return grouped;
  }, [nodes]);

  return (
    <div className="arch-diagram" role="img" aria-label="FinSight system architecture flow diagram">
      {rows.map((row, rowIndex) => (
        <div className="arch-diagram__row-wrap" key={rowIndex}>
          {rowIndex > 0 && (
            <motion.div
              className="arch-diagram__connector"
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          )}
          <div className={`arch-diagram__row${row.length > 1 ? " arch-diagram__row--branch" : ""}`}>
            {row.map((node, i) => (
              <motion.button
                type="button"
                key={node.id}
                className={`arch-node mono${activeId === node.id ? " arch-node--active" : ""}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
                onMouseEnter={() => setActiveId(node.id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(node.id)}
                onBlur={() => setActiveId(null)}
                onClick={() => setActiveId((id) => (id === node.id ? null : node.id))}
              >
                {node.label}
              </motion.button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
