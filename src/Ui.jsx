import React, { useMemo, useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaBars, FaTimes, FaEnvelope, FaPhone } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const categories = ["Université", "Séminaire", "Match", "Annonce"];

export default function Ui({ news, setNews, archive, setArchive, selectedNews, setSelectedNews, isAdmin, restoreNews }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setProgress((scrollTop / docHeight) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredNews = useMemo(
    () =>
      news
        .filter((n) => n.title.toLowerCase().includes(search.toLowerCase()))
        .filter((n) => (filterCategory === "All" ? true : n.category === filterCategory)),
    [search, filterCategory, news]
  );

  const deleteNews = (id) => {
    const deleted = news.find((n) => n.id === id);
    if (deleted) {
      setArchive([deleted, ...archive]);
      setNews(news.filter((n) => n.id !== id));
      toast.success("Article supprimé ! Cliquez pour annuler.", {
        duration: 5000,
        action: {
          text: "Annuler",
          onClick: () => restoreNews(id),
        },
      });
    }
  };

  const NewsCard = ({ item, onDelete, onReadMore, deletable = true }) => (
    <Tilt glareEnable={true} glareMaxOpacity={0.1} tiltMaxAngleX={10} tiltMaxAngleY={10}>
      <div className="bg-white/10 backdrop-blur-md text-white rounded-2xl shadow-lg overflow-hidden transform transition duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl scale-100">
        {item.img ? (
          <img src={item.img} alt={item.title} loading="lazy" className="w-full object-cover h-52 md:h-48" />
        ) : (
          <div className="w-full h-52 md:h-48 bg-gray-700 animate-pulse" />
        )}
        <div className="p-6">
          <h3 className="font-bold mb-2 text-xl">{item.title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-red-600 px-2 py-1 rounded text-xs">{item.category}</span>
            <span className="text-gray-400 text-xs">{new Date(item.date).toLocaleDateString()}</span>
          </div>
          <p className="text-gray-200 leading-relaxed text-sm line-clamp-3">{item.text}</p>
          <div className="flex justify-between items-center mt-4">
            <button onClick={() => onReadMore(item)} className="text-red-400 font-semibold hover:underline text-sm">Lire plus</button>
          {deletable && isAdmin && (
  <button
    onClick={() => onDelete(item.id)}
    className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 shadow-md"
  >
    Supprimer
  </button>
)}

          </div>
        </div>
      </div>
    </Tilt>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-gray-900 to-black text-white transition-colors duration-500">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="fixed top-0 left-0 h-1 bg-red-600 z-50" style={{ width: `${progress}%` }} />

      {/* Navbar */}
      <nav className="bg-red-600 text-black px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center shadow-lg gap-4 md:gap-0 relative sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-black shadow-lg shadow-black/50 transition-transform duration-500 hover:scale-110 hover:rotate-12">
            <img src="/ph/763a5e0e-2281-42ff-ae56-b292dfd40a63.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-bold text-lg">JS Mobile</h1>
        </div>
        <div className="md:hidden absolute top-4 right-4 text-2xl cursor-pointer" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={`flex flex-col md:flex-row justify-center gap-4 md:gap-6 font-semibold bg-black/20 md:bg-transparent px-4 py-2 md:p-0 rounded-lg shadow-md md:shadow-none transition-all duration-300 ${mobileMenu ? "flex" : "hidden md:flex"}`}>
          <li><Link to="/Matchlive" className="hover:text-gray-300 transition">Matchlive</Link></li>
          <li><Link to="/archive" className="hover:text-gray-300 transition">Archive</Link></li>
          <li><Link to="/joueurs" className="hover:text-gray-300 transition">Joueurs</Link></li>
          <li><Link to="/matchs" className="hover:text-gray-300 transition">Matchs</Link></li>
          <li><Link to="/" className="hover:text-gray-300 transition">Accueil</Link></li>
        </ul>
      </nav>

      {/* Recherche & Filtrage */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6 px-4">
        <input type="text" placeholder="Rechercher les actualités..." className="w-full md:w-1/3 p-2 rounded-lg text-black focus:outline-none" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="w-full md:w-1/6 p-2 rounded-lg text-black focus:outline-none" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="All">Toutes catégories</option>
          {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
        </select>
      </div>

      {/* Contenu principal */}
      <main className="flex-grow px-4 md:px-6 py-10 space-y-20">
        <section>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 animate-pulse">Dernières Actualités 📰</h2>
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredNews.map((item) => (
                <NewsCard key={item.id} item={item} onDelete={deleteNews} onReadMore={setSelectedNews} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 text-lg mt-10">Aucun article pour le moment.</p>
          )}
        </section>
      </main>

      {/* Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={(e) => e.target === e.currentTarget && setSelectedNews(null)}>
          <div className="bg-white text-black rounded-2xl max-w-3xl w-full overflow-auto shadow-2xl animate-fade-in p-6">
            {selectedNews.img && <img src={selectedNews.img} alt={selectedNews.title} className="w-full h-48 md:h-64 object-cover mb-4" />}
            <h3 className="text-xl md:text-2xl font-bold mb-4">{selectedNews.title}</h3>
            <p className="text-gray-800 mb-6">{selectedNews.fullText || selectedNews.text}</p>
            <button onClick={() => setSelectedNews(null)} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 shadow-md">Fermer</button>
          </div>
        </div>
      )}

    {/* Footer */}
<footer className="bg-red-600 text-black p-8 text-center font-medium shadow-inner">
  <div className="flex flex-col items-center gap-8">

    {/* Download Buttons */}
    <div className="flex flex-col md:flex-row gap-6 items-center">

      {/* Google Play */}
      <a
        href="https://play.google.com/store/apps/details?id=com.jsmobile"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black rounded-xl flex items-center justify-center w-56 h-20 hover:scale-105 transition gap-3"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="30 336.7 120.9 129.2" className="h-10 w-auto">
          <path fill="#FFD400" d="M43.3 336.7c-7.2 4.5-13 10.9-13 20.9v87.4c0 10.1 5.8 16.5 13 20.9l65.5-64.6-65.5-64.6z"/>
          <path fill="#FF3333" d="M120.2 414.7l-20.8-20.7-65.6 64.6c4.7 2.9 9.9 3.6 16.3 0l70.1-43.9z"/>
          <path fill="#48FF48" d="M120.2 414.7L50.1 370.8c-6.4-3.6-11.6-2.9-16.3 0l65.6 64.6 20.8-20.7z"/>
          <path fill="#3BCCFF" d="M120.2 414.7l-20.8 20.7-20.8-20.7 20.8-20.7 20.8 20.7z"/>
        </svg>
        <div className="flex flex-col items-start leading-tight">
          <span className="text-xs text-white">Télécharger sur</span>
          <span className="text-lg font-bold text-white">Google Play</span>
        </div>
      </a>

      {/* App Store */}
      <a
        href="https://apps.apple.com/app/id000000000"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black rounded-xl flex items-center justify-center w-56 h-20 hover:scale-105 transition gap-3"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="h-10 w-auto fill-white">
          <path d="M318.7 268.7c-.3-37.2 16.4-65.2 50-85.8-18.8-27.4-47.4-42.4-84.6-45.8-35.7-3.3-74.4 20.9-88.4 20.9-14.7 0-49.1-19.9-76.1-19.4-58.4.9-119.6 46.2-119.6 138.1 0 27.2 5.1 55.4 15.4 84.7 13.7 38.2 63.2 131.6 114.8 130.2 27.1-.7 46.1-19.2 81.1-19.2 34.4 0 52.6 19.2 82.2 19.2 51.6-.7 98.3-85.2 111.7-123.7-70.6-33.6-86.5-99.1-86.5-99.2zM259.9 83.9c26.8-32.5 24.4-62.1 23.7-72.9-23 1.3-50.1 15.7-65.9 34.5-17.2 20.4-27.6 45.7-25.4 72.5 25.3 1.9 50.8-11.4 67.6-34.1z"/>
        </svg>
        <div className="flex flex-col items-start leading-tight">
          <span className="text-xs text-white">Télécharger sur</span>
          <span className="text-lg font-bold text-white">App Store</span>
        </div>
      </a>

    </div>

    {/* Socials */}
    <div className="flex gap-6 text-2xl">
      <a href="" target="_blank" rel="noopener noreferrer" className="hover:text-blue-900 transition">
        <FaFacebook />
      </a>
      <a
        href="https://www.instagram.com/jendoubasportjs"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-pink-800 transition"
      >
        <FaInstagram />
      </a>
      <a href="mailto:Jendoubasportfootball@gmail.com" className="hover:text-yellow-600 transition">
        <FaEnvelope />
      </a>
      <a href="tel:+21698912551" className="hover:text-green-600 transition">
        <FaPhone />
      </a>
    </div>

    {/* Copyright */}
    <p className="mt-6">© 2025 JS Mobile - Tous droits réservés</p>
  </div>
</footer>

    </div>
  );
}
