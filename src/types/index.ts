export type PortalMode = 'admin' | 'customer' | 'store';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: PortalMode;
  roleTitle: string;
  avatarInitials: string;
  phone?: string;
  tenantOrStoreName?: string;
  licenseNumber?: string;
  npiNumber?: string;
  address?: string;
  joinedDate?: string;
}

export interface BioequivalentPair {
  id: string;
  category: 'Cardiovascular' | 'Antibiotics' | 'Antidiabetics' | 'Analgesics' | 'Gastrointestinal';
  brandedName: string;
  brandedDosage: string;
  brandedManufacturer: string;
  brandedMSRP: number;
  genericName: string;
  genericDosage: string;
  genericManufacturer: string;
  genericPrice: number;
  activeMoiety: string;
  bioStudyId: string;
  studyOrganization: 'FDA' | 'EMA' | 'CDSCO';
  studyYear: number;
  bioequivalenceMatch: number; // e.g. 99.8
  aucCmaxRatio: string; // e.g. "99.4% (±2%)"
  state: 'Pending Board' | 'Verified & Active' | 'Quarantined';
  savingsPercent: number;
  highPriority?: boolean;
}

export interface PriceAnomalyAlert {
  id: string;
  storeId: string;
  storeName: string;
  cluster: string;
  medicineName: string;
  packSize: string;
  listedPrice: number;
  baselinePrice: number;
  type: 'FLASH_DUMP' | 'SUPPRESSED_SEARCH' | 'MARGIN_SPIKE';
  variancePercent: number; // negative for dump, positive for spike
  reason: string;
  syncTime: string;
  status: 'ACTIVE_TELEMETRY' | 'QUARANTINED' | 'RESOLVED';
  iconType: 'down' | 'up';
}

export interface StoreOnboardingItem {
  id: string;
  storeName: string;
  licenseNumber: string;
  status: 'Awaiting Verification' | 'Tier 1 Partner' | 'Suspended';
  stateBoardLicense: 'VALIDATED' | 'PENDING' | 'FLAGGED';
  gstTaxCredentials: 'CLEAN (0 LVR)' | 'FLAGGED' | 'PENDING';
  pharmacistCouncilId: string;
  pharmacistStatus: 'ACTIVE' | 'PENDING';
  tenantId: string;
  cluster: string;
  deliverySla: number;
  fulfillmentRate: number;
  avgDispatchTime: string;
  anomalyViolations: number;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  type: 'SIGNOFF' | 'AUTO-QUARANTINE' | 'SECURITY' | 'TELEMETRY' | 'PAYMENT' | 'RLS_ENFORCEMENT';
  actor: string;
  summary: string;
  detail: string;
  sha256Hash: string;
}

export interface PharmacyListing {
  id: string;
  storeId: string;
  storeName: string;
  cluster: string;
  rating: number;
  reviewsCount: number;
  deliveryTime: string;
  price: number;
  inStock: boolean;
  stockQty: number;
  verifiedSLA: string;
}

export type CustomerListing = PharmacyListing;

export interface CustomerMedicine {
  id: string;
  name: string;
  dosage: string;
  brandEquivalent: string;
  activeIngredient: string;
  category: string;
  description: string;
  prescriptionRequired: boolean;
  basePrice: number;
  msrpPrice: number;
  savingsPercentage: number;
  bioMatch: number;
  listings: PharmacyListing[];
  indications: string[];
  sideEffects: string[];
  intakeGuide: string;
}

export interface CartItem {
  medicine: CustomerMedicine;
  selectedListing: PharmacyListing;
  quantity: number;
}

export interface CustomerOrder {
  id: string;
  placedAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  savingsTotal: number;
  deliveryAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  status: 'ORDER_PLACED' | 'VERIFIED_RLS' | 'STORE_DISPATCHED' | 'DELIVERED';
  tenantId: string;
  trackingNumber: string;
  estimatedDelivery: string;
}
