export default function Kardex() {
    return (
        <div className="w-full p-6">
            <div
                id="left-top"
                className="flex flex-wrap items-center justify-between gap-4"
            >
                <div>
                    <h2 className="text-3xl font-bold my-3">
                        Kardex
                    </h2>

                    <h3 className="font-bold text-xl">
                        Taladro percutor 750W
                    </h3>

                    <p className="text-gray-500 text-lg my-2">
                        Código: 00123
                    </p>
                </div>

                <div id="top-right" className="absolute mx-115 w-full py-5 top-15">
                    <span className="inline-flex relative rounded-full bg-green-100 px-4 py-2 mx-40 text-sm font-semibold text-green-700">
                        En stock
                    </span>
                </div>
            </div>
            <div id="main" className="px-0 py-5">
                <div id="row-2" className="flex gap-5">
                    <div className="bg-gray-50 w-40 p-2 rounded-lg" id="cuadro"><p>Stock actual</p> <p className="font-bold text-xl">12</p></div>
                    <div className="bg-gray-50 w-40 p-2 rounded-lg" id="cuadro"><p>Stock actual</p> <p className="font-bold text-xl">12</p></div>
                    <div className="bg-gray-50 w-40 p-2 rounded-lg" id="cuadro"><p>Stock actual</p> <p className="font-bold text-xl">12</p></div>
                    <button className="bg-blue-500 w-40 rounded-md text-white">Exportar PDF</button>
                </div>
                <div id="movimeintos">
                    <h2 className="font-bold text-2xl my-5">Movimientos (Kardex)</h2>
                    <table className="w-full text-left text-sm">
                        <thead className="text-gray-500">
                            <tr className="font-normal">
                            <th className="px-5 py-4 text-left font-normal">Fecha</th>
                            <th className="px-5 py-4 text-left font-normal">Tipo</th>
                            <th className="px-5 py-4 text-left font-normal">Documento</th>
                            <th className="px-5 py-4 text-left font-normal">Entrada</th>
                            <th className="px-5 py-4 text-left font-normal">Salida</th>
                            <th className="px-5 py-4 text-left font-normal">Stock</th>
                            <th className="px-5 py-4 text-left font-normal">Observación</th>
                            </tr>
                        </thead>

          <tbody>
            <tr className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer">
              <td className="px-5 py-4 text-gray-500">02/09/2026</td>
              <td className="px-5 py-4 text-green-500">
                Entrada
              </td>
              <td className="px-5 py-4 text-gray-600">Compra #458</td>
              <td className="px-5 py-4 text-green-500">+20</td>
              <td className="px-5 py-4">-</td>
              <td className="px-5 py-4">
                  20
              </td>
              <td className="text-left">
                Proveedor: Ferromax
              </td>
            </tr>

            <tr className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer">
              <td className="px-5 py-4 text-gray-500">05/09/2026</td>
              <td className="px-5 py-4 text-red-500">
                Salida
              </td>
              <td className="px-5 py-4 text-gray-600">Venta #1245</td>
              <td className="px-5 py-4">-</td>
              <td className="px-5 py-4 text-red-500">-3</td>
              <td className="px-5 py-4">
                  17
              </td>
              <td>Cliente: Juan Pérez</td>
            </tr>
          </tbody>
        </table>
                </div>
            </div>
        </div>
    );
}