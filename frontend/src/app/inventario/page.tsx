
export default function Inventario() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-900">
          Inventario &amp; Kardex
        </h2>

        <button className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white transition hover:bg-blue-600">
          + Nuevo producto
        </button>
      </div>

      <div className="relative my-5 w-full max-w-2xl">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>

  <input
    type="text"
    placeholder="Buscar producto..."
    className="w-full rounded-xl border border-gray-300 bg-gray-200 py-3 pl-10 pr-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
  />
</div>

      <div className="overflow-x-auto rounded-xl bg-white">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-500">
            <tr className="font-normal">
              <th className="px-5 py-4">Código</th>
              <th className="px-5 py-4">Producto</th>
              <th className="px-5 py-4">Categoría</th>
              <th className="px-5 py-4">Stock</th>
              <th className="px-5 py-4">Mín.</th>
              <th className="px-5 py-4">Estado</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer">
              <td className="px-5 py-4 text-gray-500">00123</td>
              <td className="px-5 py-4 text-slate-800">
                Taladro de acero 750W
              </td>
              <td className="px-5 py-4 text-gray-600">Herramientas</td>
              <td className="px-5 py-4">12</td>
              <td className="px-5 py-4">5</td>
              <td className="px-5 py-4">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  En stock
                </span>
              </td>
            </tr>

            <tr className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer">
              <td className="px-5 py-4 text-gray-500">00789</td>
              <td className="px-5 py-4 text-slate-800">
                Juego de destornilladores
              </td>
              <td className="px-5 py-4 text-gray-600">Herramientas</td>
              <td className="px-5 py-4">8</td>
              <td className="px-5 py-4">5</td>
              <td className="px-5 py-4">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                  Stock bajo
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
