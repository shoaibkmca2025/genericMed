import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, CheckCircle2, TrendingDown, Clock, MapPin } from 'lucide-react';
import { CustomerMedicine, CustomerListing } from '../../types';

export interface CartItem {
  medicine: CustomerMedicine;
  listing: CustomerListing;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, storeId: string, delta: number) => void;
  onRemoveItem: (id: string, storeId: string) => void;
  onCheckout: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.listing.price * item.quantity, 0);
  const brandedTotal = cartItems.reduce(
    (acc, item) => acc + item.medicine.msrpPrice * item.quantity,
    0
  );
  const totalSavings = brandedTotal - subtotal;
  const deliveryFee = subtotal > 0 ? 1.99 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      onCheckout();
      setOrderPlaced(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0f4c5c] text-white flex items-center justify-center shadow-xs">
              <ShoppingBag className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase font-bold text-emerald-800">
                Prescription Fulfillment
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                Patient Savings Cart ({cartItems.reduce((a, b) => a + b.quantity, 0)} items)
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs flex-1">
          {orderPlaced ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8 animate-bounce" />
              </div>
              <h4 className="text-lg font-extrabold text-slate-900">
                Order Dispatched & Synced to PostgreSQL!
              </h4>
              <p className="text-slate-500 max-w-xs mx-auto text-xs">
                Your generic substitution order has been confirmed with the pharmacy tenant. Saved ${totalSavings.toFixed(2)} on this prescription.
              </p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <ShoppingBag className="w-10 h-10 mx-auto text-slate-300 stroke-1" />
              <div className="text-sm font-semibold text-slate-600">Your savings cart is empty</div>
              <p className="text-xs">Browse medicines and add verified generic alternatives.</p>
            </div>
          ) : (
            <>
              {/* Savings Announcement Box */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-emerald-900">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div>
                    <div className="font-bold">Total Patient Savings: ${totalSavings.toFixed(2)}</div>
                    <div className="text-[11px] text-emerald-800">
                      You are paying generic price instead of ${brandedTotal.toFixed(2)} branded MSRP.
                    </div>
                  </div>
                </div>
                <span className="font-mono font-extrabold text-lg text-emerald-800">
                  {brandedTotal > 0 ? `${(((totalSavings) / brandedTotal) * 100).toFixed(0)}%` : '0%'}
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                {cartItems.map((it) => (
                  <div key={`${it.medicine.id}-${it.listing.storeId}`} className="p-3.5 flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-900 text-xs">
                        {it.medicine.name} ({it.medicine.dosage})
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Generic for: <span className="font-semibold text-slate-700">{it.medicine.brandEquivalent}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Dispensed by {it.listing.storeName}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(it.medicine.id, it.listing.storeId, -1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-200 rounded-l"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono font-bold text-slate-800">{it.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(it.medicine.id, it.listing.storeId, 1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-200 rounded-r"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right w-16">
                        <div className="font-mono font-bold text-slate-900 text-xs">
                          ${(it.listing.price * it.quantity).toFixed(2)}
                        </div>
                        <div className="text-[10px] text-slate-400 line-through font-mono">
                          ${(it.medicine.msrpPrice * it.quantity).toFixed(2)}
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(it.medicine.id, it.listing.storeId)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Address & SLA */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-semibold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>Delivery Address</span>
                  </span>
                  <span className="text-[11px] text-[#0f4c5c] font-bold">Standard Rx Express (35m)</span>
                </div>
                <div className="text-slate-600">
                  482 Lincoln Ave, Apt 4B, Chicago, IL 60614
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-1.5 pt-2 text-slate-600 text-xs">
                <div className="flex justify-between">
                  <span>Generic Medicines Subtotal:</span>
                  <span className="font-mono font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Express Delivery:</span>
                  <span className="font-mono font-bold text-slate-900">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-slate-200 text-slate-900 font-extrabold text-sm">
                  <span>Total Amount:</span>
                  <span className="font-mono text-emerald-700">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!orderPlaced && cartItems.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg font-semibold text-slate-700 hover:bg-slate-200 text-xs"
            >
              Continue Browsing
            </button>
            <button
              onClick={handlePlaceOrder}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f4c5c] hover:bg-[#0c3c49] text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <span>Confirm Order (${grandTotal.toFixed(2)})</span>
              <ArrowRight className="w-4 h-4 text-emerald-300" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
