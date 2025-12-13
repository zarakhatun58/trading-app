'use client';

import { useState } from 'react';
import { AlertCircle, Check, Globe, Clock, ChevronDown } from 'lucide-react';

export default function AccountSettingsTab() {
  const [personalData, setPersonalData] = useState({
    nickname: '#71230591',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    aadhaar: '',
    email: 'jkhatun258@gmail.com',
    country: 'India',
    address: '',
  });

  const [security, setSecurity] = useState({
    platformAuth: true,
    withdrawAuth: true,
  });

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* PERSONAL DATA */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-white">Personal data:</h3>

          <div className="bg-[#1c2230] rounded-lg p-4 space-y-4">

            {/* PROFILE */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#2a3040] flex items-center justify-center text-xl">
                👤
              </div>
              <div>
                <p className="text-sm font-medium text-white">{personalData.email}</p>
                <p className="text-xs text-gray-400">ID: 71230591</p>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded mt-1">
                  <AlertCircle size={10} />
                  Not verified
                </span>
              </div>
            </div>

            {/* INPUTS */}
            {[
              ['Nickname', 'nickname'],
              ['First Name', 'firstName'],
              ['Last Name', 'lastName'],
              ['Date of birth', 'dateOfBirth'],
              ['Aadhaar', 'aadhaar'],
              ['Address', 'address'],
            ].map(([label, key]) => (
              <div key={key}>
                <label className="text-xs text-gray-400">{label}</label>
                <input
                  value={(personalData as any)[key]}
                  onChange={(e) =>
                    setPersonalData({ ...personalData, [key]: e.target.value })
                  }
                  placeholder="Empty"
                  className="w-full mt-1 px-3 py-2 bg-[#101729] border border-[#2a3040] rounded text-sm text-white outline-none"
                />
              </div>
            ))}

            {/* EMAIL */}
            <div>
              <label className="text-xs text-gray-400 flex items-center gap-2">
                Email
                <span className="text-yellow-400 text-[10px]">Unverified</span>
                <span className="bg-green-500 text-black text-[10px] px-2 rounded cursor-pointer">
                  RESEND
                </span>
              </label>
              <input
                value={personalData.email}
                onChange={(e) =>
                  setPersonalData({ ...personalData, email: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 bg-[#101729] border border-[#2a3040] rounded text-sm text-white"
              />
            </div>

            {/* COUNTRY */}
            <div>
              <label className="text-xs text-gray-400">Country</label>
              <div className="relative">
                <input
                  value={personalData.country}
                  readOnly
                  className="w-full mt-1 px-3 py-2 bg-[#101729] border border-[#2a3040] rounded text-sm text-white pr-8"
                />
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium">
              Save
            </button>
          </div>
        </div>

        {/* DOCUMENT VERIFICATION */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-white">Documents verification:</h3>
          <div className="bg-[#1c2230] rounded-lg p-4">
            <div className="flex gap-3 bg-red-500/10 border border-red-500/30 rounded p-3">
              <AlertCircle className="text-red-400" />
              <p className="text-sm text-gray-300">
                You need fill identity information before verification your profile.
              </p>
            </div>
          </div>
        </div>

        {/* SECURITY */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-white">Security:</h3>

          <div className="bg-[#1c2230] rounded-lg p-4 space-y-4">
            <div className="flex gap-3">
              <Check className="text-green-400" />
              <div>
                <p className="text-sm font-medium">Two-step verification</p>
                <p className="text-xs text-gray-400">Receiving codes via Email</p>
              </div>
            </div>

            {[
              ['To enter the platform', 'platformAuth'],
              ['To withdraw funds', 'withdrawAuth'],
            ].map(([label, key]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-sm">{label}</span>
                <input
                  type="checkbox"
                  checked={(security as any)[key]}
                  onChange={(e) =>
                    setSecurity({ ...security, [key]: e.target.checked })
                  }
                  className="w-4 h-4 accent-blue-600"
                />
              </div>
            ))}

            {/* PASSWORD */}
            <div className="pt-4 border-t border-[#2a3040] space-y-3">
              {['Old password', 'New password', 'Confirm new password'].map((label) => (
                <div key={label}>
                  <label className="text-xs text-gray-400">{label}</label>
                  <input
                    type="password"
                    className="w-full mt-1 px-3 py-2 bg-[#101729] border border-[#2a3040] rounded text-sm"
                  />
                </div>
              ))}

              <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm">
                Change Password
              </button>
            </div>

            <button className="text-red-400 text-sm hover:underline">
              × Delete Account
            </button>
          </div>
        </div>

        {/* PREFERENCES */}
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-400">Language</label>
            <div className="bg-[#1c2230] px-3 py-2.5 rounded flex items-center gap-2 mt-1">
              <Globe size={16} />
              <span className="text-sm">English</span>
              <ChevronDown className="ml-auto" size={16} />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400">Timezone</label>
            <div className="bg-[#1c2230] px-3 py-2.5 rounded flex items-center gap-2 mt-1">
              <Clock size={16} />
              <span className="text-sm">(UTC+00:00)</span>
              <ChevronDown className="ml-auto" size={16} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
