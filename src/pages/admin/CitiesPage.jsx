import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function CitiesPage() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    description: "",
    lat: "",
    lng: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);

  const API = "https://api.hakkencity.com/api/cities";
  const token = localStorage.getItem("adminToken");

  // GET cities
  const loadCities = async () => {
    setLoading(true);
    try {
      const res = await fetch(API, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setCities(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao carregar cidades:", err);
      alert("Falha ao carregar cidades.");
    }
    setLoading(false);
  };

  // CREATE or UPDATE
  const saveCity = async (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API}/${editingId}` : API;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) return alert("Erro ao salvar cidade.");

      setForm({
        name: "",
        description: "",
        lat: "",
        lng: "",
        image: "",
      });

      setEditingId(null);
      loadCities();
    } catch (err) {
      console.error("Erro ao salvar cidade:", err);
    }
  };

  // DELETE
  const deleteCity = async (id) => {
    if (!confirm("Tem a certeza que deseja apagar esta cidade?")) return;

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) loadCities();
    } catch (err) {
      console.error("Erro ao apagar cidade:", err);
    }
  };

  useEffect(() => {
    loadCities();
  }, []);

  if (loading)
    return <p className="p-6 text-gray-600">A carregar cidades...</p>;

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
        <h1 className="text-2xl font-semibold">Gestão de Cidades</h1>
      </div>

      {/* FORM */}
      <form
        onSubmit={saveCity}
        className="bg-white p-6 shadow rounded mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Nome"
          className="border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Descrição"
          className="border p-2 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

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
          type="text"
          placeholder="URL da imagem (opcional)"
          className="border p-2 rounded col-span-1 md:col-span-2"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 md:col-span-2 hover:bg-blue-700 transition"
        >
          {editingId ? "Guardar alterações" : "Adicionar cidade"}
        </button>
      </form>

      {/* TABLE */}
      {cities.length === 0 ? (
        <p className="text-gray-600">Nenhuma cidade registada.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left p-3 font-medium">Nome</th>
                <th className="text-left p-3 font-medium">Descrição</th>
                <th className="text-left p-3 font-medium">Ações</th>
              </tr>
            </thead>

            <tbody>
              {cities.map((city) => (
                <tr key={city.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3 text-sm">{city.name}</td>
                  <td className="p-3 text-sm">{city.description}</td>

                  <td className="p-3 text-sm space-x-4">
                    <button
                      onClick={() => {
                        setForm({
                          name: city.name,
                          description: city.description,
                          lat: city.lat,
                          lng: city.lng,
                          image: city.image,
                        });
                        setEditingId(city.id);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => deleteCity(city.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
}
