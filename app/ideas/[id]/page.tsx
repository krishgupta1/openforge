import { ideas } from "@/lib/dummyData";

export default function IdeaDetail({
  params,
}: {
  params: { id: string };
}) {
  const idea = ideas.find((i) => i.id === params.id);

  if (!idea) return <p>Idea not found</p>;

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">{idea.title}</h1>

      <p className="mt-4">{idea.description}</p>

      <p className="mt-2">Tech Stack: {idea.tech.join(", ")}</p>
      <p className="mt-2">Status: {idea.status}</p>

      <button className="border px-4 py-2 mt-6">
        I want to contribute
      </button>
    </main>
  );
}
