import Link from "next/link";

export default function IdeaCard({ idea }: any) {
  return (
    <div className="border p-4 rounded">
      <h3 className="font-bold">{idea.title}</h3>
      <p className="text-sm text-gray-600">{idea.description}</p>

      <p className="mt-2 text-sm">
        Tech: {idea.tech.join(", ")}
      </p>

      <p className="text-sm mt-1">Status: {idea.status}</p>

      <Link
        href={`/ideas/${idea.id}`}
        className="inline-block mt-3 underline"
      >
        View Project
      </Link>
    </div>
  );
}
