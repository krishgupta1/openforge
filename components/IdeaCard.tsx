import Link from "next/link";

export default function IdeaCard({ idea }: any) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
      <h3 className="font-bold text-lg text-gray-900 mb-2">{idea.title}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{idea.description}</p>

      <div className="flex flex-wrap gap-1 mb-3">
        {idea.tech.map((tech: string, index: number) => (
          <span 
            key={index}
            className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">
          Status: <span className="text-gray-700">{idea.status}</span>
        </span>
        
        <Link
          href={`/ideas/${idea.id}`}
          className="inline-flex items-center text-sm font-medium text-black hover:text-gray-700 transition-colors"
        >
          View Project →
        </Link>
      </div>
    </div>
  );
}
