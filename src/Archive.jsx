import React from "react";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom"; // لازم باش نربط الزر بالAccueil

export default function Archive({ archive, restoreNews, isAdmin, setSelectedNews }) {
  const NewsCard = ({ item }) => (
    <Tilt glareEnable={true} glareMaxOpacity={0.1} tiltMaxAngleX={10} tiltMaxAngleY={10}>
      <div className="bg-white/10 backdrop-blur-md text-white rounded-2xl shadow-lg overflow-hidden transform transition duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl scale-90 opacity-80 hover:scale-95">
        {item.img ? (
          <img src={item.img} alt={item.title} loading="lazy" className="w-full h-32 object-cover md:h-32" />
        ) : (
          <div className="w-full h-32 bg-gray-700 animate-pulse" />
        )}
        <div className="p-3">
          <h3 className="font-bold mb-2 text-lg">{item.title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-red-600 px-2 py-1 rounded text-xs">{item.category}</span>
            <span className="text-gray-400 text-xs">{new Date(item.date).toLocaleDateString()}</span>
          </div>
          <p className="text-gray-200 leading-relaxed text-xs line-clamp-3">{item.text}</p>
          <div className="flex justify-between items-center mt-4">
            <button onClick={() => setSelectedNews(item)} className="text-red-400 font-semibold hover:underline text-sm">Lire plus</button>
            {isAdmin && (
              <button
                onClick={() => restoreNews(item.id)}
                className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 shadow-md"
              >
                Restaurer
              </button>
            )}
          </div>
        </div>
      </div>
    </Tilt>
  );

  return (
    <div className="min-h-screen px-4 md:px-6 py-10 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      
      {/* زر العودة للصفحة الرئيسية */}
      <div className="mb-6 text-center">
        <Link
          to="/"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg transition transform hover:-translate-y-1"
        >
          Retour à l'accueil
        </Link>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 animate-bounce">🗂️ Archive</h2>
      
      {archive.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {archive.map((item) => <NewsCard key={item.id} item={item} />)}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-lg mt-10">Aucun article dans l'archive.</p>
      )}
    </div>
  );
}
