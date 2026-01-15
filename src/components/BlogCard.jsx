
export default function BlogCard({ title, image, onViewWork, viewWorkLabel = "View Work" }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col group">
      {/* Image Container */}
      <div className="relative w-full h-64 md:h-72 overflow-hidden bg-gray-100">
        <img
          src={image || "/placeholder.svg?height=300&width=400&query=blog"}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content Container */}
      <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">{title}</h3>

        {/* Button Container */}
        <div className="flex justify-end">
          <button
            onClick={onViewWork}
            className="px-5 py-2 border-2 border-gray-800 text-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-colors font-semibold text-sm md:text-base"
          >
            {viewWorkLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
