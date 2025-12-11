import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function PoisPage() {
  const [pois, setPois] = useState([]);
  const [cities, setCities] = useState([]);
  const [zones, setZones] = useState([]);

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    lat: "",
    lng: "",
    radius: "",
    coins: "",
    tags: "",
    content_title: "",
    content_text: "",
    content_image: "",
    zoneId: "",
  });

  const [editingId, setEditingId] = useState(null);

  const API = "https://api.hakkencity.com/api/pois";
  const CITIES_API = "https://api.hakkencity.com/api/cities";
  const ZONES_API = "https://api.hakkencity.com/api/zones";
  const token = localStorage.getItem("adminToken");

  // ------------------------------
  // LOAD POIS
  // ------------------------------
  const loadPois = async () => {
    setLoading(true);
    try {
      const res = await fetch(API, {
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setPois(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao carregar POIs:", err);
      alert("Falha ao carregar POIs.");
    }
    setLoading(false);
  };

  // ------------------------------
  // LOAD CITIES
  // ------------------------------
  const loadCities = async () => {
    try {
      const res = await fetch(CITIES_API, {
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setCities(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao carregar cidades:", err);
      alert("Falha ao carregar a lista de cidades.");
    }
  };

  // ------------------------------
  // LOAD ZONES
  // ------------------------------
  const loadZones = async () => {
    try {
      const res = await fetch(ZONES_API, {
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setZones(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao carregar zonas:", err);
      alert("Falha ao carregar a lista de zonas.");
    }
  };

  // ------------------------------
  // SAVE POI (CREATE OR UPDATE)
  // ------------------------------
  const savePoi = async (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API}/${editingId}` : API;

    try {
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        console.log(await res.text());
        return alert("Erro ao guardar POI.");
      }

      setForm({
        name: "",
        lat: "",
        lng: "",
        radius: "",
        coins: "",
        tags: "",
        content_title: "",
        content_text: "",
        content_image: "",
        zoneId: "",
      });

      setEditingId(null);
      loadPois();
    } catch (err) {
      console.error("Erro ao guardar POI:", err);
    }
  };

  // ------------------------------
  // DELETE POI
  // ------------------------------
  const deletePoi = async (id) => {
    if (!confirm("Tem a certeza que deseja apagar este POI?")) return;

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) loadPois();
    } catch (err) {
      console.error("Erro ao apagar POI:", err);
    }
  };

  useEffect(() => {
    loadCities();
    loadZones();
    loadPois();
  }, []);

  if (loading)
    return <p className="p-6 text-gray-600">A carregar POIs...</p>;

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            to="/admin"
            className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition"
          >
            <FiArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-semibold">Gestão de POIs</h1>
        </div>

        {/* FORM */}
        <form
          onSubmit={savePoi}
          className="bg-white p-6 shadow rounded mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Nome do POI"
            className="border p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <select
            className="border p-2 rounded"
            value={form.zoneId}
            onChange={(e) => setForm({ ...form, zoneId: e.target.value })}
            required
          >
            <option value="">Selecionar zona…</option>
            {zones.map((zone) => {
              const city = cities.find((c) => c.id === zone.cityId);
              return (
                <option key={zone.id} value={zone.id}>
                  {zone.name} — {city?.name}
                </option>
              );
            })}
          </select>

          <input
            type="number"
            placeholder="Latitude"
            className="border p-2 rounded"
            value={form.lat}
            onChange={(e) => setForm({ ...form, lat: e.target.value })}
          />

          <input
            type="number"
            placeholder="Longitude"
            className="border p-2 rounded"
            value={form.lng}
            onChange={(e) => setForm({ ...form, lng: e.target.value })}
          />

          <input
            type="number"
            placeholder="Raio (metros)"
            className="border p-2 rounded"
            value={form.radius}
            onChange={(e) => setForm({ ...form, radius: e.target.value })}
          />

          <input
            type="number"
            placeholder="Moedas"
            className="border p-2 rounded"
            value={form.coins}
            onChange={(e) => setForm({ ...form, coins: e.target.value })}
          />

          <input
            type="text"
            placeholder="Tags (ex: esporte,lazer,universidade)"
            className="border p-2 rounded col-span-1 md:col-span-2"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />

          <input
            type="text"
            placeholder="Título do conteúdo"
            className="border p-2 rounded col-span-1 md:col-span-2"
            value={form.content_title}
            onChange={(e) => setForm({ ...form, content_title: e.target.value })}
          />

          <textarea
            placeholder="Texto do conteúdo"
            className="border p-2 rounded col-span-1 md:col-span-2"
            value={form.content_text}
            onChange={(e) =>
              setForm({ ...form, content_text: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="URL da imagem"
            className="border p-2 rounded col-span-1 md:col-span-2"
            value={form.content_image}
            onChange={(e) =>
              setForm({ ...form, content_image: e.target.value })
            }
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 md:col-span-2 hover:bg-blue-700 transition"
          >
            {editingId ? "Guardar alterações" : "Adicionar POI"}
          </button>
        </form>

        {/* TABLE */}
        {pois.length === 0 ? (
          <p className="text-gray-600">Nenhum POI registado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="text-left p-3 font-medium">Nome</th>
                  <th className="text-left p-3 font-medium">Zona</th>
                  <th className="text-left p-3 font-medium">Moedas</th>
                  <th className="text-left p-3 font-medium">Ações</th>
                </tr>
              </thead>

              <tbody>
                {pois.map((poi) => {
                  const zone = zones.find((z) => z.id === poi.zoneId);
                  return (
                    <tr
                      key={poi.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-3 text-sm">{poi.name}</td>
                      <td className="p-3 text-sm">{zone?.name || "—"}</td>
                      <td className="p-3 text-sm">{poi.coins}</td>

                      <td className="p-3 text-sm space-x-4">
                        <button
                          onClick={() => {
                            setForm({
                              name: poi.name,
                              lat: poi.lat,
                              lng: poi.lng,
                              radius: poi.radius,
                              coins: poi.coins,
                              tags: poi.tags,
                              content_title: poi.content_title,
                              content_text: poi.content_text,
                              content_image: poi.content_image,
                              zoneId: poi.zoneId,
                            });
                            setEditingId(poi.id);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() => deletePoi(poi.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Apagar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
