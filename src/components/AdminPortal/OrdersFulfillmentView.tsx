import React from 'react';
import { PackageCheck, Clock, CheckCircle2, Truck, AlertCircle, ShoppingBag } from 'lucide-react';
import { CustomerOrder } from '../../types';

interface OrdersFulfillmentViewProps {
  orders: CustomerOrder[];
}

export const OrdersFulfillmentView: React.FC<OrdersFulfillmentViewProps> = ({ orders }) => {
  return (
    <div className="space-y-5 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 uppercase mb-1">
            <PackageCheck className="w-4 h-4 text-emerald-700" />
            <span>Cross-Tenant Commerce Surveillance</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Orders & Fulfillment Monitoring
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time tracking of prescription orders, delivery SLAs, and price savings across all participating pharmacies.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase">Active Orders</div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">{orders.length}</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">100% On-Time SLA</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase">Customer Savings Delivered</div>
          <div className="text-2xl font-extrabold font-mono text-emerald-700 mt-1">
            ${orders.reduce((acc, o) => acc + o.savingsTotal, 0).toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">vs Branded Originator list price</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase">Average Dispatch Time</div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">26 mins</div>
          <div className="text-[11px] text-slate-500 mt-0.5">From order verification to courier pickup</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-[10px] font-bold uppercase">Order Cancellation Rate</div>
          <div className="text-2xl font-extrabold font-mono text-emerald-700 mt-1">0.04%</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Well below 1.5% guardrail threshold</div>
        </div>
      </div>

      <div className="rounded-xl bg-white border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="font-bold text-slate-900">Recent Customer Orders Across Tenants</span>
          <span className="text-[11px] font-mono text-slate-500">Live PostgreSQL Stream</span>
        </div>

        <div className="divide-y divide-slate-100">
          {orders.map((order) => (
            <div key={order.id} className="p-4 hover:bg-slate-50/70 transition-colors space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono font-extrabold text-slate-900 text-sm">{order.id}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{order.placedAt}</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                    {order.tenantId}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      order.status === 'DELIVERED'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        : 'bg-blue-100 text-blue-900 border border-blue-200'
                    }`}
                  >
                    {order.status}
                  </span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Prescription Items</div>
                  <div className="space-y-1">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex items-center justify-between text-slate-700">
                        <span>
                          {it.quantity}x {it.medicine.name} ({it.medicine.dosage})
                        </span>
                        <span className="font-mono font-bold">${(it.selectedListing.price * it.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Delivery Destination</div>
                  <div className="text-slate-700">
                    <span className="font-semibold">{order.deliveryAddress.name}</span> • {order.deliveryAddress.street}, {order.deliveryAddress.city} {order.deliveryAddress.state} {order.deliveryAddress.zip}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-mono mt-1 font-medium">
                    Tracking: {order.trackingNumber} • {order.estimatedDelivery}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
