import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Upload, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type CategoryKey = 'rice-mill' | 'poultry-feed' | 'atta-chakki';

interface SpecField {
  key: string;
  label: string;
  placeholder: string;
  type?: 'text' | 'select';
  options?: string[];
  required?: boolean;
}

const categorySpecFields: Record<CategoryKey, SpecField[]> = {
  'rice-mill': [
    { key: 'capacity', label: 'Capacity', placeholder: 'e.g. 40–50 Ton / Day', required: true },
    { key: 'grade', label: 'Grade', type: 'select', options: ['Automatic', 'Semi-Automatic', 'Manual'], placeholder: 'Select grade', required: true },
    { key: 'material', label: 'Material', placeholder: 'e.g. Mild Steel' },
    { key: 'weight', label: 'Weight', placeholder: 'e.g. 3000 kg' },
    { key: 'efficiency', label: 'Sorting Efficiency', placeholder: 'e.g. 90–95%' },
    { key: 'dimensions', label: 'Dimensions (mm)', placeholder: 'e.g. 1500×1200×1800' },
    { key: 'warranty', label: 'Warranty', placeholder: 'e.g. 1 Year' },
    { key: 'delivery', label: 'Delivery Time', placeholder: 'e.g. 1 Week' },
  ],
  'poultry-feed': [
    { key: 'capacity', label: 'Capacity', placeholder: 'e.g. 500 kg/hr', required: true },
    { key: 'power', label: 'Power (HP/kW)', placeholder: 'e.g. 15 HP', required: true },
    { key: 'material', label: 'Material', placeholder: 'e.g. Mild Steel' },
    { key: 'weight', label: 'Weight', placeholder: 'e.g. 800 kg' },
    { key: 'type', label: 'Machine Type', placeholder: 'e.g. Pellet Mill / Feed Mixer' },
    { key: 'dimensions', label: 'Dimensions (mm)', placeholder: 'e.g. 2000×1000×1800' },
    { key: 'warranty', label: 'Warranty', placeholder: 'e.g. 1 Year' },
    { key: 'delivery', label: 'Delivery Time', placeholder: 'e.g. 2 Weeks' },
  ],
  'atta-chakki': [
    { key: 'capacity', label: 'Capacity', placeholder: 'e.g. 10–20 Tons / Day', required: true },
    { key: 'power', label: 'Power (HP)', placeholder: 'e.g. 20 HP', required: true },
    { key: 'material', label: 'Material', placeholder: 'e.g. Mild Steel' },
    { key: 'efficiency', label: 'Efficiency', placeholder: 'e.g. 99%' },
    { key: 'weight', label: 'Weight', placeholder: 'e.g. 1200 kg' },
    { key: 'dimensions', label: 'Dimensions (mm)', placeholder: 'e.g. 1800×800×1200' },
    { key: 'warranty', label: 'Warranty', placeholder: 'e.g. 1 Year' },
    { key: 'delivery', label: 'Delivery Time', placeholder: 'e.g. 1 Week' },
  ],
};

const categoryMeta: Record<CategoryKey, { label: string; color: string; icon: string }> = {
  'rice-mill':     { label: 'Rice Mill',                   color: 'amber',  icon: '🌾' },
  'poultry-feed':  { label: 'Poultry Feed Plant',          color: 'blue',   icon: '🐔' },
  'atta-chakki':   { label: 'Atta Chakki & Oil Expeller',  color: 'orange', icon: '⚙️' },
};

const categories: { value: CategoryKey; label: string }[] = [
  { value: 'rice-mill',    label: 'Rice Mill' },
  { value: 'poultry-feed', label: 'Poultry Feed Plant' },
  { value: 'atta-chakki',  label: 'Atta Chakki & Oil Expeller' },
];

const colorMap: Record<string, string> = {
  amber:  'border-amber-400  bg-amber-50  text-amber-700  dark:bg-amber-900/20  dark:text-amber-400',
  blue:   'border-blue-400   bg-blue-50   text-blue-700   dark:bg-blue-900/20   dark:text-blue-400',
  orange: 'border-orange-400 bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
};

export default function AddProduct() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryKey | ''>('');
  const [description, setDescription] = useState('');
  const [badge, setBadge] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [specs, setSpecs] = useState<Record<string, string>>({});

  const handleCategoryChange = (val: CategoryKey | '') => {
    setCategory(val);
    setSpecs({});
  };

  const handleSpecChange = (key: string, value: string) => {
    setSpecs(prev => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      let imageUrl = '';

      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      // Build specs array from filled fields only
      const specsArray = category
        ? categorySpecFields[category]
            .filter(f => specs[f.key]?.trim())
            .map(f => ({ label: f.label, value: specs[f.key].trim() }))
        : [];

      const { error: dbError } = await supabase
        .from('products')
        .insert([{ title, category, description, image_url: imageUrl, badge: badge || null, specs: specsArray }]);

      if (dbError) throw dbError;

      setMessage({ type: 'success', text: 'Product added successfully!' });
      setTitle(''); setCategory(''); setDescription(''); setBadge('');
      setFile(null); setPreview(null); setSpecs({});
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const currentFields = category ? categorySpecFields[category] : [];
  const meta = category ? categoryMeta[category] : null;
  const colorClass = meta ? colorMap[meta.color] : '';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Add New Product</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Select a category first — relevant specification fields will appear automatically.</p>

        {message.text && (
          <div className={`p-4 rounded-xl mb-6 text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* 1. Category — first */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category <span className="text-red-500">*</span></label>
            <select
              required
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value as CategoryKey | '')}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500 outline-none transition-all dark:text-white"
            >
              <option value="" disabled>Select a category</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          {/* 2. Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Title <span className="text-red-500">*</span></label>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500 outline-none transition-all dark:text-white"
              placeholder="e.g. Trolly Rice Mill Plant" />
          </div>

          {/* 3. Badge */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Badge <span className="text-gray-400 font-normal">(optional)</span></label>
            <input type="text" value={badge} onChange={(e) => setBadge(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500 outline-none transition-all dark:text-white"
              placeholder="e.g. High Capacity, Automatic, New Arrival" />
          </div>

          {/* 4. Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500 outline-none transition-all dark:text-white"
              placeholder="Describe the product..." />
          </div>

          {/* 5. Dynamic Spec Fields */}
          <AnimatePresence>
            {category && currentFields.length > 0 && (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`border rounded-xl p-5 ${colorClass}`}
              >
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <span>{meta?.icon}</span> {meta?.label} — Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentFields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs font-medium mb-1 opacity-80">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          value={specs[field.key] || ''}
                          onChange={(e) => handleSpecChange(field.key, e.target.value)}
                          className="w-full px-3 py-2 rounded-lg text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500 outline-none dark:text-white"
                        >
                          <option value="">Select {field.label}</option>
                          {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : (
                        <input type="text" value={specs[field.key] || ''} onChange={(e) => handleSpecChange(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full px-3 py-2 rounded-lg text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500 outline-none dark:text-white" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 6. Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Photo</label>
            <div className="mt-1 flex justify-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700 px-6 py-8 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {preview ? (
                <div className="relative w-full max-w-sm">
                  <img src={preview} alt="Preview" className="rounded-lg object-cover w-full h-44 shadow-sm" />
                  <button type="button" onClick={() => { setFile(null); setPreview(null); }}
                    className="absolute -top-3 -right-3 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto h-10 w-10 text-gray-400" />
                  <div className="mt-3 flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                    <label htmlFor="file-upload" className="cursor-pointer font-semibold text-green-600 dark:text-green-500 hover:text-green-500">
                      <span>Upload a file</span>
                      <input id="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
                </div>
              )}
            </div>
          </div>

          {/* 7. Submit */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <button type="submit" disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-sm font-semibold text-white bg-green-600 hover:bg-green-700 disabled:opacity-70 transition-colors shadow-sm">
              {loading ? <><Loader2 className="animate-spin mr-2" size={20} /> Saving...</> : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
