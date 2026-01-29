import { ideas } from "@/lib/dummyData";
import IdeaCard from "@/components/IdeaCard";

export default function IdeasPage() {
  return (
    <main className="p-10">
      <h2 className="text-3xl font-bold mb-6">Ideas</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
    </main>
  );
}
