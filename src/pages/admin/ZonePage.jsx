import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import {
  useGetZonesQuery,
  useCreateZoneMutation,
  useUpdateZoneMutation,
  useDeleteZoneMutation,
  useGetCitiesQuery,
} from "../../features/adminApi";

export default function ZonePage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    cityId: "",
  });

  const [editingId, setEditingId] = useState(null);

  // ---- RTK QUERY ----
  const { data: zones = [], isLoading: loadingZones } = useGetZonesQuery();
  const { data: cities = [] } = useGetCitiesQuery();

  const [createZone] = useCreateZoneMutation();
  const [updateZone] = useUpdateZoneMutation();
  const [deleteZone] = useDeleteZoneMutation();

  const loading = loadingZones;

  // ------------------------------
  // CREATE OR UPDATE ZONE
  // ------------------------------
  const saveZone = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateZone({ id: editingId, body: form }).unwrap();
      } else {
        await createZone(form).unwrap();
      }

      // Reset form
      setForm({ name: "", description: "", cityId: "" });
      setEditingId(null);

    } catch (err) {
      console.error("Erro ao guardar zona:", err);
      alert("Falha ao guardar zona.");
    }
  };

  // ------------------------------
  // DELETE ZONE
  // ------------------------------
  const handleDelete = async (id) => {
    if (!confirm("Tem a certeza que deseja apagar esta zona?")) return;

    try {
      await deleteZone(id).unwrap();
    } catch (err) {
      console.error("Erro ao apagar zona:", err);
      alert("Falha ao apagar zona.");
    }
  };

  if (loading)
    return <p className="p-6 text-gray-600">A carregar zonas...</p>;

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
          <h1 className="text-2xl font-semibold">Gestão de Zonas</h1>
        </div>

        {/* FORM */}
        <form
          onSubmit={saveZone}
          className="bg-white p-6 shadow rounded mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Nome da zona"
            className="border p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <select
            className="border p-2 rounded"
            value={form.cityId}
            onChange={(e) => setForm({ ...form, cityId: e.target.value })}
            required
          >
            <option value="">Selecionar cidade…</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Descrição"
            className="border p-2 rounded col-span-1 md:col-span-2"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 md:col-span-2 hover:bg-blue-700 transition"
          >
            {editingId ? "Guardar alterações" : "Adicionar zona"}
          </button>
        </form>

        {/* TABLE */}
        {zones.length === 0 ? (
          <p className="text-gray-600">Nenhuma zona registada.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="text-left p-3 font-medium">Zona</th>
                  <th className="text-left p-3 font-medium">Cidade</th>
                  <th className="text-left p-3 font-medium">Descrição</th>
                  <th className="text-left p-3 font-medium">Ações</th>
                </tr>
              </thead>

              <tbody>
                {zones.map((zone) => {
                  const city = cities.find((c) => c.id === zone.cityId);

                  return (
                    <tr
                      key={zone.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-3 text-sm">{zone.name}</td>
                      <td className="p-3 text-sm">{city?.name || "—"}</td>
                      <td className="p-3 text-sm">{zone.description}</td>

                      <td className="p-3 text-sm space-x-4">
                        <button
                          onClick={() => {
                            setForm({
                              name: zone.name,
                              description: zone.description,
                              cityId: zone.cityId,
                            });
                            setEditingId(zone.id);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() => handleDelete(zone.id)}
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
