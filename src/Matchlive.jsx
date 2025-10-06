import React, { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";

export default function MatchLive() {
  const [selectedMatch] = useState({ id: 1, title: "Jendouba Sport " });
  const [showCart, setShowCart] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [sentOtp, setSentOtp] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState("");
  const [d17Number, setD17Number] = useState("");
  const [binanceAddress, setBinanceAddress] = useState("");
  const [payoneerEmail, setPayoneerEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isPaying, setIsPaying] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } },
  };

  const handleSendOtp = () => {
    toast.success("✅ Code OTP envoyé !");
    setSentOtp(true);
  };

  
  const validateInputs = () => {
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/; 

    if (!fullName || !nameRegex.test(fullName)) {
      toast.error("⚠️ Entrez un nom valide !");
      return false;
    }

    if (!phoneNumber || !isValidPhoneNumber("+" + phoneNumber)) {
      toast.error("⚠️ Numéro de téléphone invalide !");
      return false;
    }

    return true;
  };

  const handlePay = () => {
    if (!validateInputs()) return;
    if (!paymentMethod) return toast.error("⚠️ Choisissez un mode de paiement !");
    switch (paymentMethod) {
      case "otp":
        if (!otpCode) return toast.error("⚠️ Entrez le code reçu !");
        break;
      case "paypal":
        if (!paypalEmail) return toast.error("⚠️ Entrez votre email PayPal !");
        break;
      case "d17":
        if (!d17Number) return toast.error("⚠️ Entrez votre numéro D17 !");
        break;
      case "binance":
        if (!binanceAddress)
          return toast.error("⚠️ Entrez votre adresse Binance !");
        break;
      case "payoneer":
        if (!payoneerEmail)
          return toast.error("⚠️ Entrez votre email Payoneer !");
        break;
      default:
        return;
    }

    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      toast.success("✅ Paiement réussi !");
      setShowCart(false);
    }, 1200);
  };

  
  const handleFullNameChange = (e) => {
    const value = e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "");
    setFullName(value);
  };

  if (showCart)
    return (
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Toaster position="top-right" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white text-black rounded-3xl max-w-lg w-full p-8 shadow-2xl relative border-4 border-red-600"
        >
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="text-3xl font-extrabold mb-6 text-center animate-pulse text-red-600">
              Accès au Live
            </h2>

            
            {currentStep === 1 && (
              <>
                <label className="block mb-2 font-semibold text-green-700">
                  Nom complet
                </label>
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Votre nom"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-green-700 transition shadow-sm hover:shadow-md pl-10"
                    value={fullName}
                    onChange={handleFullNameChange}
                  />
                  <span className="absolute left-3 top-3 text-gray-400">👤</span>
                </div>

                <label className="block mb-2 font-semibold text-green-700">
                  Numéro de téléphone
                </label>
                <div className="mb-4">
                  <PhoneInput
                    country={"tn"}
                    enableSearch
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    inputClass="!w-full !py-3 !pl-12 !pr-3 !rounded-lg !border-gray-300"
                    buttonClass="!rounded-l-lg"
                    dropdownClass="!text-black"
                  />
                </div>

                <button
                  onClick={() => {
                    if (validateInputs()) setCurrentStep(2);
                  }}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 shadow-lg transition transform hover:scale-105"
                >
                  Suivant
                </button>
              </>
            )}

            
            {currentStep === 2 && (
              <>
                <label className="block mb-2 font-semibold text-green-700">
                  Méthode de paiement
                </label>
                <select
                  className="w-full p-3 rounded-lg mb-4 border border-gray-300 focus:ring-4 focus:ring-green-700 transition shadow-sm hover:shadow-md"
                  value={paymentMethod}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                    setOtpCode("");
                    setSentOtp(false);
                    setPaypalEmail("");
                    setD17Number("");
                    setBinanceAddress("");
                    setPayoneerEmail("");
                  }}
                >
                  <option value="">-- Sélectionnez --</option>
                  <option value="paypal">PayPal</option>
                  <option value="d17">D17</option>
                  <option value="binance">Binance</option>
                  <option value="payoneer">Payoneer</option>
                  <option value="otp">SMS OTP</option>
                </select>

                {paymentMethod === "otp" &&
                  (!sentOtp ? (
                    <button
                      onClick={handleSendOtp}
                      className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 shadow-lg mb-4 transition transform hover:scale-105"
                    >
                      Envoyer le code SMS
                    </button>
                  ) : (
                    <input
                      type="text"
                      placeholder="Entrez le code reçu"
                      className="w-full p-3 rounded-lg mb-4 border border-gray-300 focus:ring-4 focus:ring-blue-700 transition shadow-sm hover:shadow-md"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                    />
                  ))}

                {paymentMethod === "paypal" && (
                  <input
                    type="email"
                    placeholder="Email PayPal"
                    className="w-full p-3 rounded-lg mb-4 border border-gray-300 focus:ring-4 focus:ring-yellow-500 transition shadow-sm hover:shadow-md"
                    value={paypalEmail}
                    onChange={(e) => setPaypalEmail(e.target.value)}
                  />
                )}

                {paymentMethod === "d17" && (
                  <input
                    type="text"
                    placeholder="Numéro D17"
                    className="w-full p-3 rounded-lg mb-4 border border-gray-300 focus:ring-4 focus:ring-green-500 transition shadow-sm hover:shadow-md"
                    value={d17Number}
                    onChange={(e) => setD17Number(e.target.value.replace(/\D/g, ""))}
                  />
                )}

                {paymentMethod === "binance" && (
                  <input
                    type="text"
                    placeholder="Adresse Binance"
                    className="w-full p-3 rounded-lg mb-4 border border-gray-300 focus:ring-4 focus:ring-purple-500 transition shadow-sm hover:shadow-md"
                    value={binanceAddress}
                    onChange={(e) => setBinanceAddress(e.target.value)}
                  />
                )}

                {paymentMethod === "payoneer" && (
                  <input
                    type="email"
                    placeholder="Email Payoneer"
                    className="w-full p-3 rounded-lg mb-4 border border-gray-300 focus:ring-4 focus:ring-red-800 transition shadow-sm hover:shadow-md"
                    value={payoneerEmail}
                    onChange={(e) => setPayoneerEmail(e.target.value)}
                  />
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-500 transition"
                  >
                    Précédent
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                  >
                    Suivant
                  </button>
                </div>
              </>
            )}

            
            {currentStep === 3 && (
              <>
                <div className="mb-6 text-center">
                  <p>Nom: <strong>{fullName}</strong></p>
                  <p>Téléphone: <strong>+{phoneNumber}</strong></p>
                  <p>Méthode de paiement: <strong>{paymentMethod}</strong></p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePay}
                  disabled={isPaying}
                  className={`w-full py-3 rounded-lg font-bold text-lg text-white ${
                    isPaying
                      ? "bg-gray-400"
                      : "bg-red-700 hover:bg-red-800 shadow-xl transition"
                  }`}
                >
                  {isPaying ? "Paiement..." : "Payer & Accéder au Live"}
                </motion.button>
              </>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    );

  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white flex flex-col items-center p-4 animate-fadeIn">
      <header className="text-center mb-6">
        <h1 className="text-5xl font-extrabold mb-2 text-red-600 animate-pulse">
          {selectedMatch.title}
        </h1>
        <p className="text-lg text-gray-300 mb-4">
          28 Septembre 2025 | Stade Municipal
        </p>
      </header>

      <div className="w-full max-w-6xl aspect-video bg-black rounded-xl shadow-2xl overflow-hidden border-4 border-red-600 animate-fadeIn delay-200 relative">
        <video
          src="/ph/videoplayback.mp4"
          controls
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
       
        <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 shadow-lg transition">
          Chat Live
        </button>
       
      </div>

      <div className="mt-8">
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 shadow-lg transition"
        >
          Retour à l'Accueil
        </button>
      </div>

      <footer className="mt-8 text-gray-400">
        &copy; 2025 Jendouba Sport. Tous droits réservés.
      </footer>
    </div>
  );
}
