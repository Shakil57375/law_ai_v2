import { useState, useEffect } from "react"

const testimonials = [
  {
    id: 1,
    text: "AI is revolutionizing healthcare by enhancing diagnostics, enabling personalized treatments, and supporting remote patient monitoring—all while streamlining administrative tasks.",
    author: "Dr. Sarah Johnson",
    role: "Chief Medical Officer",
  },
  {
    id: 2,
    text: "The AI-powered documentation system has significantly reduced our administrative workload, allowing us to focus more on patient care.",
    author: "Dr. Michael Chen",
    role: "Primary Care Physician",
  },
  {
    id: 3,
    text: "The accuracy and efficiency of the AI system in transcribing and organizing medical notes have transformed our daily operations.",
    author: "Dr. Emily Rodriguez",
    role: "Healthcare Director",
  },
  {
    id: 4,
    text: "Implementation was seamless, and the support team has been exceptional in helping us optimize the system for our specific needs.",
    author: "James Wilson",
    role: "Hospital Administrator",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    let interval
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
      }, 5000) // Change testimonial every 5 seconds
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handleDotClick = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
    setIsAutoPlaying(false)
  }

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-20 bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-12">
          What our customer
          <br />
          says About Us
        </h2>
        <div className="relative max-w-3xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevClick}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-gray-400 hover:text-white"
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNextClick}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-gray-400 hover:text-white"
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Testimonial Content */}
          <div className="relative h-[300px] overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute w-full transition-all duration-500 ease-in-out ${
                  index === currentIndex
                    ? "opacity-100 translate-x-0"
                    : index < currentIndex
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                }`}
              >
                <blockquote className="text-center">
                  <p className="text-xl text-gray-300 mb-8">{testimonial.text}</p>
                  <footer>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-gray-400">{testimonial.role}</div>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-[#15B8A6] w-4" : "bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

