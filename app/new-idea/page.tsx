export default function NewIdea() {
  return (
    <main className="p-10 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Post New Idea</h2>

      <input placeholder="Project Title" className="border p-2 w-full mb-3" />
      <textarea placeholder="Description" className="border p-2 w-full mb-3" />
      <input placeholder="Tech Stack" className="border p-2 w-full mb-3" />
      <input placeholder="Help needed in" className="border p-2 w-full mb-3" />

      <select className="border p-2 w-full mb-3">
        <option>Beginner</option>
        <option>Intermediate</option>
      </select>

      <button className="border px-4 py-2 w-full">
        Submit Idea
      </button>
    </main>
  );
}
