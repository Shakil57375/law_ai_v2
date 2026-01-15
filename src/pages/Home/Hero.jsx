import { Link } from "react-router-dom";

export default function Hero() {
    return (
      <section id="home" className="pt-20 bg-[#0A1628] py-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
          <div className="flex flex-col items-center justify-center space-y-8">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Nil%20vyaa-01%203-cNY1nigoRMbh503c4CE9Xwio51KM1g.png"
              alt="Company Logo"
              className="w-44 h-44 mb-6"
            />
            <p className="text-sm text-gray-400">
              AI-Driven Healthcare Documentation Support | HIPAA-Compliant and Cloud-Based
            </p>
            <div className="flex gap-4 justify-center">
              <Link to={"/login"} className="bg-[#15B8A6] text-white px-6 py-2 rounded-full hover:bg-[#15B8A6] transition-colors">
                Login
              </Link>
              <Link  to={"/signUp"} className="border border-gray-600 text-gray-300 px-6 py-2 rounded-full hover:border-gray-400 transition-colors">
                Signup
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  