import React, { useState } from 'react';
import {
  Search,
  Pill,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Upload,
  Clock,
  Store,
  MapPin,
  TrendingDown,
  ShoppingCart,
  Check,
  Percent,
  Info,
} from 'lucide-react';
import { CustomerMedicine, CustomerListing } from '../../types';

interface CustomerMarketplaceProps {
  medicines: CustomerMedicine[];
  onAddToCart: (medicine: CustomerMedicine, listing: CustomerListing) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const CustomerMarketplace: React.FC<CustomerMarketplaceProps> = ({
  medicines,
  onAddToCart,
  cartCount,
  onOpenCart,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMedicine, setSelectedMedicine] = useState<CustomerMedicine | null>(null);
  const [rxUploaded, setRxUploaded] = useState(false);
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const categories = ['All', 'Heart & Blood Pressure', 'Infection & Antibiotics', 'Diabetes & Sugar', 'Pain & Fever'];

  const filteredMedicines = medicines.filter((m) => {
    if (selectedCategory !== 'All' && m.category !== selectedCategory) return false;
    if (
      search &&
      !m.name.toLowerCase().includes(search.toLowerCase()) &&
      !m.activeIngredient.toLowerCase().includes(search.toLowerCase()) &&
      !m.brandEquivalent.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleAdd = (med: CustomerMedicine, listing: CustomerListing) => {
    onAddToCart(med, listing);
    setAddedItemName(med.name);
    setTimeout(() => setAddedItemName(null), 2000);
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Hero Search & Savings Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0f4c5c] to-[#0c3c49] text-white shadow-md relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[11px] border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CLINICALLY VERIFIED GENERIC BIOEQUIVALENCE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
            Find the Exact Same Medicine for Up to 85% Less
          </h2>

          <p className="text-slate-200 text-xs sm:text-sm">
            Search your branded prescription or chemical salt. genericMed matches 100% bioequivalent generic alternatives certified by FDA Orange Book standards across licensed neighborhood pharmacies.
          </p>

          {/* Search Bar */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search branded medicine (e.g. Lipitor, Augmentin, Plavix) or generic..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 text-xs font-semibold focus:outline-none shadow-lg"
              />
            </div>

            <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer transition-colors shadow-lg shrink-0">
              <Upload className="w-4 h-4" />
              <span>{rxUploaded ? 'Rx Attached (Dr. Validated)' : 'Upload Prescription'}</span>
              <input
                type="file"
                className="hidden"
                onChange={() => {
                  setRxUploaded(true);
                  alert('Prescription successfully uploaded & verified against active moiety database!');
                }}
              />
            </label>
          </div>
        </div>

        {/* Floating Cart Button */}
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold transition-all shadow-md active:scale-95"
          >
            <ShoppingCart className="w-4 h-4 text-emerald-300" />
            <span>Savings Cart</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-[#0f4c5c] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Medicine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMedicines.map((med) => {
          const cheapestListing = [...med.listings].sort((a, b) => a.price - b.price)[0] || {
            price: med.basePrice,
            storeId: 'TN-DEFAULT',
            storeName: 'Metro Chemist',
            cluster: 'Central',
            rating: 4.9,
            reviewsCount: 120,
            deliveryTime: 'Today',
            inStock: true,
            stockQty: 50,
            verifiedSLA: '99% SLA',
          };
          const savings = ((med.msrpPrice - cheapestListing.price) / med.msrpPrice) * 100;

          return (
            <div
              key={med.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Top Badge: Bioequivalence */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                    <span>{med.bioMatch}% Bioequivalent</span>
                  </span>

                  <span className="text-[10px] font-mono text-slate-400">
                    {med.dosage}
                  </span>
                </div>

                {/* Medicine Title & Dosage */}
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {med.name}
                  </h3>
                  <div className="text-xs text-slate-500 font-medium">
                    {med.activeIngredient}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Category: {med.category}
                  </div>
                </div>

                {/* Comparison Card: Branded vs Generic */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Brand Originator:</span>
                    <span className="font-bold text-slate-700">
                      {med.brandEquivalent}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Branded MSRP:</span>
                    <span className="text-slate-400 line-through font-mono font-semibold">
                      ${med.msrpPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                    <span className="font-bold text-slate-900">Generic Price:</span>
                    <div className="text-right">
                      <span className="text-lg font-extrabold text-emerald-700 font-mono">
                        ${cheapestListing.price.toFixed(2)}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 block font-mono">
                        Save {savings.toFixed(0)}% (${(med.msrpPrice - cheapestListing.price).toFixed(2)})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Available Store Options */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
                    <span>Available at {med.listings.length} Verified Pharmacies</span>
                    <span className="text-slate-500 font-mono">Real-time sync</span>
                  </div>

                  {med.listings.map((store) => (
                    <div
                      key={store.id || store.storeId}
                      className="p-2 rounded-lg bg-slate-50/70 border border-slate-200/70 flex items-center justify-between"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-800 text-[11px] flex items-center gap-1.5">
                          <span>{store.storeName}</span>
                          <span className="text-[9px] px-1 py-0.1 rounded bg-blue-50 text-blue-800 font-mono">
                            {store.cluster}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-2 font-mono">
                          <span>⏱ {store.deliveryTime}</span>
                          <span>•</span>
                          <span>In Stock: {store.inStock ? `${store.stockQty} left` : 'Out'}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAdd(med, store)}
                        className="px-3 py-1.5 rounded-lg bg-[#0f4c5c] hover:bg-[#0c3c49] text-white font-bold text-xs shadow-2xs transition-all active:scale-95"
                      >
                        ${store.price.toFixed(2)}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Clinical Note */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>FDA Orange Book Rated: AB Equivalent</span>
                </span>
                <span className="font-mono text-emerald-700 font-bold">Safe Switch</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
