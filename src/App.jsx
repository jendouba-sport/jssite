import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Ui from "./Ui";
import Archive from "./Archive";
import Matchlive from "./Matchlive";
import Joueurs from "./Joueurs";
import Matchs from "./Matchs";
import JsStore from "./Js store";

const App = () => {
  const [archive, setArchive] = useState([]);
  const [news, setNews] = useState([
    {
      id: 1,
      title: "title",
      text: "test test",
      img: "public/ph/102354894.jpeg",
      category: "js mobile",
      date: "2025-09-26",
      fullText: "test...................................................................................................",
    },
    {
      id: 2,
      title: "title",
      text: "test test...",
      img: "public/ph/OIP.webp",
      category: "js mobile",
      date: "2025-09-20",
      fullText: "test ...........................................................................................................",
    },
    {
      id: 3,
      title: "title",
      text: "test test...",
      img: "public/ph/OIP.jpg",
      category: "js mobile",
      date: "2025-09-20",
      fullText: "test ..........................................................................................................,",
    },
    
  ]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isAdmin] = useState(true);

  const restoreNews = (id) => {
    const restored = archive.find((n) => n.id === id);
    if (restored) {
      setNews([restored, ...news]);
      setArchive(archive.filter((n) => n.id !== id));
    }
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Ui
              news={news}
              setNews={setNews}
              archive={archive}
              setArchive={setArchive}
              selectedNews={selectedNews}
              setSelectedNews={setSelectedNews}
              isAdmin={isAdmin}
              restoreNews={restoreNews}
            />
          } 
        />
        <Route 
          path="/archive" 
          element={
            <Archive
              archive={archive}
              restoreNews={restoreNews}
              isAdmin={isAdmin}
              setSelectedNews={setSelectedNews}
            />
          } 
        />
        <Route path="/matchlive" element={<Matchlive />} />
        <Route path="/joueurs" element={<Joueurs />} />
        <Route path="/matchs" element={<Matchs />} />
        <Route path="/js-store" element={<JsStore />} />
      </Routes>
    </Router>
  );
};

export default App;
