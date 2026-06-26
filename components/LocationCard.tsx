import { categoryIcons } from "./icons";
import { Location } from "../types/location";

export default function LocationCard({
  location,
}: {
  location: Location;
}) {
  const Icon =
    categoryIcons[
      location.category as keyof typeof categoryIcons
    ];

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer">
      <div className="flex items-center gap-3">
        {Icon && (
          <Icon className="w-6 h-6 text-blue-500" />
        )}

        <h2 className="text-lg font-bold">
          {location.name}
        </h2>
      </div>

      <p className="mt-3 text-gray-600">
        {location.description}
      </p>

      <span className="inline-block mt-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
        {location.category}
      </span>
    </div>
  );
}