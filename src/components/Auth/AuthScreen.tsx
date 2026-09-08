import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  Building2,
  Store,
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  Phone,
  MapPin,
  FileCheck2,
  KeyRound,
  X,
  AlertCircle,
  Stethoscope,
  ShoppingBag,
} from 'lucide-react';
import { PortalMode, UserProfile } from '../../types';
import { DEFAULT_USERS } from '../../data/mockData';

interface AuthScreenProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSuccessLogin: (user: UserProfile) => void;
  initialMode?: 'login' | 'register';
  initialRole?: PortalMode;
  isModal?: boolean;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  isOpen = true,
  onClose,
  onSuccessLogin,
  initialMode = 'login',
  initialRole = 'admin',
  isModal = true,
}) => {
  const [authTab, setAuthTab] = useState<'login' | 'register'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<PortalMode>(initialRole);

  // Form Fields - Login
  const [loginEmail, setLoginEmail] = useState('sarah.chen@fda-board.genericmed.gov');
  const [loginPassword, setLoginPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Form Fields - Register
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  // Role specific fields
  const [regStoreName, setRegStoreName] = useState('');
  const [regLicenseNumber, setRegLicenseNumber] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regNpiNumber, setRegNpiNumber] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedClinical, setAgreedClinical] = useState(false);

  // State Management
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  if (isModal && !isOpen) return null;

  // Handle Quick Demo Login
  const handleQuickDemo = (role: PortalMode) => {
    setSelectedRole(role);
    const demoUser = DEFAULT_USERS[role];
    if (demoUser) {
      setLoginEmail(demoUser.email);
      setLoginPassword('DemoPassword2026!');
    }
  };

  // Password Strength Calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score += 25;
    if (/[A-Z]/.test(pass)) score += 25;
    if (/[0-9]/.test(pass)) score += 25;
    if (/[^A-Za-z0-9]/.test(pass)) score += 25;
    return score;
  };

  const passwordStrength = getPasswordStrength(regPassword);

  // Handle Login Submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!loginEmail.trim()) {
      setErrorMessage('Please enter your account email address.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Retrieve or synthesize user
      const existingUser = Object.values(DEFAULT_USERS).find(
        (u) => u.email.toLowerCase() === loginEmail.toLowerCase()
      ) || {
        id: `USR-${Date.now().toString().slice(-6)}`,
        name: loginEmail.split('@')[0].replace('.', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        email: loginEmail,
        role: selectedRole,
        roleTitle:
          selectedRole === 'admin'
            ? 'Regulatory Review Officer'
            : selectedRole === 'store'
            ? 'Authorized Pharmacy Pharmacist'
            : 'Verified Healthcare Consumer',
        avatarInitials: loginEmail.slice(0, 2).toUpperCase(),
        joinedDate: 'Sep 2026',
      };

      setSuccessMessage(`Welcome back, ${existingUser.name}! Opening ${selectedRole.toUpperCase()} portal...`);
      setTimeout(() => {
        onSuccessLogin(existingUser);
        if (onClose) onClose();
      }, 700);
    }, 800);
  };

  // Handle Register Submission
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!regName.trim()) {
      setErrorMessage('Please enter your full legal name.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (regPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (selectedRole === 'store' && !regLicenseNumber.trim()) {
      setErrorMessage('State Pharmacy Board license number is required for partner onboarding.');
      return;
    }
    if (selectedRole === 'admin' && !regNpiNumber.trim()) {
      setErrorMessage('Board Accreditation / NPI number is required for regulatory officers.');
      return;
    }
    if (!agreedTerms) {
      setErrorMessage('Please accept the genericMed HIPAA Terms of Service to continue.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const initials = regName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'US';

      const newUser: UserProfile = {
        id: `USR-${Date.now().toString().slice(-6)}`,
        name: regName,
        email: regEmail,
        role: selectedRole,
        roleTitle:
          selectedRole === 'admin'
            ? 'Regulatory Reviewer'
            : selectedRole === 'store'
            ? `${regStoreName || 'Partner Pharmacy'} Pharmacist`
            : 'Registered Patient',
        avatarInitials: initials,
        phone: regPhone,
        tenantOrStoreName: regStoreName,
        licenseNumber: regLicenseNumber,
        npiNumber: regNpiNumber,
        address: regAddress,
        joinedDate: 'Sep 2026',
      };

      setSuccessMessage(`Account registered successfully for ${regName}! Initializing portal...`);
      setTimeout(() => {
        onSuccessLogin(newUser);
        if (onClose) onClose();
      }, 750);
    }, 900);
  };

  return (
    <div
      className={
        isModal
          ? 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200'
          : 'w-full max-w-2xl mx-auto my-6'
      }
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-xl overflow-hidden flex flex-col my-auto">
        {/* Brand Banner Header */}
        <div className="bg-gradient-to-r from-[#0a3540] via-[#0f4c5c] to-[#0c3c49] text-white p-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          {isModal && onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono font-bold text-emerald-300 text-xs tracking-wider uppercase">
                AUTHENTICATION & ACCESS CONTROL
              </span>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                generic<span className="text-emerald-400">Med</span>
              </h1>
            </div>
          </div>

          <p className="text-slate-200 text-xs max-w-md mt-1">
            Access certified bioequivalent medicine listings, multi-tenant pharmacy inventory controls, and regulatory audit ledgers.
          </p>

          {/* Quick Demo Role Selector Pills */}
          <div className="mt-4 pt-3 border-t border-white/15">
            <div className="flex items-center justify-between text-[11px] text-slate-300 font-mono mb-2">
              <span>Quick 1-Click Persona Demo:</span>
              <span className="text-emerald-300 font-bold">Auto-fills credentials</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  selectedRole === 'admin'
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Admin Board</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('store')}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  selectedRole === 'store'
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15'
                }`}
              >
                <Store className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Pharmacy Partner</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('customer')}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  selectedRole === 'customer'
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15'
                }`}
              >
                <User className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Patient User</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Switcher: Sign In vs Register */}
        <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setAuthTab('login');
              setErrorMessage(null);
            }}
            className={`py-3.5 px-4 text-center transition-colors relative ${
              authTab === 'login'
                ? 'text-[#0f4c5c] bg-white shadow-2xs font-extrabold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Sign In to Existing Account</span>
            {authTab === 'login' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0f4c5c]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthTab('register');
              setErrorMessage(null);
            }}
            className={`py-3.5 px-4 text-center transition-colors relative ${
              authTab === 'register'
                ? 'text-[#0f4c5c] bg-white shadow-2xs font-extrabold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Create New Account</span>
            {authTab === 'register' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0f4c5c]" />
            )}
          </button>
        </div>

        {/* Main Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* Alerts */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>{errorMessage}</div>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>{successMessage}</div>
            </div>
          )}

          {/* Role Indicator / Selector */}
          <div className="mb-5">
            <label className="block text-[11px] font-mono uppercase font-bold text-slate-500 mb-1.5">
              Portal Access Role:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  selectedRole === 'admin'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1 text-slate-800 font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Regulatory</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Board Governance</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('store')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  selectedRole === 'store'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1 text-slate-800 font-bold text-xs">
                  <Store className="w-3.5 h-3.5 text-blue-700" />
                  <span>Pharmacy</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Store Partner</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('customer')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  selectedRole === 'customer'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1 text-slate-800 font-bold text-xs">
                  <User className="w-3.5 h-3.5 text-purple-700" />
                  <span>Patient</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Drug Consumer</div>
              </button>
            </div>
          </div>

          {/* SIGN IN FORM */}
          {authTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Institutional / Account Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0f4c5c] focus:ring-2 focus:ring-[#0f4c5c]/10 text-slate-900 font-medium placeholder:text-slate-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[11px] text-[#0f4c5c] font-semibold hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your security password"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 focus:border-[#0f4c5c] focus:ring-2 focus:ring-[#0f4c5c]/10 text-slate-900 font-medium placeholder:text-slate-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 text-xs">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0f4c5c] focus:ring-[#0f4c5c] border-slate-300"
                  />
                  <span>Remember this workstation (30 days)</span>
                </label>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  256-Bit TLS Protected
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 rounded-xl bg-[#0f4c5c] hover:bg-[#0c3c49] text-white font-bold text-xs shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Credentials & Permissions...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to {selectedRole.toUpperCase()} Portal</span>
                    <ArrowRight className="w-4 h-4 text-emerald-300" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* REGISTRATION FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Full Legal Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Dr. Emily Thorne"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#0f4c5c] text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Official Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="emily@pharma.org"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#0f4c5c] text-slate-900 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Role-Specific Fields */}
              {selectedRole === 'store' && (
                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2.5">
                  <div className="font-bold text-blue-900 text-[11px] flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-blue-700" />
                    <span>Pharmacy Tenant Accreditation Details</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 mb-0.5">
                        Pharmacy Entity Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={regStoreName}
                        onChange={(e) => setRegStoreName(e.target.value)}
                        placeholder="Apex Care Chemist LLC"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 mb-0.5">
                        State Drug License Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={regLicenseNumber}
                        onChange={(e) => setRegLicenseNumber(e.target.value)}
                        placeholder="PH-2026-XXXXX"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium text-xs font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 mb-0.5">
                      Physical Pharmacy Street Address & ZIP
                    </label>
                    <input
                      type="text"
                      value={regAddress}
                      onChange={(e) => setRegAddress(e.target.value)}
                      placeholder="1040 West Grand Ave, Chicago, IL 60642"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium text-xs"
                    />
                  </div>
                </div>
              )}

              {selectedRole === 'admin' && (
                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2.5">
                  <div className="font-bold text-emerald-950 text-[11px] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Clinical / Regulatory Board Credentials</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 mb-0.5">
                        National Provider ID (NPI) / Board License *
                      </label>
                      <input
                        type="text"
                        required
                        value={regNpiNumber}
                        onChange={(e) => setRegNpiNumber(e.target.value)}
                        placeholder="NPI-9982410291"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 mb-0.5">
                        Clinical Department / Council
                      </label>
                      <input
                        type="text"
                        defaultValue="Division of Bioequivalence"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedRole === 'customer' && (
                <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-200 space-y-2">
                  <div className="font-bold text-purple-900 text-[11px] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-purple-700" />
                    <span>Prescription Delivery Information</span>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 mb-0.5">
                      Home Street Address for Medicine Delivery
                    </label>
                    <input
                      type="text"
                      value={regAddress}
                      onChange={(e) => setRegAddress(e.target.value)}
                      placeholder="e.g. 520 N Michigan Ave, Apt 12A, Chicago, IL"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 8 characters"
                      className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-300 focus:border-[#0f4c5c] text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-300 focus:border-[#0f4c5c] text-slate-900 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Password Strength Indicator */}
              {regPassword && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                    <span>Security Strength</span>
                    <span
                      className={
                        passwordStrength >= 75
                          ? 'text-emerald-700 font-bold'
                          : passwordStrength >= 50
                          ? 'text-amber-600 font-bold'
                          : 'text-rose-600 font-bold'
                      }
                    >
                      {passwordStrength >= 100
                        ? 'Very Strong'
                        : passwordStrength >= 75
                        ? 'Strong'
                        : passwordStrength >= 50
                        ? 'Medium'
                        : 'Weak (add symbols & numbers)'}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        passwordStrength >= 75
                          ? 'bg-emerald-500'
                          : passwordStrength >= 50
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Compliance Checkboxes */}
              <div className="space-y-2 pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-slate-600 text-xs">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0f4c5c] focus:ring-[#0f4c5c] border-slate-300 mt-0.5 shrink-0"
                  />
                  <span>
                    I agree to the <strong>HIPAA Security Agreement</strong>, Bioequivalence Verification Standards, and Terms of Use.
                  </span>
                </label>

                <label className="flex items-start gap-2 cursor-pointer text-slate-600 text-xs">
                  <input
                    type="checkbox"
                    checked={agreedClinical}
                    onChange={(e) => setAgreedClinical(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0f4c5c] focus:ring-[#0f4c5c] border-slate-300 mt-0.5 shrink-0"
                  />
                  <span>
                    I verify all professional or patient identity records provided are true and accurate under penalty of state board debarment.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-3 py-3 rounded-xl bg-[#0f4c5c] hover:bg-[#0c3c49] text-white font-bold text-xs shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating Multi-Tenant Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Register & Access {selectedRole.toUpperCase()} Portal</span>
                    <ArrowRight className="w-4 h-4 text-emerald-300" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer Guarantee */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4 text-emerald-700" />
            <span>FDA 21 CFR § 320 & HIPAA Privacy Verified</span>
          </div>
          <button
            onClick={() => setAuthTab(authTab === 'login' ? 'register' : 'login')}
            className="text-[#0f4c5c] font-bold hover:underline"
          >
            {authTab === 'login' ? 'Need an account? Register' : 'Existing user? Sign In'}
          </button>
        </div>
      </div>

      {/* Interactive Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#0f4c5c]" />
                <span>Reset Security Password</span>
              </div>
              <button
                onClick={() => {
                  setShowForgotModal(false);
                  setForgotSent(false);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {forgotSent ? (
              <div className="text-center py-4 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <div className="font-bold text-slate-900 text-sm">Security Link Dispatched</div>
                <p className="text-slate-500 text-xs">
                  A password reset token has been sent to <strong>{forgotEmail || 'your email'}</strong>.
                </p>
                <button
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotSent(false);
                  }}
                  className="mt-3 px-4 py-2 rounded-xl bg-[#0f4c5c] text-white font-bold"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-slate-600">
                  Enter your verified clinical or patient email address. We'll send an authentication recovery link with a temporary OTP.
                </p>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Your Registered Email
                  </label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
                <button
                  onClick={() => setForgotSent(true)}
                  className="w-full py-2.5 rounded-xl bg-[#0f4c5c] hover:bg-[#0c3c49] text-white font-bold"
                >
                  Send Password Reset Link
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
