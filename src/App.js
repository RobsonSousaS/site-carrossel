import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import Confetti from "react-confetti";

function NextArrow(props) {
  const { onClick, isMobile } = props;
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        right: isMobile ? "-25px" : "-50px",
        top: "40%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        zIndex: 2,
      }}
    >
      <FaArrowCircleRight size={isMobile ? 30 : 40} color="#fff" />
    </div>
  );
}

function PrevArrow(props) {
  const { onClick, isMobile } = props;
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        left: isMobile ? "-25px" : "-50px",
        top: "40%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        zIndex: 2,
      }}
    >
      <FaArrowCircleLeft size={isMobile ? 30 : 40} color="#fff" />
    </div>
  );
}

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  const [hearts, setHearts] = useState([]);
  const isMobile = windowSize.width <= 768;

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const createHeart = (x, y) => {
    const colors = ['#ff0000', '#ff5e5e', '#ff9d9d', '#ffcccc'];
    const sizes = isMobile ? [15, 20, 25] : [20, 25, 30, 35];
    const newHeart = {
      id: Date.now(),
      x,
      y,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: sizes[Math.floor(Math.random() * sizes.length)],
      opacity: 1
    };
    
    setHearts(prev => [...prev, newHeart]);
    
    // Remove o coração após a animação
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
    }, 2000);
  };

  const handleClick = (e) => {
    // Criar vários corações no local do clique
    for (let i = 0; i < (isMobile ? 3 : 5); i++) {
      setTimeout(() => {
        createHeart(e.clientX, e.clientY);
      }, i * 100);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow isMobile={isMobile} />,
    prevArrow: <PrevArrow isMobile={isMobile} />,
    adaptiveHeight: true
  };

  const slides = [
    { img: "/images/imagem1.png", text: "Eu te amo muito! ❤️" },
    { img: "/images/imagem2.jpg", text: "Eu amo o seu surrisuuu! ⭐" },
    { img: "/images/imagem3.jpg", text: "Eu amo seus zolhos! 💓" },
    { img: "/images/imagem4.png", text: "Eu amo seu bebelo! " },
    { img: "/images/imagem5.png", text: "Eu amo tudo em você! 💫💓" },
    { img: "/images/imagem6.png", text: "Eu amo nossa filha também! 🐶" },
  ];

  return (
    <div 
      onClick={handleClick}
      style={{
        fontFamily: "Arial, sans-serif",
        position: "relative",
        backgroundImage: "url('/images/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#000",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        cursor: "pointer"
      }}
    >
      {/* 🎉 Confetes cobrindo a tela inteira */}
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999
        }}
      />

      {/* Corações personalizados */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          style={{
            position: "fixed",
            left: heart.x,
            top: heart.y,
            width: heart.size,
            height: heart.size,
            color: heart.color,
            fontSize: heart.size,
            opacity: heart.opacity,
            transform: 'translate(-50%, -50%)',
            transition: 'all 2s ease-out',
            zIndex: 9998,
            pointerEvents: 'none'
          }}
        >
          ❤️
        </div>
      ))}

      {/* 🎵 Música de fundo */}
      <audio autoPlay loop volume={0.3}>
        <source src="/music/music.mp3" type="audio/mpeg" />
        Seu navegador não suporta áudio.
      </audio>

      <div style={{
        maxWidth: "90%",
        margin: isMobile ? "20px auto" : "50px auto",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
        padding: "0 10px"
      }}>
        <h1 style={{
          marginBottom: isMobile ? "15px" : "30px",
          color: "#000",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          background: "rgba(255,255,255,0.85)",
          padding: isMobile ? "8px" : "12px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          fontSize: isMobile ? "18px" : "24px"
        }}>
          Feliz aniversário amor da minha vida ❤️🎊
        </h1>

        <div style={{ 
          width: "100%", 
          margin: "0 auto",
          padding: isMobile ? "0 5px" : "0 15px"
        }}>
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index} style={{ padding: isMobile ? "0 5px" : "0 15px" }}>
                <img
                  src={slide.img}
                  alt={`Slide ${index + 1}`}
                  style={{
                    width: "100%",
                    height: isMobile ? "auto" : "400px",
                    objectFit: "cover",
                    borderRadius: "15px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
                  }}
                />
                <p
                  style={{
                    marginTop: "15px",
                    fontSize: isMobile ? "16px" : "18px",
                    color: "#000",
                    background: "rgba(255,255,255,0.85)",
                    padding: "12px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
                  }}
                >
                  {slide.text}
                </p>
              </div>
            ))}
          </Slider>
        </div>

        <h2 style={{
          margin: "30px 0",
          color: "#000",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          background: "rgba(255,255,255,0.85)",
          padding: isMobile ? "10px" : "12px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          fontSize: isMobile ? "14px" : "16px",
          fontWeight: "normal",
          lineHeight: "1.5"
        }}>
          Feliz aniversário, Karyn! ou melhor! meu amorzinho 💖<br /><br />

          Hoje é o seu dia, e eu desejo que ele seja tão incrível e perfeito quanto você é para mim. Que cada momento seja repleto de alegria, sorrisos e surpresas maravilhosas. Que você seja muito feliz, não só hoje, mas em todos os dias da sua vida.<br /><br />

          Eu quero que você aproveite cada instante, sinta todo o amor que te cerca e lembre-se de que eu estarei sempre aqui, torcendo pelo seu sorriso e pelo seu bem-estar. Você merece tudo de mais lindo que a vida pode oferecer, e eu só quero estar ao seu lado para compartilhar cada pedacinho dessa felicidade.<br /><br />

          Te amo demais, amor da minha vida! 💕 Que seu dia seja inesquecível!
        </h2>
      </div>
    </div>
  );
}

export default App;