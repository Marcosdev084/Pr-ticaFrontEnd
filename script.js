// Registra os plugins necessários
gsap.registerPlugin(ScrollTrigger);

// Função principal para rodar após o carregamento
window.addEventListener("load", () => {
  // 1. GARANTIR VISIBILIDADE (FORÇAR OPACIDADE)
  // Isso garante que, se o GSAP rodar, ele controle a opacidade do zero
  gsap.set("#home h1, #home p, .menu, section .container > *", { opacity: 0 });

  const tl = gsap.timeline();

  tl.to("#home h1", {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "power4.out",
  })
    .to(
      "#home p",
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
      },
      "-=0.8",
    )
    .to(
      ".menu",
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)", // Garante que limpe qualquer blur residual
        duration: 1,
        ease: "expo.out",
      },
      "-=0.5",
    );

  // 2. ANIMAÇÃO AO ROLAR O SCROLL
  const secoes = document.querySelectorAll("section:not(#home)");
  secoes.forEach((secao) => {
    gsap.to(secao.querySelectorAll(".container > *"), {
      scrollTrigger: {
        trigger: secao,
        start: "top 60%",
        toggleActions: "play none none none",
      },
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });
  });

  // 3. EFEITO PARALLAX NO MOUSE (INOVAÇÃO)
  // Faz o fundo se mover levemente de acordo com a posição do mouse
  window.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 60; // 60px de movimento
    const yPos = (clientY / window.innerHeight - 0.5) * 30;

    gsap.to("#home", {
      backgroundPosition: `${50 + xPos}% ${50 + yPos}%`,
      duration: 0.5,
      ease: "power2.out",
    });
  });
});

window.addEventListener("load", () => {
  const video = document.createElement("video");
  const midiaBackground = document.querySelector(".midiaBackground");
  video.src = "img/videoback (2).mp4";
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true; // Para garantir que funcione em dispositivos móveis
  video.muted = true; // Garante que o vídeo esteja mudo
  video.style.opacity = 0; // Ajusta a opacidade para um efeito mais suave

  video.addEventListener("canplaythrough", () => {
 video.style.opacity = 1; 
  });

  midiaBackground.appendChild(video);
});



