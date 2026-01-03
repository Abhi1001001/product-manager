export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div
      className="card w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/60 
                    hover:border-emerald-400/70 hover:shadow-emerald-500/25 transition 
                    flex flex-col gap-3"
    >
      <h4 className="text-base md:text-lg font-semibold text-slate-50 break-words">
        {product.name}
      </h4>
      <div className="space-y-1 text-sm md:text-[15px] text-slate-200">
        <p className="font-medium text-slate-400">
          <span className="font-medium text-slate-400">Price:</span>{" "}
          <span className="text-emerald-300">₹{product.price}</span>
        </p>
        <p font-medium text-slate-400>
          <span className="font-medium text-slate-400">Category:</span>{" "}
          <span className="text-slate-100">{product.category}</span>
        </p>
        <p>
          <span className="font-medium text-slate-400">Stock:</span>{" "}
          <span
            className={`${
              product.stock > 10
                ? "text-emerald-300"
                : product.stock > 0
                ? "text-amber-300"
                : "text-rose-300"
            }`}
          >
            {product.stock}
          </span>
        </p>
      </div>
      <div className="mt-2 flex flex-wrap gap-3">
        <button
          className="inline-flex items-center justify-center rounded-lg border border-slate-600 
                     bg-slate-800/80 px-4 py-1.5 text-sm font-medium text-slate-100 
                     hover:border-emerald-400 hover:text-emerald-300 hover:bg-slate-800 
                     active:scale-[0.98] transition"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>
        <button
          className="inline-flex items-center justify-center rounded-lg border border-rose-500/50 
                     bg-rose-500/15 px-4 py-1.5 text-sm font-medium text-rose-200 
                     hover:bg-rose-500/25 hover:border-rose-400 hover:text-rose-100 
                     active:scale-[0.98] transition"
          onClick={() => onDelete(product.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
