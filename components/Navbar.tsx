import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 border-b">
      <h1 className="font-bold text-xl">OpenForge</h1>
      <div className="flex gap-4">
        <Link href="/ideas">Explore Ideas</Link>
        <Link href="/new-idea">Post an Idea</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}
