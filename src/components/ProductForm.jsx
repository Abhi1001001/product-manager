import { useEffect, useState } from "react";

export default function ProductForm({ onSave, editingProduct }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingProduct) setForm(editingProduct);
  }, [editingProduct]);

  // form validation ---------------------------->
  const validate = () => {
    const err = {};
    if (!form.name) err.name = "Name is required";
    if (!form.price) err.price = "Price is required";
    if (!form.category) err.category = "Category is required";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);

    if (Object.keys(err).length === 0) {
      onSave(form);
      setForm({
        name: "",
        price: "",
        category: "",
        stock: "",
        description: "",
      });
    }
  };

  return (
    <div className="flex items-center justify-center bg-slate-900 text-slate-100 md:py-4 rounded-2xl md:rounded-none">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-slate-950/60 p-6">
        <form className="card space-y-5" onSubmit={handleSubmit}>
          <h3 className="md:text-2xl text-lg md:font-semibold tracking-tight mb-6 text-slate-50">
            {editingProduct ? "Edit Product" : "Add Product"}
          </h3>

          <input
            placeholder="Name"
            className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <div className="error">{errors.name}</div>}

          <input
            className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          {errors.price && <div className="error">{errors.price}</div>}

          <input
            className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          {errors.category && <div className="error">{errors.category}</div>}

          <input
            className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />

          <textarea
            className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <button
            className="inline-flex items-center justify-center gap-2 w-full md:w-auto rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-medium text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 active:bg-emerald-500/90 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition"
            type="submit"
          >
            {editingProduct ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}
