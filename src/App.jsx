import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";

export default function App() {
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem("products");
    return stored ? JSON.parse(stored) : [];
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const STORAGE_KEY = "products";

  // Load products from localStorage -------------->
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  // syncronize products with localStorage -------------->
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const handleSave = (product) => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
      setEditingProduct(null);
    } else {
      setProducts([...products, { ...product, id: uuid() }]);
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // apply pagination only for table view --------------->
  const start = (currentPage - 1) * itemsPerPage;
  const tableProducts = filteredProducts.slice(start, start + itemsPerPage);

  // decide what to render ------------------------------------>
  const visibleProducts = view === "table" ? tableProducts : filteredProducts;

  // toggle between table and grid view --------------->
  const toggleView = () => {
    setView((prev) => (prev === "table" ? "grid" : "table"));
    setCurrentPage(1);
  };

  return (
    <div className="container text-white">
      <h2 className="md:text-3xl text-2xl font-bold py-2">Product Manager</h2>

      <ProductForm onSave={handleSave} editingProduct={editingProduct} />

      <div className="header">
        <input
          placeholder="Search product..."
          className="w-full rounded-xl border border-slate-700 bg-slate-900/80 py-2.5 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm shadow-slate-950/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 transition"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <button
          className="inline-flex items-center rounded-full bg-slate-900/80 border border-slate-700 px-1 py-1 text-xs text-slate-300 shadow-sm shadow-slate-950/40 hover:border-emerald-400/70 transition"
          onClick={toggleView}
        >
          Switch to {view === "table" ? "Card" : "List"} View
        </button>
      </div>

      <ProductList
        products={visibleProducts}
        view={view}
        onEdit={setEditingProduct}
        onDelete={handleDelete}
      />

      {view === "table" && (
        <Pagination
          total={filteredProducts.length}
          perPage={itemsPerPage}
          current={currentPage}
          onChange={setCurrentPage}
        />
      )}
    </div>
  );
}
