import ProductCard from "./ProductCard";

export default function ProductList({ products, view, onEdit, onDelete }) {
  if (view === "grid") {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onEdit={onEdit} />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-slate-950/60 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800">
        <h3 className="text-sm font-semibold tracking-wide text-slate-200">
          Products
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="table min-w-full border-collapse text-sm text-left">
          <thead className="bg-slate-900/90">
            <tr className="text-xs uppercase tracking-wide text-slate-400">
              <th className="px-6 py-3 border-b border-slate-800">Name</th>
              <th className="px-6 py-3 border-b border-slate-800">Price</th>
              <th className="px-6 py-3 border-b border-slate-800">Category</th>
              <th className="px-6 py-3 border-b border-slate-800">Stock</th>
              <th className="px-6 py-3 border-b border-slate-800 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="border-b border-slate-800/80 last:border-b-0 hover:bg-slate-800/60 transition-colors"
              >
                <td className="px-6 py-3 text-slate-300 text-nowrap">
                  {p.name}
                </td>
                <td className="px-6 py-3 text-slate-300">{p.price}</td>
                <td className="px-6 py-3 text-slate-300 text-nowrap">
                  {p.category}
                </td>
                <td
                  className={`px-6 py-3 ${
                    p.stock > 10
                      ? "text-emerald-300"
                      : p.stock > 0
                      ? "text-amber-300"
                      : "text-rose-300"
                  } `}
                >
                  {p.stock}
                </td>
                <td className="px-6 py-3 flex justify-end items-center">
                  <button
                    className="inline-flex items-center rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-700 hover:text-emerald-300 border border-slate-700/80 hover:border-emerald-400/60 transition"
                    onClick={() => onEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="ml-2 inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium text-rose-300 bg-slate-800 hover:bg-rose-500/10 border border-rose-500/40 hover:border-rose-400 transition"
                    onClick={() => onDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
