import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AdminSidebar, AdminTab } from './components/AdminPortal/AdminSidebar';
import { GovernanceDashboard } from './components/AdminPortal/GovernanceDashboard';
import { PriceAnomalyRadarView } from './components/AdminPortal/PriceAnomalyRadarView';
import { PartnerVerificationView } from './components/AdminPortal/PartnerVerificationView';
import { OrdersFulfillmentView } from './components/AdminPortal/OrdersFulfillmentView';
import { AuditLogsView } from './components/AdminPortal/AuditLogsView';
import { TenantManagementView } from './components/AdminPortal/TenantManagementView';
import { CustomerMarketplace } from './components/CustomerPortal/CustomerMarketplace';
import { CartModal, CartItem } from './components/CustomerPortal/CartModal';
import { StoreDashboard } from './components/StorePortal/StoreDashboard';

// Modals
import { BioStudyModal } from './components/Modals/BioStudyModal';
import { RLSInspectorModal } from './components/Modals/RLSInspectorModal';
import { CommandPalette } from './components/Modals/CommandPalette';
import { StoreDocsModal } from './components/Modals/StoreDocsModal';
import { PharmacopeiaModal } from './components/Modals/PharmacopeiaModal';
import { IntegrityScanModal } from './components/Modals/IntegrityScanModal';
import { AuthScreen } from './components/Auth/AuthScreen';

// Mock Data & Types
import {
  initialBioequivalentPairs,
  initialAnomalies,
  initialStores,
  initialAuditLogs,
  initialCustomerMedicines,
  initialCustomerOrders,
  DEFAULT_USERS,
} from './data/mockData';
import {
  BioequivalentPair,
  PriceAnomalyAlert,
  StoreOnboardingItem,
  AuditLogItem,
  CustomerMedicine,
  CustomerListing,
  PortalMode,
  UserProfile,
} from './types';

export default function App() {
  const [currentMode, setCurrentMode] = useState<PortalMode>('admin');
  const [adminTab, setAdminTab] = useState<AdminTab>('catalog');

  // Application Data States
  const [pairs, setPairs] = useState<BioequivalentPair[]>(initialBioequivalentPairs);
  const [anomalies, setAnomalies] = useState<PriceAnomalyAlert[]>(initialAnomalies);
  const [stores, setStores] = useState<StoreOnboardingItem[]>(initialStores);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(initialAuditLogs);
  const [orders, setOrders] = useState(initialCustomerOrders);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      medicine: initialCustomerMedicines[0],
      listing: initialCustomerMedicines[0].listings[0],
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modal States
  const [selectedBioStudyPair, setSelectedBioStudyPair] = useState<BioequivalentPair | null>(null);
  const [selectedStoreDocs, setSelectedStoreDocs] = useState<StoreOnboardingItem | null>(null);
  const [isRlsOpen, setIsRlsOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isPharmacopeiaOpen, setIsPharmacopeiaOpen] = useState(false);
  const [isIntegrityScanOpen, setIsIntegrityScanOpen] = useState(false);

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(DEFAULT_USERS.admin);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register'>('login');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSuccessLogin = (user: UserProfile) => {
    setCurrentUser(user);
    setCurrentMode(user.role);
    showToast(`Logged in as ${user.name} (${user.roleTitle})`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Logged out of session. Please sign in to continue.');
    setAuthInitialTab('login');
    setIsAuthOpen(true);
  };

  const handleOpenAuth = (tab: 'login' | 'register' = 'login') => {
    setAuthInitialTab(tab);
    setIsAuthOpen(true);
  };

  // Keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleApprovePair = (id: string) => {
    setPairs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, state: 'Verified & Active' as const } : p))
    );
    const targetPair = pairs.find((p) => p.id === id);
    const newLog: AuditLogItem = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type: 'SIGNOFF',
      actor: 'Medical Reviewer (You)',
      summary: `Approved Bioequivalence Group for ${targetPair?.genericName || id}`,
      detail: `Validated 90% confidence interval AUC/Cmax compliance. Group moved to production marketplace.`,
      sha256Hash: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b${Math.floor(Math.random() * 899 + 100)}`,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    showToast(`Approved bioequivalence signoff for ${targetPair?.genericName}! Group is now Active.`);
  };

  const handleToggleFreezeAnomaly = (id: string) => {
    setAnomalies((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const isQuarantined = a.status === 'QUARANTINED';
          const newStatus = isQuarantined ? ('ACTIVE_TELEMETRY' as const) : ('QUARANTINED' as const);
          return { ...a, status: newStatus };
        }
        return a;
      })
    );
    const targetAnomaly = anomalies.find((a) => a.id === id);
    const isQuarantining = targetAnomaly?.status !== 'QUARANTINED';
    const newLog: AuditLogItem = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type: 'AUTO-QUARANTINE',
      actor: 'Autonomous Radar (You)',
      summary: `${isQuarantining ? 'Quarantined' : 'Unfroze'} listing #${id} (${targetAnomaly?.medicineName})`,
      detail: `${isQuarantining ? 'Suppressed' : 'Restored'} from marketplace search due to ${targetAnomaly?.reason}.`,
      sha256Hash: `c81e728d9d4c2f636f067f89cc14862c1ecd4700${Math.floor(Math.random() * 899 + 100)}`,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    showToast(
      isQuarantining
        ? `Listing for ${targetAnomaly?.medicineName} has been frozen & quarantined in RLS partition.`
        : `Listing for ${targetAnomaly?.medicineName} has been restored to active status.`
    );
  };

  const handleEnforceCapAnomaly = (id: string) => {
    setAnomalies((prev) =>
      prev.map((a) => (a.id === id ? { ...a, listedPrice: a.baselinePrice, status: 'RESOLVED' as const } : a))
    );
    const targetAnomaly = anomalies.find((a) => a.id === id);
    const newLog: AuditLogItem = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type: 'RLS_ENFORCEMENT',
      actor: 'Price Ceiling Guardrail',
      summary: `Enforced regional price cap on ${targetAnomaly?.medicineName} at Store #${targetAnomaly?.storeId}`,
      detail: `Adjusted price from $${targetAnomaly?.listedPrice.toFixed(2)} down to baseline $${targetAnomaly?.baselinePrice.toFixed(2)}.`,
      sha256Hash: `7a38b34c2d1e0f636f067f89cc14862c1ecd4700${Math.floor(Math.random() * 899 + 100)}`,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    showToast(`Price cap enforced! Adjusted ${targetAnomaly?.medicineName} to baseline median.`);
  };

  const handleAuthorizeStore = (id: string) => {
    setStores((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'Tier 1 Partner' as const } : s))
    );
    const store = stores.find((s) => s.id === id);
    const newLog: AuditLogItem = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type: 'SECURITY',
      actor: 'Board Registrar (You)',
      summary: `Authorized Tenant ${store?.storeName} (#${store?.licenseNumber})`,
      detail: `Provisioned PostgreSQL RLS partition and issued cryptographic JWT tenant token.`,
      sha256Hash: `d89e728d9d4c2f636f067f89cc14862c1ecd4700${Math.floor(Math.random() * 899 + 100)}`,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    showToast(`Store ${store?.storeName} successfully authorized with Tier 1 Partner token.`);
  };

  // Cart Operations
  const handleAddToCart = (medicine: CustomerMedicine, listing: CustomerListing) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.medicine.id === medicine.id && item.listing.storeId === listing.storeId);
      if (existing) {
        return prev.map((item) =>
          item.medicine.id === medicine.id && item.listing.storeId === listing.storeId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { medicine, listing, quantity: 1 }];
    });
    showToast(`Added ${medicine.name} to patient savings cart!`);
  };

  const handleUpdateCartQuantity = (id: string, storeId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.medicine.id === id && item.listing.storeId === storeId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string, storeId: string) => {
    setCartItems((prev) => prev.filter((item) => !(item.medicine.id === id && item.listing.storeId === storeId)));
    showToast('Removed medicine from savings cart.');
  };

  const handleCheckout = () => {
    const newOrder = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: 'Patient User',
      placedAt: 'Just now',
      status: 'PREPARING' as const,
      total: cartItems.reduce((acc, it) => acc + it.listing.price * it.quantity, 0) + 1.99,
      savingsTotal: cartItems.reduce(
        (acc, it) => acc + (it.medicine.msrpPrice - it.listing.price) * it.quantity,
        0
      ),
      items: cartItems.map((c) => ({
        medicine: c.medicine,
        selectedListing: c.listing,
        quantity: c.quantity,
      })),
      tenantId: cartItems[0]?.listing.storeName || 'MetroGeneric Chemist',
      trackingNumber: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
      estimatedDelivery: '35 mins (Express)',
      deliveryAddress: {
        name: 'Patient User',
        street: '482 Lincoln Ave, Apt 4B',
        city: 'Chicago',
        state: 'IL',
        zip: '60614',
      },
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    showToast('Prescription order confirmed! Tracked in Orders & Fulfillment.');
  };

  const pendingSignoffCount = pairs.filter((p) => p.state === 'Pending Board').length;
  const activeAnomaliesCount = anomalies.filter((a) => a.status !== 'RESOLVED').length;
  const pendingStoreCount = stores.filter((s) => s.status === 'Awaiting Verification').length;

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-2.5 rounded-xl bg-slate-900 text-white shadow-2xl text-xs font-semibold flex items-center gap-2 border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Global Header */}
      <Header
        currentMode={currentMode}
        onSelectMode={(mode) => setCurrentMode(mode)}
        onOpenRLSInspector={() => setIsRlsOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onRunIntegrityScan={() => setIsIntegrityScanOpen(true)}
        anomalyCount={activeAnomaliesCount}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* Main App Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* If Mode is Admin, show the Admin Sidebar */}
        {currentMode === 'admin' && (
          <AdminSidebar
            currentTab={adminTab}
            onSelectTab={(tab) => setAdminTab(tab)}
            pendingSignoffsCount={pendingSignoffCount}
            activeAnomaliesCount={activeAnomaliesCount}
            pendingStoreCount={pendingStoreCount}
          />
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7">
          <div className="max-w-7xl mx-auto">
            {currentMode === 'admin' && (
              <>
                {adminTab === 'catalog' && (
                  <GovernanceDashboard
                    pairs={pairs}
                    onApprovePair={handleApprovePair}
                    anomalies={anomalies}
                    onToggleFreezeAnomaly={handleToggleFreezeAnomaly}
                    onEnforceCapAnomaly={handleEnforceCapAnomaly}
                    stores={stores}
                    onAuthorizeStore={handleAuthorizeStore}
                    auditLogs={auditLogs}
                    onRunIntegrityScan={() => setIsIntegrityScanOpen(true)}
                    onExportCompliance={() => {
                      const dataStr =
                        'data:text/json;charset=utf-8,' +
                        encodeURIComponent(
                          JSON.stringify(
                            {
                              exportedAt: new Date().toISOString(),
                              node: 'US-East-Clinical-04',
                              complianceStandard: 'FDA-21-CFR-320 / EMA-CPMP',
                              pairs,
                              auditLogs,
                            },
                            null,
                            2
                          )
                        );
                      const downloadAnchor = document.createElement('a');
                      downloadAnchor.setAttribute('href', dataStr);
                      downloadAnchor.setAttribute('download', 'genericMed_Compliance_Trail.json');
                      document.body.appendChild(downloadAnchor);
                      downloadAnchor.click();
                      downloadAnchor.remove();
                      showToast('Exported complete regulatory compliance trail.');
                    }}
                    onOpenBioStudyModal={(p) => setSelectedBioStudyPair(p)}
                    onOpenStoreDocsModal={(s) => setSelectedStoreDocs(s)}
                    onOpenPharmacopeiaModal={() => setIsPharmacopeiaOpen(true)}
                  />
                )}

                {adminTab === 'price-radar' && (
                  <PriceAnomalyRadarView
                    anomalies={anomalies}
                    onToggleFreeze={handleToggleFreezeAnomaly}
                    onEnforceCap={handleEnforceCapAnomaly}
                  />
                )}

                {adminTab === 'partner-verification' && (
                  <PartnerVerificationView
                    stores={stores}
                    onAuthorizeStore={handleAuthorizeStore}
                    onOpenStoreDocs={(s) => setSelectedStoreDocs(s)}
                  />
                )}

                {adminTab === 'orders' && <OrdersFulfillmentView orders={orders} />}

                {adminTab === 'reviews' && (
                  <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
                    <h3 className="text-base font-extrabold text-slate-900">Patient Review Moderation</h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      All 142 patient efficacy and pharmacy delivery ratings are verified against prescription fulfillment hashes. Zero spam or paid influencer manipulation detected.
                    </p>
                    <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-bold border border-emerald-200">
                      Clean Sentiment Index: 99.1%
                    </div>
                  </div>
                )}

                {adminTab === 'audit-logs' && <AuditLogsView logs={auditLogs} />}

                {adminTab === 'tenant-mgmt' && <TenantManagementView />}

                {adminTab === 'api-limits' && (
                  <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-4 text-xs">
                    <h3 className="text-base font-extrabold text-slate-900">Multi-Tenant API & Rate Limits</h3>
                    <p className="text-slate-500">
                      Configuring Redis Token Bucket rate limiting across 1,420 pharmacy store tenants and public marketplace clients.
                    </p>
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="text-[10px] uppercase font-bold text-slate-400">Public Marketplace Web Tier</div>
                        <div className="text-lg font-bold font-mono text-slate-900 mt-1">10,000 req/min</div>
                        <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Burst: 25,000 req/min</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="text-[10px] uppercase font-bold text-slate-400">Pharmacy Inventory API Ingest</div>
                        <div className="text-lg font-bold font-mono text-slate-900 mt-1">500 req/min per Tenant</div>
                        <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Zero drop guarantee</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="text-[10px] uppercase font-bold text-slate-400">Public Scrapers & Crawlers</div>
                        <div className="text-lg font-bold font-mono text-rose-700 mt-1">60 req/min IP Cap</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">Cloudflare WAF Challenge</div>
                      </div>
                    </div>
                  </div>
                )}

                {adminTab === 'settings' && (
                  <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-4 text-xs">
                    <h3 className="text-base font-extrabold text-slate-900">System & Governance Settings</h3>
                    <p className="text-slate-500">
                      Configure algorithmic thresholds, FDA Orange Book automated sync schedules, and HIPAA retention rules.
                    </p>
                    <div className="space-y-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900">Autonomous Price Radar Variance Threshold</div>
                          <div className="text-[11px] text-slate-500">Flag when listed price diverges ±35% from regional weighted median</div>
                        </div>
                        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                          ±35.0%
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900">FDA Orange Book Daily Sync Job</div>
                          <div className="text-[11px] text-slate-500">Nightly cron at 02:00 UTC via NIH RxNorm & DailyMed APIs</div>
                        </div>
                        <span className="font-mono font-bold text-slate-800 bg-slate-200 px-2.5 py-1 rounded">
                          ACTIVE (CRON)
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900">Audit Stream Retention Standard</div>
                          <div className="text-[11px] text-slate-500">HIPAA Security Rule § 164.316(b)(2)(i) minimum 6-year archival</div>
                        </div>
                        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                          PERMANENT WORM
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {currentMode === 'customer' && (
              <CustomerMarketplace
                medicines={initialCustomerMedicines}
                onAddToCart={handleAddToCart}
                cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
                onOpenCart={() => setIsCartOpen(true)}
                currentUser={currentUser}
                onOpenAuth={handleOpenAuth}
              />
            )}

            {currentMode === 'store' && (
              <StoreDashboard
                currentUser={currentUser}
                onOpenAuth={handleOpenAuth}
              />
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <BioStudyModal
        pair={selectedBioStudyPair}
        onClose={() => setSelectedBioStudyPair(null)}
        onApprove={handleApprovePair}
      />

      <StoreDocsModal
        store={selectedStoreDocs}
        onClose={() => setSelectedStoreDocs(null)}
        onAuthorize={handleAuthorizeStore}
      />

      <RLSInspectorModal isOpen={isRlsOpen} onClose={() => setIsRlsOpen(false)} />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        pairs={pairs}
        anomalies={anomalies}
        stores={stores}
        onSelectPair={(p) => {
          setCurrentMode('admin');
          setAdminTab('catalog');
          setSelectedBioStudyPair(p);
        }}
        onNavigateMode={(mode) => setCurrentMode(mode)}
        onOpenAuth={handleOpenAuth}
      />

      <PharmacopeiaModal isOpen={isPharmacopeiaOpen} onClose={() => setIsPharmacopeiaOpen(false)} />

      <IntegrityScanModal isOpen={isIntegrityScanOpen} onClose={() => setIsIntegrityScanOpen(false)} />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckout}
      />

      {/* Authentication: Login & Registration Screen */}
      <AuthScreen
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccessLogin={handleSuccessLogin}
        initialMode={authInitialTab}
        initialRole={currentMode}
        isModal={true}
      />
    </div>
  );
}
