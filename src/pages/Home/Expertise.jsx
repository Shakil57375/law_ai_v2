export default function Expertise() {
    const expertiseItems = [
      {
        icon: "🧠",
        title: "Learning Mode",
        description:
          "We Start From Zero Processing On Each Case And Learn From Your Feedback. After Processing Multiple Cases, Our System Becomes Highly Trained For The Needs Of Health Professionals.",
      },
      {
        icon: "💬",
        title: "Natural Language Processing",
        description:
          "By Leveraging Advanced Natural Language Processing Technology, Our System Can Understand Context, Detect Intent, And Generate System Language Understanding And Response.",
      },
      {
        icon: "🛡️",
        title: "Enhanced Privacy",
        description:
          "Our AI Solutions Are Designed To Handle Data With Extra Care, Ensuring Security Measures, Including Encryption And Access Controls, Regulate Information Access To Authorized Personnel Only.",
      },
    ]
  
    return (
      <section id="expertise" className="py-20 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-blue-400 mb-4">OUR EXPERTISE</h2>
          <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
            Our technology provides artificial intelligence solutions designed for clinics and healthcare organizations.
            Using healthcare professionals&apos; real-world data to create a unique dataset, we help streamline and optimize
            the clinical documentation process, saving you time and effort.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertiseItems.map((item, index) => (
              <div key={index} className="p-6 rounded-lg border border-gray-700 hover:border-[#15B8A6] transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  