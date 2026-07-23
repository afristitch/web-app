"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Trash2, HelpCircle, AlertTriangle, KeyRound, ShieldAlert, Camera, Pencil, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { organizationService, authService, profileService, uploadService } from "@/lib/services";
import { Modal } from "@/components/ui/Modal";
import { AvatarPreset } from "@/lib/types";

export default function SettingsPage() {
  const { user, logout } = useAuth();

  // Profile & Studio Avatar/Logo State
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [userPhotoUrl, setUserPhotoUrl] = useState("");
  const [studioLogoUrl, setStudioLogoUrl] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [userProfileSaving, setUserProfileSaving] = useState(false);
  const [userProfileSuccess, setUserProfileSuccess] = useState(false);

  // Original snapshot for cancel functionality
  const [initialProfile, setInitialProfile] = useState({ name: "", email: "", photoUrl: "" });
  const [initialOrg, setInitialOrg] = useState({ name: "", email: "", phone: "", address: "", logoUrl: "" });

  // Editable user profile toggle
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [editingProfile, setEditingProfile] = useState(false);

  // Editable studio info toggle
  const [editingStudio, setEditingStudio] = useState(false);

  // Avatar presets from API
  const [avatarPresets, setAvatarPresets] = useState<AvatarPreset[]>([]);
  const [avatarsLoading, setAvatarsLoading] = useState(true);

  // Image upload state
  const [uploadingUserPhoto, setUploadingUserPhoto] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Delete Account Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    // Fetch organization profile
    organizationService.getProfile().then((org) => {
      if (org) {
        const bName = org.name || "";
        const bEmail = org.email || "";
        const bPhone = org.phone || "";
        const bAddr = org.address || "";
        const bLogo = org.logoUrl || "";

        setBusinessName(bName);
        setBusinessEmail(bEmail);
        setPhone(bPhone);
        setAddress(bAddr);
        setStudioLogoUrl(bLogo);
        setInitialOrg({ name: bName, email: bEmail, phone: bPhone, address: bAddr, logoUrl: bLogo });
      } else if (user) {
        setBusinessName(user.name || "");
        setPhone(user.phone || "");
        setInitialOrg({ name: user.name || "", email: "", phone: user.phone || "", address: "", logoUrl: "" });
      }
    });

    // Fetch user profile from API to get photoUrl + name + email
    profileService.getMyProfile().then((res: any) => {
      const profileData = res?.data || res;
      const userData = profileData?.user || profileData;
      if (userData) {
        const uName = userData.name || user?.name || "";
        const uEmail = userData.email || user?.email || "";
        const uPhoto = userData.photoUrl || user?.photoUrl || "";

        setUserName(uName);
        setUserEmail(uEmail);
        setUserPhotoUrl(uPhoto);
        setInitialProfile({ name: uName, email: uEmail, photoUrl: uPhoto });
      }
    }).catch(() => {
      const uName = user?.name || "";
      const uEmail = user?.email || "";
      const uPhoto = user?.photoUrl || "";

      setUserName(uName);
      setUserEmail(uEmail);
      setUserPhotoUrl(uPhoto);
      setInitialProfile({ name: uName, email: uEmail, photoUrl: uPhoto });
    });

    // Fetch avatar presets from API (GET /avatars)
    profileService.getAvatarPresets().then((presets) => {
      setAvatarPresets(presets);
      setAvatarsLoading(false);
    }).catch(() => {
      setAvatarsLoading(false);
    });
  }, [user]);

  // Cancel edit handlers
  const handleCancelProfileEdit = () => {
    setUserName(initialProfile.name);
    setUserEmail(initialProfile.email);
    setUserPhotoUrl(initialProfile.photoUrl);
    setEditingProfile(false);
  };

  const handleCancelStudioEdit = () => {
    setBusinessName(initialOrg.name);
    setBusinessEmail(initialOrg.email);
    setPhone(initialOrg.phone);
    setAddress(initialOrg.address);
    setStudioLogoUrl(initialOrg.logoUrl);
    setEditingStudio(false);
  };

  // Handle user profile photo file upload
  const handleUserPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingUserPhoto(true);
    try {
      const result = await uploadService.uploadImage(file, "profiles");
      setUserPhotoUrl(result.url);
      setEditingProfile(true);
    } catch (err: any) {
      console.error("User photo upload failed:", err);
      alert("Failed to upload photo: " + (err.message || "Unknown error"));
    } finally {
      setUploadingUserPhoto(false);
    }
  };

  // Handle studio logo file upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    try {
      const result = await uploadService.uploadImage(file, "logos");
      setStudioLogoUrl(result.url);
      setEditingStudio(true);
    } catch (err: any) {
      console.error("Logo upload failed:", err);
      alert("Failed to upload logo: " + (err.message || "Unknown error"));
    } finally {
      setUploadingLogo(false);
    }
  };

  // Save user profile (PUT /profile/me)
  const handleSaveUserProfile = async () => {
    setUserProfileSaving(true);
    try {
      await profileService.updateProfile({
        photoUrl: userPhotoUrl,
        name: userName,
        email: userEmail,
      });
      setInitialProfile({ name: userName, email: userEmail, photoUrl: userPhotoUrl });
      setEditingProfile(false);
      setUserProfileSuccess(true);
      setTimeout(() => setUserProfileSuccess(false), 3000);
    } catch (err: any) {
      console.error(err);
      alert("Failed to update profile: " + (err.message || "Unknown error"));
    } finally {
      setUserProfileSaving(false);
    }
  };

  // Save business/organization settings (PUT /organization)
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      await organizationService.updateProfile({
        name: businessName,
        email: businessEmail,
        phone,
        address,
        logoUrl: studioLogoUrl,
      });
      setInitialOrg({ name: businessName, email: businessEmail, phone, address, logoUrl: studioLogoUrl });
      setEditingStudio(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      console.error(err);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long.");
      return;
    }

    setPasswordLoading(true);
    try {
      await authService.changePassword({ currentPassword, newPassword });
      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordSuccess(false), 4000);
    } catch (err: any) {
      setPasswordError(err.message || "Failed to update password. Please verify current password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText.trim().toLowerCase() !== "delete my account") return;
    setDeleteLoading(true);
    try {
      await organizationService.deleteAccount();
      logout();
    } catch (err: any) {
      alert(err.message || "Failed to delete account.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase" style={{ fontFamily: 'var(--font-varela-round)' }}>
            Business Settings & Profile
          </h1>
          <p className="text-xs text-stone-400 mt-1 font-medium">
            Manage your personal profile, studio branding, passwords, and account options.
          </p>
        </div>

        <Link
          href="/help"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-stone-900 px-4 py-2 text-xs font-bold text-white hover:bg-white hover:text-black transition-all cursor-pointer"
        >
          <HelpCircle className="h-4 w-4" /> Platform Guide & Support
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 1. Tailor Personal Profile Card */}
        <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl space-y-5 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Header with Save & Cancel buttons at top-right */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>
                Personal Profile
              </h3>
              <div className="flex items-center gap-2">
                {editingProfile && (
                  <button
                    type="button"
                    onClick={handleCancelProfileEdit}
                    className="rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-bold text-stone-300 hover:bg-stone-800 hover:text-white transition-all cursor-pointer"
                    style={{ fontFamily: 'var(--font-varela-round)' }}
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleSaveUserProfile}
                  disabled={userProfileSaving || !editingProfile}
                  className="rounded-full bg-white px-4 py-1.5 text-xs font-extrabold text-black shadow-xs hover:bg-stone-200 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'var(--font-varela-round)' }}
                >
                  {userProfileSaving ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </div>

            {/* Avatar & Info */}
            <div className="flex items-center gap-4">
              {/* User Avatar Preview with camera upload trigger */}
              <label className="relative cursor-pointer group shrink-0">
                {userPhotoUrl ? (
                  <Image
                    src={userPhotoUrl}
                    alt="Avatar"
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover border-2 border-white/20 group-hover:opacity-80 transition-opacity"
                    unoptimized
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-white text-black font-extrabold text-xl flex items-center justify-center uppercase group-hover:opacity-80 transition-opacity">
                    {(userName || user?.name) ? (userName || user?.name || "").slice(0, 2) : "TA"}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 p-1.5 bg-white rounded-full border border-white/20 text-black group-hover:scale-110 transition-transform">
                  {uploadingUserPhoto ? (
                    <div className="h-3.5 w-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <Camera className="h-3.5 w-3.5" />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUserPhotoUpload}
                  className="hidden"
                  disabled={uploadingUserPhoto}
                />
              </label>

              <div className="flex-1 min-w-0">
                {editingProfile ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-white/20 bg-stone-900 px-3 py-1.5 text-xs font-bold text-white placeholder-stone-500 focus:border-white/40 focus:outline-none"
                    />
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="Your email"
                      className="w-full rounded-xl border border-white/20 bg-stone-900 px-3 py-1.5 text-xs font-medium text-stone-300 placeholder-stone-500 focus:border-white/40 focus:outline-none"
                    />
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-white tracking-tight">{userName || user?.name || "Tailor"}</span>
                      <button
                        type="button"
                        onClick={() => setEditingProfile(true)}
                        className="p-1 text-stone-400 hover:text-white transition-colors cursor-pointer"
                        title="Edit name & email"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="block text-xs text-stone-400 font-medium mt-0.5">{userEmail || user?.email || "No email set"}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bitmoji Presets */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-300">Bitmoji Presets</label>
              {avatarsLoading ? (
                <p className="text-[11px] text-stone-400 font-medium">Loading avatars...</p>
              ) : avatarPresets.length > 0 ? (
                <div className="flex items-center gap-2.5 flex-wrap">
                  {avatarPresets.map((preset) => (
                    <button
                      key={preset._id}
                      type="button"
                      onClick={() => {
                        setUserPhotoUrl(preset.url);
                        setEditingProfile(true);
                      }}
                      className={`rounded-full p-0.5 border-2 transition-all cursor-pointer ${userPhotoUrl === preset.url ? "border-white scale-110" : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                    >
                      <Image src={preset.url} alt={preset.name || "Avatar"} width={38} height={38} className="h-9 w-9 rounded-full object-cover" unoptimized />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-stone-400 font-medium">No preset avatars available. Tap the camera icon to upload a photo.</p>
              )}
            </div>
          </div>

          {userProfileSuccess && (
            <div className="flex items-center gap-2 rounded-xl bg-white/10 p-3.5 text-xs font-bold text-white border border-white/20">
              <CheckCircle2 className="h-4 w-4" /> Profile updated successfully!
            </div>
          )}
        </div>

        {/* 2. Studio Information & Business Logo Card */}
        <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl space-y-5 flex flex-col justify-between">
          <form onSubmit={handleSaveSettings} className="space-y-5">
            {/* Header with Save & Cancel buttons at top-right */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>
                Studio Information & Logo
              </h3>
              <div className="flex items-center gap-2">
                {editingStudio && (
                  <button
                    type="button"
                    onClick={handleCancelStudioEdit}
                    className="rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-bold text-stone-300 hover:bg-stone-800 hover:text-white transition-all cursor-pointer"
                    style={{ fontFamily: 'var(--font-varela-round)' }}
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={profileLoading || !editingStudio}
                  className="rounded-full bg-white px-4 py-1.5 text-xs font-extrabold text-black shadow-xs hover:bg-stone-200 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'var(--font-varela-round)' }}
                >
                  {profileLoading ? "Updating..." : "Save Studio Settings"}
                </button>
              </div>
            </div>

            {/* Studio Logo & Header Info */}
            <div className="flex items-center gap-4">
              <label className="relative cursor-pointer group shrink-0">
                {studioLogoUrl ? (
                  <Image
                    src={studioLogoUrl}
                    alt="Studio Logo"
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover border-2 border-white/20 group-hover:opacity-80 transition-opacity"
                    unoptimized
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-white text-black font-extrabold text-xl flex items-center justify-center uppercase group-hover:opacity-80 transition-opacity">
                    {businessName ? businessName.slice(0, 2) : "ST"}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 p-1.5 bg-white rounded-full border border-white/20 text-black group-hover:scale-110 transition-transform">
                  {uploadingLogo ? (
                    <div className="h-3.5 w-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <Camera className="h-3.5 w-3.5" />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  disabled={uploadingLogo}
                />
              </label>

              <div className="flex-1 min-w-0">
                {editingStudio ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Studio / Brand Name"
                      className="w-full rounded-xl border border-white/20 bg-stone-900 px-3 py-1.5 text-xs font-bold text-white placeholder-stone-500 focus:border-white/40 focus:outline-none"
                    />
                    <input
                      type="email"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      placeholder="Studio Contact Email"
                      className="w-full rounded-xl border border-white/20 bg-stone-900 px-3 py-1.5 text-xs font-medium text-stone-300 placeholder-stone-500 focus:border-white/40 focus:outline-none"
                    />
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-white tracking-tight">{businessName || "Studio Name"}</span>
                      <button
                        type="button"
                        onClick={() => setEditingStudio(true)}
                        className="p-1 text-stone-400 hover:text-white transition-colors cursor-pointer"
                        title="Edit studio details"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="block text-xs text-stone-400 font-medium mt-0.5">{businessEmail || "No studio email set"}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Studio Phone & Address Fields */}
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Studio Contact Phone
                </label>
                <input
                  type="text"
                  placeholder="Enter phone number..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!editingStudio}
                  className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'var(--font-varela-round)' }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Physical Studio Address
                </label>
                <input
                  type="text"
                  placeholder="Enter physical studio location..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={!editingStudio}
                  className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'var(--font-varela-round)' }}
                />
              </div>
            </div>

            {savedSuccess && (
              <div className="flex items-center gap-2 rounded-xl bg-white/10 p-3.5 text-xs font-bold text-white border border-white/20">
                <CheckCircle2 className="h-4 w-4" /> Studio settings updated successfully!
              </div>
            )}
          </form>
        </div>

        {/* 3. Security & Password Change */}
        <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <KeyRound className="h-4 w-4 text-white" />
            <h3 className="text-sm font-bold text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>
              Security & Password Change
            </h3>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Current Password *
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none"
                style={{ fontFamily: 'var(--font-varela-round)' }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  New Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none"
                  style={{ fontFamily: 'var(--font-varela-round)' }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Repeat new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none"
                  style={{ fontFamily: 'var(--font-varela-round)' }}
                />
              </div>
            </div>

            {passwordSuccess && (
              <div className="flex items-center gap-2 rounded-xl bg-white/10 p-3.5 text-xs font-bold text-white border border-white/20">
                <CheckCircle2 className="h-4 w-4" /> Security password changed successfully!
              </div>
            )}

            {passwordError && (
              <div className="flex items-center gap-2 rounded-xl bg-red-950/60 p-3.5 text-xs font-bold text-red-400 border border-red-500/30">
                <AlertTriangle className="h-4 w-4" /> {passwordError}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={passwordLoading}
                className="rounded-full bg-white px-6 py-2.5 text-xs font-extrabold text-black shadow-xs hover:bg-stone-200 transition-all cursor-pointer disabled:opacity-50"
                style={{ fontFamily: 'var(--font-varela-round)' }}
              >
                {passwordLoading ? "Updating Password..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>

        {/* 4. Danger Zone */}
        <div className="rounded-3xl border border-red-500/30 bg-stone-950 p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-red-500/20 pb-3 text-red-500">
              <ShieldAlert className="h-4 w-4" />
              <h3 className="text-sm font-bold uppercase tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>
                Danger Zone - Close Account
              </h3>
            </div>
            <p className="text-xs text-stone-400 font-medium leading-relaxed">
              Deleting your studio account will permanently remove all client measurement profiles, order receipts, and studio team access.
            </p>
          </div>
          <div>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/60 px-5 py-2.5 text-xs font-bold text-red-500 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
            >
              <Trash2 className="h-4 w-4" /> Delete Studio Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Studio Account"
        subtitle="This action is permanent and cannot be reversed."
      >
        <div className="space-y-4 pt-2 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
          <p className="text-xs text-stone-300 font-medium leading-relaxed">
            Please type <span className="font-extrabold text-red-500 font-mono">delete my account</span> below to confirm permanent deletion of all tailoring records.
          </p>

          <input
            type="text"
            placeholder="delete my account"
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
            className="w-full rounded-xl border border-red-500/30 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-red-500 focus:outline-none"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          />

          <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4 mt-6">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="rounded-full border border-white/10 px-5 py-2.5 text-xs font-bold text-stone-400 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={deleteConfirmText.trim().toLowerCase() !== "delete my account" || deleteLoading}
              onClick={handleDeleteAccount}
              className="rounded-full bg-red-600 px-6 py-2.5 text-xs font-extrabold text-white hover:bg-red-700 disabled:opacity-50 transition-all shadow-xs cursor-pointer"
            >
              {deleteLoading ? "Deleting..." : "Permanently Delete Account"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
