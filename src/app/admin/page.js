'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// import Header from '@/components/Header';
import Footer from '@/components/Footer';
import pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Sample admin password (in production, use proper authentication)
  const ADMIN_PASSWORD = 'novelsolutions@012';

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      setAdminLoggedIn(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password');
    }
  };

  if (!adminLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <main className="flex-grow flex items-center justify-center py-12 px-6">
          <div className="w-full max-w-md">
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
              <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">Admin Access</h1>
              <p className="text-center text-gray-600 mb-8">Enter admin password to continue</p>

              {passwordError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  {passwordError}
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Admin Password
                  </label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Access Admin Panel
                </button>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Admin Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
            <button
              onClick={() => setAdminLoggedIn(false)}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="flex border-b">
              {['overview', 'products', 'attendance', 'staff'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'attendance' && <AttendanceTab />}
          {activeTab === 'staff' && <StaffTab />}
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Overview Tab Component
function OverviewTab() {
  const stats = [
    { label: 'Total Products', value: '8', color: 'blue' },
    { label: 'Total Orders', value: '1,234', color: 'green' },
    { label: 'Staff Members', value: '15', color: 'purple' },
    { label: 'Monthly Revenue', value: '₹5.2L', color: 'orange' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className={`bg-white p-6 rounded-lg shadow-md border-l-4 border-${stat.color}-500`}>
            <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <span className="text-2xl">📦</span>
              <span className="text-gray-700">3 new products added</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">👤</span>
              <span className="text-gray-700">5 new customers registered</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <span className="text-gray-700">12 orders completed</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
              Add New Product
            </button>
            <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors">
              Mark Attendance
            </button>
            <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Products Tab Component
import { getProducts, setProducts as saveProducts, CATEGORY_OPTIONS, CATEGORIES as CATEGORY_TREE } from '@/lib/products';

function ProductsTab() {
  const [products, setProducts] = useState([]);

  // Load products from localStorage on mount
  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    price: '',
    stock: '',
    image: '',
    description: '',
    code: ''
  });
  const [editingId, setEditingId] = useState(null);
  // Import file states
  const [importOpen, setImportOpen] = useState(false);
  const [importPreview, setImportPreview] = useState([]);
  const [importErrors, setImportErrors] = useState([]);
  const [addAndMore, setAddAndMore] = useState(false);

  const categories = CATEGORY_OPTIONS.filter(Boolean);
  const categoryGroups = Array.isArray(CATEGORY_TREE) ? CATEGORY_TREE : [];

  const handleAddProduct = (e) => {
    e.preventDefault();
    let updated;
    if (editingId) {
      updated = products.map(p => p.id === editingId ? { ...formData, id: editingId } : p);
      setEditingId(null);
    } else {
      updated = [...products, { ...formData, id: Date.now() }];
    }
    setProducts(updated);
    saveProducts(updated);
    const reset = { name: '', category: '', subcategory: '', price: '', stock: '', image: '', description: '', code: '' };
    setFormData(reset);
    if (addAndMore) {
      // keep the form open for next entry
      setShowAddForm(true);
    } else {
      setShowAddForm(false);
    }
    setAddAndMore(false);
  };

  // Handle image file input and convert to data URL
  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setFormData((prev) => ({ ...prev, image: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  // === Import file handling ===
  const handleFileInput = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setImportErrors([]);
    try {
      const name = file.name.toLowerCase();
      if (name.endsWith('.pdf')) {
        try {
          const pdfjs = await import('pdfjs-dist/legacy/build/pdf');
          const arrayBuffer = await file.arrayBuffer();
          const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
          const doc = await loadingTask.promise;
          let fullText = '';
          for (let i = 1; i <= doc.numPages; i++) {
            const page = await doc.getPage(i);
            const content = await page.getTextContent();
            const strings = content.items.map(it => it.str);
            fullText += strings.join(' ') + '\n';
          }
          parseTextToPreview(fullText);
        } catch (err) {
          setImportErrors([`PDF parsing requires the package 'pdfjs-dist'. Run: npm install pdfjs-dist`]);
        }
      } else if (name.endsWith('.docx') || name.endsWith('.doc')) {
        try {
          const mammoth = await import('mammoth');
          const arrayBuffer = await file.arrayBuffer();
          const result = await mammoth.extractRawText({ arrayBuffer });
          parseTextToPreview(result.value || '');
        } catch (err) {
          setImportErrors([`DOCX parsing requires the package 'mammoth'. Run: npm install mammoth`]);
        }
      } else {
        // treat as text / csv
        const text = await file.text();
        parseTextToPreview(text);
      }
    } catch (err) {
      setImportErrors([String(err)]);
    }
  };

  function parseTextToPreview(text) {
    if (!text || !text.trim()) {
      setImportErrors(['No text extracted from file']);
      return;
    }
    // Parse into preview items focusing only on: image, name, price, category, code, description
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) {
      setImportErrors(['No items parsed from file']);
      return;
    }

    // detect header row to map columns
    const first = lines[0].toLowerCase();
    let headerCols = null;
    let startIdx = 0;
    if (first.includes('name') || first.includes('price') || first.includes('category') || first.includes('code')) {
      // treat first line as header
      headerCols = lines[0].split(/,|\t|\||;/).map(c => c.trim().toLowerCase());
      startIdx = 1;
    }

    const items = [];
    for (let i = startIdx; i < lines.length; i++) {
      const line = lines[i];
      // split using common delimiters
      const cols = line.split(/,|\t|\||;/).map(c => c.trim());
      if (cols.length === 0) continue;

      // default mapping when no header: name, category, price, code, description, image
      let name = '';
      let category = '';
      let price = 0;
      let code = '';
      let description = '';
      let image = '';

      if (headerCols) {
        // map by header names
        headerCols.forEach((h, idx) => {
          const val = (cols[idx] || '').trim();
          if (!val) return;
          if (h.includes('name')) name = val;
          else if (h.includes('category')) category = val;
          else if (h.includes('price')) price = parseFloat(val.replace(/[^0-9.]/g, '')) || 0;
          else if (h.includes('code') || h.includes('sku') || h.includes('id')) code = val;
          else if (h.includes('desc')) description = val;
          else if (h.includes('image') || h.includes('img')) image = val;
        });
      } else {
        // heuristic mapping when no header
        name = cols[0] || `Item ${i}`;
        category = cols[1] || 'Uncategorized';
        price = parseFloat((cols[2] || '').replace(/[^0-9.]/g, '')) || 0;
        code = cols[3] || '';
        description = cols.slice(4).join(' ') || '';
      }

      items.push({ image, name, price, category, code, description, include: true });
    }
    if (items.length === 0) setImportErrors(['No items parsed from file']);
    if (items.length === 0) setImportErrors(['No items parsed from file']);
    setImportPreview(items);
    setImportOpen(true);
  }

  const updatePreviewItem = (idx, field, value) => {
    setImportPreview(prev => prev.map((it, i) => i === idx ? ({ ...it, [field]: value }) : it));
  };

  // Read a preview-row image file and update the preview item's image as a data URL
  const handlePreviewImageFile = (idx, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      setImportPreview(prev => prev.map((it, i) => i === idx ? ({ ...it, image: dataUrl }) : it));
    };
    reader.readAsDataURL(file);
  };

  const importSelectedItems = () => {
    const toImport = importPreview.filter(it => it.include !== false);
    if (!toImport.length) return;
    const now = Date.now();
    const itemsWithId = toImport.map((it, idx) => ({ ...it, id: now + idx }));
    const updated = [...products, ...itemsWithId];
    setProducts(updated);
    saveProducts(updated);
    setImportPreview([]);
    setImportOpen(false);
  };

  function parseProducts(cleanedText) {
  const lines = cleanedText.split("\n").map(l => l.trim()).filter(Boolean);

  const products = [];
  let temp = {};

  for (let line of lines) {
    // Name (any text without symbols)
    if (!temp.name) {
      temp.name = line;
      continue;
    }

    // Category (usually contains "&" or multiple words)
    if (!temp.category) {
      temp.category = line;
      continue;
    }

    // Price (₹500 or Rs 500)
    if (/₹\s*\d+/.test(line) || /Rs\.?\s*\d+/.test(line)) {
      temp.price = Number(line.replace(/[^0-9]/g, ""));
      continue;
    }

    // SKU (alphanumeric)
    if (/^[A-Za-z0-9]+$/.test(line) && !temp.sku) {
      temp.sku = line;
      continue;
    }

    // Quantity (like "10 units")
    if (/\d+\s+\w+/.test(line)) {
      const [qty, unit] = line.split(" ");
      temp.quantity = Number(qty);
      temp.unit = unit;
      
      // Product complete → push to result
      products.push({ ...temp });
      temp = {}; // reset for next product
      continue;
    }
  }

  return products;
}


  const handleDeleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    saveProducts(updated);
  };

  const handleEditProduct = (product) => {
    setFormData(product);
    setEditingId(product.id);
    setShowAddForm(true);
  };

  // Keep products in sync if changed elsewhere (e.g. another tab)
  useEffect(() => {
    const sync = () => setProducts(getProducts());
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setImportOpen(!importOpen)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Import List
          </button>
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              if (editingId) {
                setEditingId(null);
                setFormData({ name: '', category: '', subcategory: '', price: '', stock: '', code: '', image: '', description: '' });
              }
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showAddForm ? 'Cancel' : '+ Add Product'}
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Product name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => {
                  const newCat = e.target.value;
                  const group = categoryGroups.find(g => g.name === newCat);
                  setFormData({ ...formData, category: newCat, subcategory: group && group.subs && group.subs.length ? group.subs[0] : '' });
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              >
                <option value="">Select Category</option>
                {categoryGroups.map(g => (
                  <option key={g.name} value={g.name}>{g.name}</option>
                ))}
              </select>

              <label className="block text-sm font-semibold mt-3 mb-2">Subcategory</label>
              <select
                value={formData.subcategory}
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              >
                <option value="">Select Subcategory</option>
                {(() => {
                  const grp = categoryGroups.find(g => g.name === formData.category);
                  if (!grp) return null;
                  return grp.subs.map(sub => <option key={sub} value={sub}>{sub}</option>);
                })()}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Price (₹)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Stock Quantity</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="Stock"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Product Code</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="Product code"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-lg"
              />
              {formData.image && (
                <img src={formData.image} alt="Preview" className="mt-2 h-24 object-contain rounded border" />
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Short product description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows={3}
              />
            </div>
            
            <div className="md:col-span-2 flex gap-4 items-center">
              <button
                type="submit"
                onClick={() => setAddAndMore(false)}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                {editingId ? 'Update Product' : 'Add Product'}
              </button>

              <button
                type="submit"
                onClick={() => setAddAndMore(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Add &amp; add another
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Import UI & Preview */}
      {importOpen && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-bold mb-4">Import Products From File</h3>
          <p className="text-sm text-gray-600 mb-4">Supported: .csv, .txt, .pdf, .docx. Parsed rows will be shown below for review.</p>
          <input type="file" accept=".csv,.txt,.pdf,.doc,.docx" onChange={handleFileInput} className="mb-4" />
          {importErrors.length > 0 && (
            <div className="mb-4">
              {importErrors.map((err, i) => (
                <div key={i} className="text-red-600">{err}</div>
              ))}
            </div>
          )}

          {importPreview.length > 0 && (
  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-1">
          Import Preview
        </h4>
        <p className="text-sm text-gray-500 font-medium">
          Review and edit {importPreview.length} {importPreview.length === 1 ? 'item' : 'items'}
        </p>
      </div>
      <div className="flex items-center gap-3 text-sm font-medium">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
          {importPreview.filter(it => it.include !== false).length} selected
        </span>
        <button 
          onClick={() => importPreview.forEach((_, idx) => updatePreviewItem(idx, 'include', true))}
          className="text-blue-600 hover:text-blue-700 px-2 py-1 rounded-md hover:bg-blue-50 transition-colors"
        >
          Select All
        </button>
      </div>
    </div>

    {/* Table Container */}
    <div className="overflow-hidden border border-gray-200 rounded-xl mb-6">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Include</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[300px]">Image</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[200px]">Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[120px]">Price</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[140px]">Category</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[120px]">Code</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[180px]">Description</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-16">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
                {importPreview.map((it, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-all duration-150 group">
                    {/* Include Checkbox */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <input 
                        type="checkbox" 
                        checked={it.include !== false} 
                        onChange={(e) => updatePreviewItem(idx, 'include', e.target.checked)}
                        className="w-5 h-5 rounded-lg accent-emerald-600 focus:ring-2 focus:ring-emerald-500/50 shadow-sm"
                      />
                    </td>

                    {/* Image Column - Enhanced */}
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-4">
                        {/* Image Preview */}
                        <div className="flex-shrink-0 group/image">
                          {it.image ? (
                            (typeof it.image === 'string' && (it.image.startsWith('data:') || it.image.startsWith('http'))) ? (
                              <img 
                                src={it.image} 
                                alt={it.name} 
                                className="h-20 w-20 object-contain rounded-2xl border-2 border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 group-hover/image:scale-105"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/placeholder-image.png';
                                }}
                              />
                            ) : (
                              <div className="h-20 w-20 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 text-xl shadow-sm">
                                {typeof it.image === 'string' ? it.image : '🛍️'}
                              </div>
                            )
                          ) : (
                            <div className="h-20 w-20 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 text-gray-400 text-sm font-medium shadow-sm">
                              No Image
                            </div>
                          )}
                        </div>
                        
                        {/* Image Controls */}
                        <div className="flex-1 space-y-2 min-w-0">
                          <input 
                            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm transition-all placeholder-gray-400"
                            placeholder="Image URL or emoji..."
                            value={it.image || ''} 
                            onChange={(e) => updatePreviewItem(idx, 'image', e.target.value)}
                          />
                          <label className="block w-full cursor-pointer">
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handlePreviewImageFile(idx, e.target.files?.[0])}
                              className="hidden"
                            />
                            <span className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium">
                              📁 Upload
                            </span>
                          </label>
                        </div>
                      </div>
                    </td>

                    {/* Name */}
                    <td className="px-6 py-4">
                      <input 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-semibold text-lg leading-tight shadow-sm transition-all group-hover:border-gray-300"
                        value={it.name || ''} 
                        onChange={(e) => updatePreviewItem(idx, 'name', e.target.value)}
                        placeholder="Product name..."
                      />
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <span className="text-xl font-black text-emerald-600">₹</span>
                        </div>
                        <input 
                          className="w-full pl-14 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono text-xl font-black text-right bg-gray-50 shadow-sm transition-all"
                          value={it.price || ''} 
                          onChange={(e) => updatePreviewItem(idx, 'price', e.target.value)}
                          placeholder="0"
                        />
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <input 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm shadow-sm transition-all"
                        value={it.category || ''} 
                        onChange={(e) => updatePreviewItem(idx, 'category', e.target.value)}
                        placeholder="e.g. Electronics"
                      />
                    </td>

                    {/* Code */}
                    <td className="px-6 py-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <span className="text-sm text-gray-500 font-mono">#</span>
                        </div>
                        <input 
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-mono text-sm bg-orange-50/50 shadow-sm transition-all"
                          value={it.code || ''} 
                          onChange={(e) => updatePreviewItem(idx, 'code', e.target.value)}
                          placeholder="SKU123"
                        />
                      </div>
                    </td>

                    {/* Description */}
                    <td className="px-6 py-4">
                      <textarea 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-vertical h-24 shadow-sm transition-all placeholder-gray-400"
                        value={it.description || ''} 
                        onChange={(e) => updatePreviewItem(idx, 'description', e.target.value)}
                        placeholder="Enter product description..."
                        rows={4}
                      />
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => removePreviewItem(idx)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 group-hover:bg-red-50 shadow-sm hover:shadow-md"
                        title="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
          <button 
            onClick={importSelectedItems}
            disabled={importPreview.filter(it => it.include !== false).length === 0}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Import {importPreview.filter(it => it.include !== false).length} Items
          </button>
          <button 
            onClick={() => { setImportPreview([]); setImportOpen(false); }}
            className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 border border-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    )}

        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Image</th>
              <th className="px-6 py-3 text-left font-semibold">Product Name</th>
              <th className="px-6 py-3 text-left font-semibold">Category</th>
              <th className="px-6 py-3 text-left font-semibold">Price</th>
              <th className="px-6 py-3 text-left font-semibold">Code</th>
              <th className="px-6 py-3 text-left font-semibold">Stock</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="h-12 w-12 object-contain rounded border" />
                  ) : (
                    <span className="text-2xl">📦</span>
                  )}
                </td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                <td className="px-6 py-4 font-semibold">₹{product.price}</td>
                <td className="px-6 py-4">{product.code}</td>
                <td className="px-6 py-4">{product.stock} units</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm transition-colors"
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

// Attendance Tab Component
function AttendanceTab() {
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [staffList, setStaffList] = useState([
    { id: 1, name: 'Rajesh Kumar', position: 'Sales Manager', status: 'present', time: '09:15 AM' },
    { id: 2, name: 'Priya Singh', position: 'Product Manager', status: 'present', time: '09:30 AM' },
    { id: 3, name: 'Amit Patel', position: 'Developer', status: 'absent', time: '-' },
    { id: 4, name: 'Neha Sharma', position: 'HR Manager', status: 'present', time: '10:00 AM' },
    { id: 5, name: 'Vikram Singh', position: 'Warehouse Staff', status: 'leave', time: '-' },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setStaffList(staffList.map(staff =>
      staff.id === id
        ? { ...staff, status: newStatus, time: newStatus === 'present' ? new Date().toLocaleTimeString() : '-' }
        : staff
    ));
  };

  const presentCount = staffList.filter(s => s.status === 'present').length;
  const absentCount = staffList.filter(s => s.status === 'absent').length;
  const leaveCount = staffList.filter(s => s.status === 'leave').length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6" id='attendance-mng'>
        <h2 className="text-2xl font-bold">Attendance Management</h2>
        <input
          type="date"
          value={attendanceDate}
          onChange={(e) => setAttendanceDate(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-green-600 font-semibold">Present</p>
          <p className="text-3xl font-bold text-green-700">{presentCount}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-red-600 font-semibold">Absent</p>
          <p className="text-3xl font-bold text-red-700">{absentCount}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <p className="text-yellow-600 font-semibold">On Leave</p>
          <p className="text-3xl font-bold text-yellow-700">{leaveCount}</p>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">Position</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
              <th className="px-6 py-3 text-left font-semibold">Time</th>
              <th className="px-6 py-3 text-left font-semibold">Mark Attendance</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map(staff => (
              <tr key={staff.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{staff.name}</td>
                <td className="px-6 py-4 text-gray-600">{staff.position}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    staff.status === 'present' ? 'bg-green-100 text-green-800' :
                    staff.status === 'absent' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">{staff.time}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusChange(staff.id, 'present')}
                      className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
                        staff.status === 'present'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleStatusChange(staff.id, 'absent')}
                      className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
                        staff.status === 'absent'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Absent
                    </button>
                    <button
                      onClick={() => handleStatusChange(staff.id, 'leave')}
                      className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
                        staff.status === 'leave'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Leave
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Staff Tab Component
// Staff Tab Component
function StaffTab() {
  const [staff, setStaff] = useState([
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh@novasols.com', position: 'Sales Manager', phone: '+91-9876543210' },
    { id: 2, name: 'Priya Singh', email: 'priya@novasols.com', position: 'HR Manager', phone: '+91-9988776655' },
    { id: 3, name: 'Amit Patel', email: 'amit@novasols.com', position: 'Developer', phone: '+91-9090909090' }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setStaff(staff.map(s => s.id === editingId ? { ...formData, id: editingId } : s));
      setEditingId(null);
    } else {
      setStaff([...staff, { ...formData, id: Date.now() }]);
    }

    setFormData({ name: '', email: '', position: '', phone: '' });
    setShowForm(false);
  };

  const handleEdit = (member) => {
    setEditingId(member.id);
    setFormData(member);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setStaff(staff.filter(s => s.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Staff Management</h2>

        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ name: '', email: '', position: '', phone: '' });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add Staff'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Staff' : 'Add New Staff'}</h3>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Position</label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                {editingId ? 'Update Staff' : 'Add Staff'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Staff Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">Email</th>
              <th className="px-6 py-3 text-left font-semibold">Position</th>
              <th className="px-6 py-3 text-left font-semibold">Phone</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {staff.map(member => (
              <tr key={member.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{member.name}</td>
                <td className="px-6 py-3">{member.email}</td>
                <td className="px-6 py-3">{member.position}</td>
                <td className="px-6 py-3">{member.phone}</td>

                <td className="px-6 py-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(member.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
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
