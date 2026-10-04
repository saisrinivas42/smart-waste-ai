import { useState, useRef } from 'react';
import { Upload, ScanSearch, CheckCircle, AlertTriangle, ImageIcon, X } from 'lucide-react';
import { MOCK_PREDICTIONS, WASTE_CATEGORIES } from '../data/demoData';
import { useApp } from '../context/AppContext';

function getCat(id) {
  return WASTE_CATEGORIES.find(c => c.id === id) ?? { label: id, color: '#6b7280', icon: '♻️', disposal: 'Follow local disposal guidelines.' };
}

function ConfBar({ value }) {
  const color = value >= 90 ? '#16a34a' : value >= 75 ? '#f59e0b' : '#ef4444';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-1.5 rounded-full transition-all duration-700" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-bold w-9 text-right" style={{ color }}>{value}%</span>
    </div>
  );
}

export default function WasteDetection() {
  const { addWasteDetection } = useApp();
  const fileRef = useRef(null);
  const [imageUrl,  setImageUrl]  = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result,    setResult]    = useState(null);
  const [saved,     setSaved]     = useState(false);

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    setImageUrl(URL.createObjectURL(file));
    setResult(null);
    setSaved(false);
  }

  async function analyzeWaste() {
    if (!imageUrl) return;
    setAnalyzing(true);
    setResult(null);
    await new Promise(r => setTimeout(r, 2200));
    const p = MOCK_PREDICTIONS[Math.floor(Math.random() * MOCK_PREDICTIONS.length)];
    setResult({ ...p, totalItems: p.detectedItems.reduce((s, d) => s + d.count, 0) });
    setAnalyzing(false);
  }

  function saveResult() {
    if (!result) return;
    addWasteDetection({
      id: 'WD' + Date.now(),
      date: new Date().toLocaleString(),
      imageUrl,
      detectedItems: result.detectedItems,
      totalItems: result.totalItems,
      status: 'COMPLETED',
    });
    setSaved(true);
  }

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Waste Detection</h1>
        <p className="text-sm text-gray-500 mt-0.5">Upload an image to detect and classify multiple waste objects using AI</p>
      </div>

      {/* Prototype notice */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
        <AlertTriangle size={17} className="text-amber-500 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-bold text-amber-800">Prototype / Demo Prediction</p>
          <p className="text-xs text-amber-600 mt-0.5">
            Results shown are simulated demo data. In production, images are sent to a Python
            computer vision service (YOLOv8) for real AI inference.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Upload */}
        <div className="space-y-4">
          <div
            className="card border-2 border-dashed border-green-200 hover:border-green-400 cursor-pointer transition-all duration-200 overflow-hidden"
            style={{ minHeight: 280 }}
            onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
            onDragOver={e => e.preventDefault()}
            onClick={() => fileRef.current?.click()}
          >
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => handleFile(e.target.files[0])} />
            {imageUrl ? (
              <div className="relative">
                <img src={imageUrl} alt="Uploaded" className="w-full object-contain max-h-72" />
                <button
                  onClick={e => { e.stopPropagation(); setImageUrl(null); setResult(null); setSaved(false); }}
                  className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-50"
                >
                  <X size={14} className="text-gray-500" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-72 text-gray-400">
                <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-4">
                  <ImageIcon size={32} className="text-green-400" />
                </div>
                <p className="font-semibold text-gray-600">Drop your image here</p>
                <p className="text-sm mt-1">or click to browse files</p>
                <p className="text-xs mt-3 text-gray-300">PNG, JPG, WebP · Max 10 MB</p>
              </div>
            )}
          </div>

          <button
            onClick={analyzeWaste}
            disabled={!imageUrl || analyzing}
            className="btn-primary w-full py-3 text-sm rounded-xl"
          >
            {analyzing ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analyzing image…
              </>
            ) : (
              <><ScanSearch size={17} /> Analyze Waste</>
            )}
          </button>

          {/* Steps */}
          {!analyzing && !result && (
            <div className="card p-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">How it works</p>
              {[
                ['1', 'Upload an image containing waste items'],
                ['2', 'Click "Analyze Waste" to run detection'],
                ['3', 'View detected items with categories & counts'],
                ['4', 'Follow disposal recommendations'],
              ].map(([n, t]) => (
                <div key={n} className="flex items-start gap-3 mb-2.5 last:mb-0">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center flex-shrink-0">{n}</span>
                  <p className="text-sm text-gray-600">{t}</p>
                </div>
              ))}
            </div>
          )}

          {analyzing && (
            <div className="card p-6 text-center">
              <div className="w-12 h-12 border-4 border-green-100 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="font-semibold text-gray-700">Running AI Detection</p>
              <p className="text-sm text-gray-400 mt-1">Detecting and classifying waste objects…</p>
            </div>
          )}
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-4">
            {/* Summary */}
            <div className="card p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-green-600 uppercase tracking-wider">Detection Complete</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{result.totalItems} items found</p>
                  <p className="text-xs text-amber-600 mt-1.5">⚠️ Demo Prediction — not real AI output</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-3xl">
                  🗑️
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="card p-5">
              <h4 className="font-bold text-gray-800 mb-4">Detected Waste Items</h4>
              <div className="space-y-3">
                {result.detectedItems.map((item, i) => {
                  const cat = getCat(item.category);
                  return (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{ backgroundColor: cat.color + '18' }}>
                        {cat.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-bold text-gray-800">{item.name}</p>
                          <span className="text-lg font-bold text-gray-900">×{item.count}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] px-2 py-0.5 rounded-full text-white font-semibold"
                            style={{ backgroundColor: cat.color }}>
                            {cat.label}
                          </span>
                        </div>
                        <ConfBar value={item.confidence} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="font-bold text-gray-700">Total Items Detected</span>
                <span className="text-2xl font-bold text-green-600">{result.totalItems}</span>
              </div>
            </div>

            {/* Disposal */}
            <div className="card p-5">
              <h4 className="font-bold text-gray-800 mb-3">Disposal Recommendations</h4>
              <div className="space-y-2">
                {[...new Set(result.detectedItems.map(d => d.category))].map(catId => {
                  const cat = getCat(catId);
                  return (
                    <div key={catId} className="flex gap-3 p-3 rounded-xl" style={{ backgroundColor: cat.color + '10' }}>
                      <span className="text-xl">{cat.icon}</span>
                      <div>
                        <p className="text-sm font-bold" style={{ color: cat.color }}>{cat.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{cat.disposal}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {!saved ? (
              <button onClick={saveResult} className="btn-primary w-full py-3 rounded-xl">
                <Upload size={16} /> Save to History
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl py-3 text-sm font-bold">
                <CheckCircle size={17} /> Saved to Waste History
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
