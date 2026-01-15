;

import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight =
        document.getElementById("navbar")?.offsetHeight || 60;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-[#1e293b] py-[30px] px-10 border-t border-[rgba(96,165,250,0.2)]">
       <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-[30px] flex-wrap mb-4 md:mb-0">
            <Link
              to={"/login"}
              className="text-[#94a3b8] no-underline text-[0.833rem] font-medium tracking-normal transition-colors duration-300 relative hover:text-white"
            >
              Terms of Use
              <span className="absolute w-0 h-[1px] bg-[#60a5fa] bottom-[-4px] left-0 transition-all duration-300 hover:w-full"></span>
            </Link>
            <Link
              to={"/login"}
              className="text-[#94a3b8] no-underline text-[0.833rem] font-medium tracking-normal transition-colors duration-300 relative hover:text-white"
            >
              Privacy Policy
              <span className="absolute w-0 h-[1px] bg-[#60a5fa] bottom-[-4px] left-0 transition-all duration-300 hover:w-full"></span>
            </Link>
            
          </div>
          <div className="text-[#64748b] text-[0.833rem]">
            <p>
              &copy; {new Date().getFullYear()} Clin Technologies. All rights
              reserved.
            </p>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
