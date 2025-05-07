"use client";
import React, { useState } from "react";

const placeholderLogos = Array.from({ length: 8 });

export default function AddButtonWithDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalType, setModalType] = useState<null | "wallet" | "exchange">(null);

  const openModal = (type: "wallet" | "exchange") => {
    setModalType(type);
    setDropdownOpen(false);
  };
  const closeModal = () => setModalType(null);

  return (
    <div className="relative">
      {/* Add + Button */}
      <button
        className="px-4 py-2 bg-white text-black rounded-lg shadow font-semibold flex items-center gap-2 border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        onClick={() => setDropdownOpen((v) => !v)}
      >
        Add <span className="text-lg">+</span>
      </button>
      {/* Dropdown */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
            onClick={() => openModal("exchange")}
          >
            Add Exchange
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
            onClick={() => openModal("wallet")}
          >
            Add Wallet
          </button>
        </div>
      )}
      {/* Modal */}
      {modalType && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {modalType === "wallet" ? "Add Wallet" : "Add Exchange"}
              </h2>
              <button
                className="text-gray-400 hover:text-gray-700 text-2xl font-bold"
                onClick={closeModal}
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {(modalType === 'wallet'
                ? [
                    { name: 'Phantom', src: '/logos/phantom.png' },
                    { name: 'MetaMask', src: '/logos/metamask.png' },
                    { name: 'Trust', src: '/logos/trust.png' },
                    { name: 'Moonshot', src: '/logos/moonshot.png' },
                  ]
                : [
                    { name: 'Coinbase', src: '/logos/coinbase.png' },
                    { name: 'Gemini', src: '/logos/gemini.png' },
                    { name: 'Kraken', src: '/logos/kraken.png' },
                    { name: 'Binance', src: '/logos/binance.png' },
                  ]
              ).map((logo) => (
                <div key={logo.name} className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-white rounded flex items-center justify-center border border-gray-200 shadow-sm">
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="object-contain max-w-full max-h-full"
                    />
                  </div>
                  <span className="text-xs text-gray-600 text-center font-medium truncate w-24 mt-1">{logo.name}</span>
                </div>
              ))}
            </div>
            <button
              className="w-full mt-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow"
              type="button"
            >
{modalType === 'wallet' ? 'Add Other Wallet' : 'Add Other Exchange'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
