'use client';

import { useRef, useState } from 'react';
import { AlertCircle, Check, Globe, Clock, ChevronDown, Camera, X, Mail } from 'lucide-react';
const languages = ['English', 'Hindi', 'Spanish', 'French'];
const countries = ['India', 'United States', 'United Kingdom', 'Germany'];
const timezones = [
  '(UTC+00:00)',
  '(UTC+05:30)',
  '(UTC-04:00)',
];

export default function AccountSettingsTab() {
  const [resent, setResent] = useState(false);
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
  const [openCountry, setOpenCountry] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('English');
  const [openTimeZone, setOpenTimeZone] = useState(false);
  const [timeZoneValue, setTimeZoneValue] = useState('(UTC+00:00)');
const [openDeleteReq, setOpenDeleteReq] = useState(false);
const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const [security, setSecurity] = useState({
    platformAuth: true,
    withdrawAuth: true,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImage(url);
  };
  const handleResend = () => {
    // call resend API here if needed
    setResent(true);

    // optional: auto-hide after 5 sec
    setTimeout(() => setResent(false), 5000);
  };
  return (
    <div className="pb-4 mt-8 mb-8 border-b-2 border-dashed border-[#2a3040]">
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 xxl:grid-cols-4 gap-6">
        {/* PERSONAL DATA */}
        <div className="space-y-4 border-r-2 border-dashed border-[#2a3040] pr-2">
          <h3 className="text-sm font-medium text-white">Personal data:</h3>

          <div className="bg-[#1b2230] rounded-lg space-y-4">

            {/* PROFILE */}
            <div className="flex items-center gap-3">
              <div className="relative">
                {/* PROFILE CIRCLE */}
                <div className="w-20 h-20 rounded-full bg-[#2a3040] overflow-hidden flex items-center justify-center">
                  {image ? (
                    <img
                      src={image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl">👤</span>
                  )}
                </div>

                {/* UPLOAD ICON */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="
          absolute -top-1 -right-1
          w-7 h-7 rounded-full
          bg-primary
          flex items-center justify-center
          border-2 border-[#101729]
          hover:bg-primary/90
          transition
        "
                >
                  <Camera size={14} className="text-white" />
                </button>

                {/* HIDDEN FILE INPUT */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
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
              <div key={key} className="relative w-full">
                <label className="absolute -top-2 left-3 px-1 text-[12px] text-gray-500 bg-[#1b2230] z-10 font-bold">
                  {label}
                </label>

                <input
                  type={key === 'dateOfBirth' ? 'date' : 'text'}
                  value={(personalData as any)[key] || ''}
                  onChange={(e) =>
                    setPersonalData({ ...personalData, [key]: e.target.value })
                  }
                  placeholder={key === 'dateOfBirth' ? '' : 'Empty'}
                  className="w-full p-3 bg-transparent border border-[#ffffff1a] rounded text-sm text-white focus:outline-none"
                />
              </div>
            ))}


            {/* EMAIL */}
            <div className="relative w-full">
              {resent && (
                <div className="mb-3 rounded-md bg-green-500/15 px-3 py-2 text-green-400 text-xs border border-green-500/30">
                  We have resent you an email with an activation link
                </div>
              )}

              {/* BORDER WRAPPER */}
              <div className="relative rounded border border-[#2a3040] px-3 py-3">

                {/* FLOATING LABEL */}
                <label
                  className="
        absolute -top-2 left-3
        px-1 text-[12px] font-bold text-gray-500
        w-[calc(100%-1.5rem)]
        flex items-center
      "
                >
                  <span>Email</span>

                  {/* RIGHT SIDE */}
                  <span className="ml-auto flex items-center gap-2">
                    <span className="text-yellow-400 text-[10px]">Unverified</span>
                    <span
                      onClick={handleResend}
                      className="bg-green-500 text-black text-[10px] px-2 rounded cursor-pointer hover:bg-green-600"
                    >
                      RESEND
                    </span>
                  </span>
                </label>

                {/* INPUT */}
                <input
                  value={personalData.email}
                  onChange={(e) =>
                    setPersonalData({ ...personalData, email: e.target.value })
                  }
                  className="
        w-full bg-transparent
        text-sm text-white
        outline-none
        pt-1
      "
                />
              </div>
            </div>

            {/* COUNTRY */}
            <div className="relative">
                             <label className="absolute -top-2 left-3 px-1 text-[12px] text-gray-500 bg-[#1b2230] z-10 font-bold">
                Country</label>

              <div
                onClick={() => setOpenCountry(!openCountry)}
                className="relative cursor-pointer"
              >
                <input
                  value={personalData.country}
                  readOnly
                  className="w-full mt-1 px-3 py-2 bg-[#1b2230] border border-[#2a3040] rounded text-sm text-white pr-8 cursor-pointer"
                />
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>

              {openCountry && (
                <div className="absolute z-50 mt-1 w-full bg-[#101729] border border-[#2a3040] rounded max-h-48 overflow-auto">
                  {countries.map(country => (
                    <div
                      key={country}
                      onClick={() => {
                        setPersonalData({ ...personalData, country });
                        setOpenCountry(false);
                      }}
                      className="px-3 py-2 text-sm text-white hover:bg-[#2b3040] cursor-pointer"
                    >
                      {country}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium">
              Save
            </button>
          </div>
        </div>

        {/* DOCUMENT VERIFICATION */}
        <div className="space-y-4 border-r-2 border-dashed border-[#2a3040]">
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
        <div className="space-y-4 border-r-2 border-dashed border-[#2a3040]">
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
          </div>
        </div>

        {/* PREFERENCES */}
        <div className="space-y-4 
">
          <div className="relative">
                      <label className="absolute -top-2 left-3 px-1 text-[12px] text-gray-500 bg-[#1b2230] z-10 font-bold">
              Language</label>

            <div
              onClick={() => setOpen(!open)}
              className="w-full flex p-3 bg-transparent border border-[#ffffff1a] rounded text-sm text-white focus:outline-none cursor-pointer"
            >
              <Globe size={16} />
              <span className="text-sm pl-4">{value}</span>
              <ChevronDown className="ml-auto" size={16} />
            </div>

            {open && (
              <div className="absolute z-50 mt-1 w-full bg-[#101729] border border-[#2a3040] rounded">
                {languages.map(lang => (
                  <div
                    key={lang}
                    onClick={() => {
                      setValue(lang);
                      setOpen(false);
                    }}
                    className="px-3 py-2 text-sm text-white hover:bg-[#2b3040] cursor-pointer"
                  >
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <label className="absolute -top-2 left-3 px-1 text-[12px] text-gray-500 bg-[#1b2230] z-10 font-bold">
              Timezone</label>

            <div
              onClick={() => setOpenTimeZone(!openTimeZone)}
              className="w-full flex p-3 bg-transparent border border-[#ffffff1a] rounded text-sm text-white focus:outline-none cursor-pointer"
            >
              <Clock size={16} />
              <span className="text-sm pl-4">{timeZoneValue}</span>
              <ChevronDown className="ml-auto" size={16} />
            </div>

            {openTimeZone && (
              <div className="absolute z-50 mt-1 w-full bg-[#101729] border border-[#2a3040] rounded">
                {timezones.map(tz => (
                  <div
                    key={tz}
                    onClick={() => {
                      setTimeZoneValue(tz);
                      setOpenTimeZone(false);
                    }}
                    className="px-3 py-2 text-sm text-white hover:bg-[#2b3040] cursor-pointer"
                  >
                    {tz}
                  </div>
                ))}
              </div>
            )}
          </div>
           <button onClick={() => setOpenDeleteReq(true)} className="text-red-400 text-sm flex">
              <X size={20}/> <span className='pl-4'>Delete Account</span>
            </button>
            {/* MODAL */}
      {openDeleteReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          
          <div className="bg-[#1b2230] w-full max-w-md rounded-lg p-6 relative">
            
            {/* CLOSE ICON */}
            <button
              onClick={() => setOpenDeleteReq(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>

            {/* TITLE */}
            <h2 className="text-white text-lg font-semibold mb-4">
              Deletion of Account and Personal Data
            </h2>

            {/* CONTENT */}
            <p className="text-sm text-gray-400 mb-3">
              By deleting your account and personal data, you will lose access
              to your account on the Quotex platform permanently.
            </p>

            <p className="text-sm text-gray-400 mb-3">
              Remember that your data will be deleted irretrievably and it is
              impossible to restore your account later!
            </p>

            <p className="text-sm text-yellow-400 mb-6">
              NOTE: Please complete all open trades and pending orders before
              you delete your account.
            </p>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenDeleteReq(false)}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white"
              >
                Cancel
              </button>

              <button
               onClick={() => {
                  setOpenDeleteReq(false);
                  setOpenConfirmDelete(true);
                }}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Request Deletion
              </button>
            </div>
          </div>
        </div>
      )}
      {openConfirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#1b2230] w-full max-w-md rounded-lg pt-10 pb-6 px-6 relative">

            {/* EMAIL ICON */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
                <Mail size={28} className="text-white" />
              </div>
            </div>

            {/* CLOSE */}
            <button
              onClick={() => setOpenConfirmDelete(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>

            {/* CONTENT */}
            <h2 className="text-white text-lg font-semibold text-center mt-6 mb-3">
              Confirm account deletion
            </h2>

            <p className="text-sm text-gray-400 text-center">
              To delete your account, follow the link in the email sent to
            </p>

            <p className="text-sm text-white font-medium text-center mt-1">
              jkhatun258@gmail.com
            </p>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setOpenConfirmDelete(false)}
                className="px-5 py-2 text-sm bg-secondary text-white rounded hover:bg-secondary/80"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
        </div>

      </div>
    </div>
  );
}
