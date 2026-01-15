import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Banner = () => {
  const canvasRef = useRef(null);
  const glowHoverRef = useRef(null);

  const token = useSelector((state) => state?.auth?.accessToken);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', () => {
      setCanvasSize();
      createParticles();
    });

    // Particles setup
    let particles = [];
    const particleCount = 150;
    const baseRadius = 1;
    const maxRadius = 3;
    const baseSpeed = 0.2;
    const maxConnectDistance = 150;

    const mouse = { x: null, y: null, radius: 120 };

    // Mouse interaction
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      if (glowHoverRef.current) {
        glowHoverRef.current.style.opacity = '1';
        glowHoverRef.current.style.left = `${mouse.x - 125}px`;
        glowHoverRef.current.style.top = `${mouse.y - 125}px`;
      }
    });

    canvas.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;

      if (glowHoverRef.current) {
        glowHoverRef.current.style.opacity = '0';
      }
    });

    // Create particles
    function createParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * (maxRadius - baseRadius) + baseRadius;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedFactor = (maxRadius - radius + baseRadius) / maxRadius;
        const opacity = Math.random() * 0.5 + 0.3;
        const hue =
          Math.random() > 0.5
            ? Math.floor(Math.random() * 30) + 210
            : Math.floor(Math.random() * 40) + 180;

        particles.push({
          x,
          y,
          radius,
          originalRadius: radius,
          color: `hsla(${hue}, 80%, 60%, ${opacity})`,
          speedX: (Math.random() - 0.5) * baseSpeed * speedFactor,
          speedY: (Math.random() - 0.5) * baseSpeed * speedFactor,
          lastMouse: { x, y },
          connectionCount: 0,
        });
      }
    }

    // Draw connections between particles
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (
            distance < maxConnectDistance &&
            particles[i].connectionCount < 3 &&
            particles[j].connectionCount < 3
          ) {
            const opacity = 1 - distance / maxConnectDistance;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${opacity * 0.15})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            particles[i].connectionCount++;
            particles[j].connectionCount++;
          }
        }
      }
    }

    // Draw and update particles
    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawConnections();

      particles.forEach((particle) => {
        particle.connectionCount = 0;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            particle.lastMouse = { x: mouse.x, y: mouse.y };
            const angle = Math.atan2(dy, dx);
            const tx = particle.x - Math.cos(angle) * force * 5;
            const ty = particle.y - Math.sin(angle) * force * 5;
            particle.x += (tx - particle.x) * 0.05;
            particle.y += (ty - particle.y) * 0.05;
            const radiusIncrease = (1 - distance / mouse.radius) * 2;
            particle.radius = particle.originalRadius + radiusIncrease;
          } else {
            particle.radius +=
              (particle.originalRadius - particle.radius) * 0.1;
          }
        } else {
          particle.radius += (particle.originalRadius - particle.radius) * 0.1;
        }
      });
    }

    // Animation loop
    function animate() {
      drawParticles();
      requestAnimationFrame(animate);
    }

    createParticles();
    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', () => {});
      canvas.removeEventListener('mouseleave', () => {});
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight =
        document.getElementById('navbar')?.offsetHeight || 60;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-[#0a1022] z-10 overflow-hidden shadow-2xl">
      <canvas
        ref={canvasRef}
        id="particles-canvas"
        className="absolute top-0 left-0 w-full h-full"
      ></canvas>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(10,16,34,0)_0%,rgba(10,16,34,0.8)_80%,rgba(10,16,34,1)_100%)] z-2"></div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-3">
        <div className="absolute top-[-50px] left-[-100px] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.4)_0%,rgba(59,130,246,0.3)_50%,rgba(37,99,235,0)_100%)] opacity-50 animate-[float_25s_infinite_alternate]"></div>
        <div className="absolute bottom-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.4)_0%,rgba(59,130,246,0.3)_50%,rgba(37,99,235,0)_100%)] opacity-50 animate-[float_20s_2s_infinite_alternate]"></div>
        <div className="absolute top-[20%] right-[15%] w-[150px] h-[150px] rounded-full bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.4)_0%,rgba(59,130,246,0.3)_50%,rgba(37,99,235,0)_100%)] opacity-50 animate-[float_15s_1s_infinite_alternate]"></div>
      </div>

      <div
        ref={glowHoverRef}
        className="absolute w-[250px] h-[250px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.3)_0%,rgba(59,130,246,0)_70%)] pointer-events-none z-2 opacity-0 transition-opacity duration-300 blur-xl"
      ></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-11 w-[90%] max-w-[1200px]">
        <div className="mb-[30px] transform translate-y-0 opacity-0 animate-[fadeInUp_1s_cubic-bezier(0.16,1,0.3,1)_forwards_0.2s]">
          <div className="w-[120px] h-[120px] mx-auto mb-[15px] relative">
            <svg
              className="absolute top-0 left-0 w-full h-full animate-[pulse_5s_infinite] filter drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]"
              viewBox="0 0 100 100"
            >
              <path
                d="M20 40 C20 25, 40 15, 50 15 C60 15, 80 25, 80 40 C80 50, 70 60, 60 65 C70 70, 80 80, 80 90 C80 105, 60 115, 50 115 C40 115, 20 105, 20 90 C20 80, 30 70, 40 65 C30 60, 20 50, 20 40 Z"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="2"
              />
            </svg>
            <svg
              className="absolute top-0 left-0 w-full h-full animate-[glow_3s_infinite]"
              viewBox="0 0 100 100"
            >
              <path
                d="M35 40 H65 M50 40 V80 M35 60 H65 M25 50 H75"
                stroke="#93c5fd"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="35" cy="40" r="2" fill="#93c5fd" />
              <circle cx="65" cy="40" r="2" fill="#93c5fd" />
              <circle cx="50" cy="60" r="2" fill="#93c5fd" />
              <circle cx="35" cy="80" r="2" fill="#93c5fd" />
              <circle cx="65" cy="80" r="2" fill="#93c5fd" />
            </svg>
          </div>
        </div>

        <h1 className="text-[2.986rem] md:text-[2.986rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] via-[#3b82f6] to-[#2563eb] m-0 tracking-tight opacity-0 transform translate-y-[20px] animate-[fadeInUp_1s_cubic-bezier(0.16,1,0.3,1)_forwards_0.5s]">
          Clin Technologies
        </h1>

        <p className="text-[1.728rem] md:text-[1.728rem] font-normal text-[#94a3b8] mt-[10px] mb-0 tracking-normal opacity-0 transform translate-y-[20px] animate-[fadeInUp_1s_cubic-bezier(0.16,1,0.3,1)_forwards_0.8s]">
          Revolutionizing clinical documentation through{' '}
          <span className="text-[#f59e0b] font-semibold">HIPAA COMPLIANT</span>{' '}
          advanced artificial intelligence, giving healthcare providers more
          time for what truly matters — patient care. try it for{' '}
          <span className="text-[#f59e0b] font-semibold">FREE</span> today
        </p>

        <p className="text-[1.44rem] text-[#e2e8f0] max-w-[700px] mx-auto mt-[30px] leading-normal opacity-0 transform translate-y-[20px] animate-[fadeInUp_1s_cubic-bezier(0.16,1,0.3,1)_forwards_1.1s]">
          Our sophisticated AI platform intelligently processes clinical
          conversations, creating accurate documentation that integrates with
          your existing EMR system.
        </p>

        {!token ? (
          <div className="mt-[40px] opacity-0 transform translate-y-[20px] animate-[fadeInUp_1s_cubic-bezier(0.16,1,0.3,1)_forwards_1.4s] flex justify-center gap-5 md:flex-row flex-col">
            <Link
              to={'/login'}
              className="bg-transparent border-2 border-[#3b82f6] text-white px-8 py-4 rounded-full hover:bg-[rgba(59,130,246,0.1)] transition-colors shadow-[0_5px_15px_rgba(37,99,235,0.2)] inline-block text-center"
            >
              Login
            </Link>
            <Link
              to={'/signUp'}
              className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white px-8 py-4 rounded-full hover:translate-y-[-3px] hover:shadow-[0_8px_20px_rgba(37,99,235,0.5)] transition-all shadow-[0_5px_15px_rgba(37,99,235,0.4)] relative overflow-hidden z-1 inline-block text-center"
            >
              Signup
            </Link>
          </div>
        ) : (
          <div>
            <Link
              to={'/'}
              className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white px-8 py-4 rounded-full hover:translate-y-[-3px] hover:shadow-[0_8px_20px_rgba(37,99,235,0.5)] transition-all shadow-[0_5px_15px_rgba(37,99,235,0.4)] relative overflow-hidden z-1 inline-block text-center"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>

      <div className="absolute bottom-[30px] left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-[fadeIn_1s_forwards_2s]">
        <div className="w-[24px] h-[38px] border-2 border-[rgba(148,163,184,0.5)] rounded-[12px] relative">
          <div className="absolute top-[6px] left-1/2 transform -translate-x-1/2 w-[6px] h-[6px] bg-[#60a5fa] rounded-full animate-[scrollDown_2s_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
