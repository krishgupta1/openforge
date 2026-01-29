import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10 text-center">
      <h1 className="text-4xl font-bold">OpenForge 🚀</h1>

      <p className="mt-4 text-gray-600">
        Share ideas, find contributors, and build open-source projects together.
      </p>

      <div className="mt-8 space-y-2">
        <p>1️⃣ Idea post karo</p>
        <p>2️⃣ Contributors join kare</p>
        <p>3️⃣ Saath me project banao</p>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <Link href="/ideas" className="border px-4 py-2 rounded">
          Explore Ideas
        </Link>
        <Link href="/new-idea" className="border px-4 py-2 rounded">
          Post an Idea
        </Link>
      </div>
    </main>
  );
}
