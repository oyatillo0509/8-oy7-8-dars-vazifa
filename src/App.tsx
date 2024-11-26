import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const oylar = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentabr",
  "Oktabr",
  "Noyabr",
  "Dekabr",
];

const haftaKunlari = ["Yak", "Dush", "Sesh", "Chor", "Pay", "Jum", "Shan"];

interface Tadbir {
  sana: Date | null;
  sarlavha: string;
}

const App: React.FC = () => {
  const [joriySana, setJoriySana] = useState(new Date());
  const [tadbirlar, setTadbirlar] = useState<Tadbir[]>([]);
  const [modalOchiq, setModalOchiq] = useState(false);
  const [tanlanganSana, setTanlanganSana] = useState<Date | null>(null);
  const [sarlavha, setSarlavha] = useState("");

  const joriyOy = joriySana.getMonth();
  const joriyYil = joriySana.getFullYear();

  const oydagiKunlar = new Date(joriyYil, joriyOy + 1, 0).getDate();
  const birinchiKun = new Date(joriyYil, joriyOy, 1).getDay();

  const kunniTanlash = (kun: number) => {
    setTanlanganSana(new Date(joriyYil, joriyOy, kun));
    setModalOchiq(true);
  };

  const tadbirQoshish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sarlavha.trim() || !tanlanganSana) return;

    setTadbirlar([...tadbirlar, { sana: tanlanganSana, sarlavha }]);
    setModalOchiq(false);
    setSarlavha("");
  };

  const kunningTadbiri = (kun: number) =>
    tadbirlar.filter(
      (t) =>
        t.sana?.getDate() === kun &&
        t.sana.getMonth() === joriyOy &&
        t.sana.getFullYear() === joriyYil
    );

  const isBugun = (kun: number) => {
    const today = new Date();
    return (
      today.getDate() === kun &&
      today.getMonth() === joriyOy &&
      today.getFullYear() === joriyYil
    );
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-4">
        {}
        <div className="flex justify-between items-center mb-4">
          <h1>
            {oylar[joriyOy]} {joriyYil}
          </h1>
          <div>
            <button
              onClick={() => setJoriySana(new Date(joriyYil, joriyOy - 1))}
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => setJoriySana(new Date(joriyYil, joriyOy + 1))}
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Kalendar */}
        <div className="grid grid-cols-7 gap-1">
          {haftaKunlari.map((kun) => (
            <div key={kun} className="text-center font-medium">
              {kun}
            </div>
          ))}
          {Array.from({ length: birinchiKun }).map((_, i) => (
            <div key={i} />
          ))}
          {Array.from({ length: oydagiKunlar }).map((_, i) => {
            const kun = i + 1;
            const kunTadbirlari = kunningTadbiri(kun);
            return (
              <div
                key={kun}
                className={`p-2 border ${
                  isBugun(kun) ? "bg-blue-100 font-bold" : ""
                }`}
                onClick={() => kunniTanlash(kun)}
              >
                {kun}
                {kunTadbirlari.map((t, index) => (
                  <div key={index} className="text-xs bg-blue-200 mt-1 rounded">
                    {t.sarlavha}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Tadbir qo'shish tugmasi */}
        <button
          onClick={() => setModalOchiq(true)}
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          <Plus /> Tadbir qo'shish
        </button>
      </div>

      {/* Modal */}
      {modalOchiq && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-2">Yangi Tadbir</h2>
            <form onSubmit={tadbirQoshish}>
              <div className="mb-3">
                <label>Sana:</label>
                <input
                  type="text"
                  value={tanlanganSana?.toLocaleDateString() || ""}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
              <div className="mb-3">
                <label>Sarlavha:</label>
                <input
                  type="text"
                  value={sarlavha}
                  onChange={(e) => setSarlavha(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setModalOchiq(false)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
