import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { Plus, Search, Pencil, Trash2, Eye, Package, Upload } from "lucide-react";
import axios from "axios";
import api from "../api/axios";
import Badge from "../components/Badge";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import Pagination from "../components/Pagination";
import EmptyState from "../components/EmptyState";
import { TableSkeleton } from "../components/Skeleton";

const currency = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n || 0);

const emptyForm = {
  name: "",
  description: "",
  price: "",
  discountPrice: "",
  category: "",
  brand: "",
  sku: "",
  stock: "",
  images: "",
  isActive: true,
};

// Cloudinary Settings
const CLOUD_NAME = "dl4g6bgml";
const UPLOAD_PRESET = "1stclienteccom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [page, setPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [selectedFile, setSelectedFile] = useState(null); // Local image file state
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const [viewProduct, setViewProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/products", {
        params: { page, limit: 10, search: search || undefined, category, stock: stockFilter },
      });
      setProducts(data.data);
      setPagination(data.pagination);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [page, search, category, stockFilter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const refreshCategories = useCallback(() => {
    api
      .get("/products/categories/list")
      .then(({ data }) => setCategories(data.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    refreshCategories();
  }, [refreshCategories]);

  useEffect(() => {
    setPage(1);
  }, [search, category, stockFilter]);

  const openCreateForm = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setSelectedFile(null);
    setFormErrors({});
    setFormOpen(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      discountPrice: product.discountPrice || "",
      category: product.category,
      brand: product.brand || "",
      sku: product.sku,
      stock: product.stock,
      images: (product.images || []).join(", "),
      isActive: product.isActive,
    });
    setSelectedFile(null);
    setFormErrors({});
    setFormOpen(true);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Product name is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.price || Number(form.price) <= 0) errs.price = "Enter a valid price";
    if (form.discountPrice && Number(form.discountPrice) > Number(form.price)) {
      errs.discountPrice = "Discount price cannot exceed price";
    }
    if (!form.category.trim()) errs.category = "Category is required";
    if (!form.sku.trim()) errs.sku = "SKU is required";
    if (form.stock === "" || Number(form.stock) < 0) errs.stock = "Enter a valid stock quantity";

    // Dynamic Validation: Image URL text OR Upload File required
    if (!form.images.trim() && !selectedFile) {
      errs.images = "Either Image URL or File Upload is required";
    }

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Direct Cloudinary Upload using Axios POST
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );

    return response.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    let finalImageUrls = form.images
      ? form.images.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    try {
      // Direct upload if file selected
      if (selectedFile) {
        setUploadingImage(true);
        const uploadedUrl = await uploadImageToCloudinary(selectedFile);
        finalImageUrls.unshift(uploadedUrl);
        setUploadingImage(false);
      }

      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        discountPrice: form.discountPrice ? Number(form.discountPrice) : 0,
        category: form.category.trim(),
        brand: form.brand.trim(),
        sku: form.sku.trim(),
        stock: Number(form.stock),
        images: finalImageUrls,
        isActive: form.isActive,
      };

      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, payload);
        toast.success("Product updated successfully");
      } else {
        await api.post("/products", payload);
        toast.success("Product created successfully");
      }
      setFormOpen(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to save product");
    } finally {
      setSaving(false);
      setUploadingImage(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/products/${deleteTarget._id}`);
      toast.success("Product deleted successfully");
      setDeleteTarget(null);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete product");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products, SKU, brand…"
            className="input-field pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-field w-auto">
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)} className="input-field w-auto">
            <option value="all">All stock</option>
            <option value="in">In stock</option>
            <option value="low">Low stock (≤10)</option>
            <option value="out">Out of stock</option>
          </select>
          <button onClick={openCreateForm} className="btn-primary shrink-0">
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <TableSkeleton rows={6} columns={7} />
        ) : error ? (
          <div className="p-8 text-center text-sm" style={{ color: "var(--color-accent-danger)" }}>
            {error}
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No products found"
            description="Try adjusting your search or filters, or add a new product."
            action={
              <button onClick={openCreateForm} className="btn-primary">
                <Plus size={16} /> Add Product
              </button>
            }
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase tracking-wide text-muted" style={{ borderColor: "var(--color-surface-border)" }}>
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Price</th>
                    <th className="px-4 py-3 font-medium">Stock</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Created</th>
                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b last:border-0 hover:bg-panel-hover" style={{ borderColor: "var(--color-surface-border)" }}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg"
                            style={{ backgroundColor: "var(--color-surface-hover)" }}
                          >
                            {product.images?.[0] ? (
                              <img src={product.images[0]} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <Package size={16} className="text-muted" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-heading">{product.name}</p>
                            <p className="truncate text-xs text-muted">{product.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-body">{product.category}</td>
                      <td className="px-4 py-3">
                        <span className="font-medium text-heading">
                          {currency(product.discountPrice || product.price)}
                        </span>
                        {!!product.discountPrice && (
                          <span className="ml-1.5 text-xs text-muted line-through">{currency(product.price)}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-body">
                        {product.stock === 0 ? (
                          <span style={{ color: "var(--color-accent-danger)" }}>Out of stock</span>
                        ) : product.stock <= 10 ? (
                          <span style={{ color: "var(--color-accent-warning)" }}>{product.stock} left</span>
                        ) : (
                          product.stock
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Badge status={product.isActive ? "active" : "inactive"} />
                      </td>
                      <td className="px-4 py-3 text-xs text-muted">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => setViewProduct(product)} className="rounded-md p-1.5 text-muted hover:bg-panel-hover focus-ring" aria-label="View">
                            <Eye size={15} />
                          </button>
                          <button onClick={() => openEditForm(product)} className="rounded-md p-1.5 text-muted hover:bg-panel-hover focus-ring" aria-label="Edit">
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(product)}
                            className="rounded-md p-1.5 hover:bg-panel-hover focus-ring"
                            style={{ color: "var(--color-accent-danger)" }}
                            aria-label="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              limit={pagination.limit}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      {/* Add / Edit form */}
      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editingProduct ? "Edit Product" : "Add Product"} maxWidth="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-body">Product Name</label>
              <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} disabled={saving} />
              {formErrors.name && <p className="mt-1 text-xs" style={{ color: "var(--color-accent-danger)" }}>{formErrors.name}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-body">Description</label>
              <textarea rows={3} className="input-field" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} disabled={saving} />
              {formErrors.description && <p className="mt-1 text-xs" style={{ color: "var(--color-accent-danger)" }}>{formErrors.description}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-body">Price</label>
              <input type="number" step="0.01" className="input-field" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} disabled={saving} />
              {formErrors.price && <p className="mt-1 text-xs" style={{ color: "var(--color-accent-danger)" }}>{formErrors.price}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-body">Discount Price</label>
              <input type="number" step="0.01" className="input-field" value={form.discountPrice} onChange={(e) => setForm({ ...form, discountPrice: e.target.value })} disabled={saving} />
              {formErrors.discountPrice && <p className="mt-1 text-xs" style={{ color: "var(--color-accent-danger)" }}>{formErrors.discountPrice}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-body">Category</label>
              <input className="input-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} disabled={saving} />
              {formErrors.category && <p className="mt-1 text-xs" style={{ color: "var(--color-accent-danger)" }}>{formErrors.category}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-body">Brand</label>
              <input className="input-field" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} disabled={saving} />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-body">SKU</label>
              <input className="input-field" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} disabled={saving} />
              {formErrors.sku && <p className="mt-1 text-xs" style={{ color: "var(--color-accent-danger)" }}>{formErrors.sku}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-body">Stock</label>
              <input type="number" className="input-field" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} disabled={saving} />
              {formErrors.stock && <p className="mt-1 text-xs" style={{ color: "var(--color-accent-danger)" }}>{formErrors.stock}</p>}
            </div>

            {/* Combined Option: Image URL OR File Upload */}
            <div className="sm:col-span-2 space-y-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-body">Option 1: Image URLs (comma separated)</label>
                <input className="input-field" value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} disabled={saving} placeholder="https://…, https://…" />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-body">Option 2: Direct Image Upload (Cloudinary)</label>
                <div className="flex items-center gap-2">
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-panel-hover" style={{ borderColor: "var(--color-surface-border)" }}>
                    <Upload size={16} />
                    <span>{selectedFile ? selectedFile.name : "Choose File..."}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={saving}
                      onChange={(e) => setSelectedFile(e.target.files[0] || null)}
                    />
                  </label>
                  {selectedFile && (
                    <button type="button" onClick={() => setSelectedFile(null)} className="text-xs text-red-500 hover:underline">
                      Clear File
                    </button>
                  )}
                </div>
              </div>
              {formErrors.images && <p className="text-xs" style={{ color: "var(--color-accent-danger)" }}>{formErrors.images}</p>}
            </div>

            <div className="flex items-center gap-2 sm:col-span-2">
              <input
                id="isActive"
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                disabled={saving}
                className="h-4 w-4"
              />
              <label htmlFor="isActive" className="text-sm text-body">
                Product is active and visible in store
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t pt-4" style={{ borderColor: "var(--color-surface-border)" }}>
            <button type="button" className="btn-secondary" onClick={() => setFormOpen(false)} disabled={saving}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? (uploadingImage ? "Uploading Image…" : "Saving…") : editingProduct ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </Modal>

      {/* View details */}
      <Modal open={!!viewProduct} onClose={() => setViewProduct(null)} title="Product Details">
        {viewProduct && (
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg" style={{ backgroundColor: "var(--color-surface-hover)" }}>
                {viewProduct.images?.[0] ? (
                  <img src={viewProduct.images[0]} alt="" className="h-full w-full object-cover" />
                ) : (
                  <Package size={22} className="text-muted" />
                )}
              </div>
              <div>
                <p className="font-medium text-heading">{viewProduct.name}</p>
                <p className="text-xs text-muted">{viewProduct.sku}</p>
              </div>
            </div>
            <p className="text-body">{viewProduct.description}</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted">Price</p>
                <p className="text-body">{currency(viewProduct.price)}</p>
              </div>
              <div>
                <p className="text-xs text-muted">Discount Price</p>
                <p className="text-body">{viewProduct.discountPrice ? currency(viewProduct.discountPrice) : "—"}</p>
              </div>
              <div>
                <p className="text-xs text-muted">Category</p>
                <p className="text-body">{viewProduct.category}</p>
              </div>
              <div>
                <p className="text-xs text-muted">Brand</p>
                <p className="text-body">{viewProduct.brand || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-muted">Stock</p>
                <p className="text-body">{viewProduct.stock}</p>
              </div>
              <div>
                <p className="text-xs text-muted">Status</p>
                <Badge status={viewProduct.isActive ? "active" : "inactive"} />
              </div>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete product"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}