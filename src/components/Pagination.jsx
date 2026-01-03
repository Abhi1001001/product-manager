export default function Pagination({ total, perPage, current, onChange }) {
  const pages = Math.ceil(total / perPage);

  return (
    <div className="pagination">
      {[...Array(pages)].map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          style={{ background: current === i + 1 ? "#333" : "#335", color: "#fff" }}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
