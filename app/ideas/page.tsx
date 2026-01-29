import { ideas } from "@/lib/dummyData";
import IdeaCard from "@/components/IdeaCard";

export default function IdeasPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-white">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Explore Ideas</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </div>
    </main>
  );
}
