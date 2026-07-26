export default function StatusCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <p className="text-sm text-gray-500">{title}</p>

      <h2 className="mt-2 text-xl font-semibold">{value}</h2>
    </div>
  );
}
