import { useState } from "react";
import YouTube from "react-youtube";

export default function Introduction() {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoOpts = {
    height: "640",
    width: "1080",
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      showinfo: 0,
      mute: 0,
      modestbranding: 1,
    },
  };

  const onStateChange = (event) => {
    setIsPlaying(event.data === 1); // 1 means playing
  };

  return (
    <section className="pb-20 bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-400 mb-4">INTRODUCING</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Leverage AI to seamlessly
            <br />
            automate your conversations.
          </h3>
          <p className="text-gray-400 max-w-3xl mx-auto">
            This AI-powered chatbot provides reliable and confidential medical
            assistance, offering personalized advice and support for a range of
            health-related queries. Designed with HIPAA compliance and privacy
            in mind, it leverages advanced technology to deliver accessible
            healthcare guidance anytime, anywhere.
          </p>
        </div>

        {/* YouTube Video Embed */}
        <div className="relative max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl">
          <div className="aspect-w-16 aspect-h-9">
            <YouTube
              videoId="yy3WyaaJBPo" // Correct YouTube Video ID
              opts={videoOpts}
              onStateChange={onStateChange}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-center gap-8">
          <div className="flex items-center text-sm text-gray-400">
            <span className="w-3 h-3 mr-2 rounded-full bg-[#15B8A6]" />
            Access to medical health information and notes
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <span className="w-3 h-3 mr-2 rounded-full bg-[#15B8A6]" />
            Access to general health information and FAQs
          </div>
        </div>
      </div>
    </section>
  );
}
