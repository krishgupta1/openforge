export default function Login() {
  return (
    <main className="p-10 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login / Signup</h2>

      <input
        placeholder="Name"
        className="border p-2 w-full mb-3"
      />
      <input
        placeholder="Username"
        className="border p-2 w-full mb-3"
      />
      <input
        placeholder="Skills (React, Node...)"
        className="border p-2 w-full mb-3"
      />

      <button className="border px-4 py-2 w-full">
        Continue
      </button>
    </main>
  );
}
