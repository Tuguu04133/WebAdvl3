import { useEffect, useState } from "react";

interface Org {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  category: string;
}

export function App() {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/orgs")
      .then((res) => res.json())
      .then((data) => {
        setOrgs(data);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-xl">
        ⏳ Ачаалж байна...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        📒 ШАР НОМ
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Нэр
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Утас
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Имэйл
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Хаяг
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Ангилал
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orgs.map((org, idx) => (
              <tr
                key={org.id}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-6 py-4 text-gray-800">{org.name}</td>
                <td className="px-6 py-4 text-gray-800">{org.phone}</td>
                <td className="px-6 py-4 text-gray-800">{org.email}</td>
                <td className="px-6 py-4 text-gray-800">{org.address}</td>
                <td className="px-6 py-4 text-gray-800">{org.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
