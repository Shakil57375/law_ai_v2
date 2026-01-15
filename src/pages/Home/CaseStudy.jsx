export default function CaseStudy() {
    const cases = [
      {
        title: "Medical Documentation",
        description:
          "Streamline your documentation process with our AI-powered solution that accurately captures and transcribes patient interactions, saving valuable time for healthcare professionals.",
      },
      {
        title: "Data Management",
        description:
          "Efficiently organize and manage patient data with our secure, HIPAA-compliant system. Access and update records seamlessly while maintaining the highest standards of privacy.",
      },
      {
        title: "Clinical Flow",
        description:
          "Optimize your clinical workflow with intelligent automation that helps reduce administrative burden and allows more focus on patient care.",
      },
    ]
  
    return (
      <section id="case-use" className="py-20 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-blue-400 mb-12">CASE USE</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-1 lg:order-2">
              <div className="space-y-6">
                {cases.map((item, index) => (
                  <div key={index} className="bg-[#0F2137] p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-2 lg:order-1 flex justify-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pana-P3ayCH6RPrGjMBEKYsAq5NMAjGPFUP.png"
                alt="Healthcare Professional"
                className="max-w-md w-full"
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  