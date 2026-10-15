import { useEffect, useState } from "react";

const whatsapp = "https://wa.me/5511968194802";
const quoteWhatsapp = "https://wa.me/5511980350415";
const mapUrl = "https://www.google.com/maps/@-23.5876044,-46.7634829,3a,90y,20.02h,94.54t/data=!3m7!1e1!3m5!1s2uRT6I1ZnyuyQIniW0AbMg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-4.5443908442523195%26panoid%3D2uRT6I1ZnyuyQIniW0AbMg%26yaw%3D20.01680526404629!7i16384!8i8192?entry=ttu";
const osascoMapUrl = "https://www.google.com/maps/search/?api=1&query=R.%20Antônio%20Alves%20Ribeiro%2C%201365%20-%20Jardim%20Munhoz%20Junior%20-%20Osasco";

const services = [
  { title: "MECÂNICA GERAL", text: "Revisão completa para manter seu carro seguro e confiável." },
  { title: "TROCA DE ÓLEO", text: "Troca de óleo com máquina para cuidar da vida útil do seu câmbio." },
  { title: "CÂMBIO AUTOMÁTICO OU MANUAL", text: "Diagnóstico, manutenção e reparo para todos os tipos de transmissão." },
  { title: "DIAGNÓSTICO ELETRÔNICO", text: "Leitura precisa para identificar a origem da falha no sistema." },
  { title: "TROCA DE EMBREAGEM", text: "Substituição técnica para recuperar a resposta e a segurança do veículo." },
  { title: "REVISÃO DE TRANSMISSÃO", text: "Inspeção especializada de componentes, fluidos e engrenagens." },
];

const faq = [
  ["Quais são os principais problemas de um câmbio automotivo mecânico?", "Desgaste de embreagem, dificuldade para engatar marchas, ruídos e vazamentos são sinais comuns."],
  ["Quais são os principais problemas de um câmbio automotivo automático?", "Trancos, demora para engatar, patinação, ruídos e luz de alerta pedem uma avaliação especializada."],
  ["Como verificar a qualidade do serviço prestado?", "Peça um diagnóstico detalhado, orçamento transparente e confirme a garantia oferecida para peças e reparos."],
  ["Quais são as opções de pagamento oferecidas?", "Fale com a nossa equipe para consultar as condições disponíveis para o seu serviço."],
];

const brands = ["brand-1.png", "brand-2.png", "brand-3.png", "brand-4.png", "brand-5.png", "brand-6.png"];
const serviceImages = ["iBhPxqyvR2R5JWcRe9ylvJSsbI.png", "KJT1aRtYMe0kv6uRevU1uyWgyE8.png", "V9IFbpXENfrcMHEKoMj36nTQjA.png", "service-diagnostic.png", "service-clutch.png", "service-transmission.png"];
const instagramImages = ["instagram-post-1.jpg", "instagram-post-2.jpg", "instagram-post-3.jpg"];
const heroTopics = [
  "Especialistas em câmbio automático com diagnóstico preciso.",
  "Leva e traz e guincho na Zona Oeste de São Paulo.",
  "Conserte seu câmbio em até 12x.",
];
const osascoGallery = [
  ["unidade-osasco-01.png", "Área principal de atendimento"],
  ["unidade-osasco-02.png", "Espaço técnico da unidade"],
  ["unidade-osasco-03.png", "Box de manutenção"],
  ["unidade-osasco-04.png", "Entrada e área interna"],
  ["unidade-osasco-06.png", "Pátio da nova unidade"],
  ["unidade-osasco-07.png", "Fachada da unidade em Osasco"],
];

function Logo({ light = false }) {
  return <a className="logo" href="#home" aria-label="Câmbiofix início"><img src={light ? "/assets/logo.svg" : "/assets/logo-light.svg"} alt="câmbiofix" /></a>;
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [service, setService] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [servicesPaused, setServicesPaused] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);
  const [heroTopic, setHeroTopic] = useState(0);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = reduceMotion || servicesPaused ? null : window.setInterval(() => {
      setService((current) => (current + 1) % services.length);
    }, 5500);
    return () => timer && window.clearInterval(timer);
  }, [servicesPaused]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      setHeroTopic((current) => (current + 1) % heroTopics.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = document.querySelectorAll("main > section:not(.hero), .hero-content, .dna-grid article, .post-card");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }
    elements.forEach((element) => element.classList.add("fade-up"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleQuoteSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Olá! Quero solicitar um orçamento para meu veículo.",
      `Nome: ${data.get("nome")}`,
      `Telefone: ${data.get("telefone")}`,
      `Modelo: ${data.get("modelo")}`,
      `Assunto: ${data.get("assunto")}`,
    ].join("\n");
    window.open(`${quoteWhatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <div className="site-shell">
      <header className={`${headerScrolled ? "site-header is-scrolled" : "site-header"}${menuOpen ? " menu-is-open" : ""}`}>
        <Logo light={!headerScrolled && !menuOpen} />
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Navegação principal">
          {[['home', 'Home'], ['aempresa', 'A Empresa'], ['servicos', 'Serviços'], ['contato', 'Contato']].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)}>{label}</button>
          ))}
        </nav>
        <div className="header-actions">
          <a className="button button-green" href={whatsapp} target="_blank" rel="noreferrer"><img className="whatsapp-icon" src="/assets/whatsapp.png" alt="" /> WhatsApp</a>
          <a className="button button-light" href="tel:5511968194802">Ligar: 11 96819-4802</a>
        </div>
        <button className="menu-toggle" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="hero-copy"><h1><span className={`hero-title-topic${heroTopics[heroTopic].length > 40 ? " is-long" : ""}`} key={heroTopics[heroTopic]}>{heroTopics[heroTopic]}</span></h1><p>Atendimento técnico, orçamento rápido e confiança para seu veículo.</p></div>
            <form className="quote-card" onSubmit={handleQuoteSubmit}>
              <label>Nome<input required name="nome" placeholder="Seu nome" /></label>
              <label>Telefone<input required name="telefone" placeholder="(DDD) 55555-5555" /></label>
              <label>Modelo do carro<input required name="modelo" placeholder="Modelo" /></label>
              <label>Assunto<input required name="assunto" placeholder="O que deseja orçar?" /></label>
              <button className="submit-button" type="submit">{submitted ? "Mensagem pronta!" : "Solicitar orçamento"}</button>
              {submitted && <p className="form-note">Agora é só falar com a equipe pelo WhatsApp.</p>}
            </form>
            <div className="hero-benefits"><div><b>⌾</b><span><strong>Diagnóstico preciso</strong><small>Equipamentos e tecnologia avançada</small></span></div><div><b>✦</b><span><strong>Equipe especializada</strong><small>Profissionais com experiência no mercado</small></span></div><div><b>◷</b><span><strong>Atendimento ágil</strong><small>Orçamento rápido e sem compromisso</small></span></div></div>
          </div>
        </section>

        <section className="brands-section"><h2>Marcas que trabalhamos</h2><div className="brand-row"><div className="brand-track">{[...brands, ...brands].map((brand, index) => <img key={`${brand}-${index}`} src={`/assets/${brand}`} alt="Marca atendida" />)}</div></div></section>

        <section id="aempresa" className="about section-light"><div className="section-kicker">A CÂMBIOFIX</div><div><h2>Há 10 anos no mercado</h2><p>Somos a referência em <strong>manutenção e conserto de transmissão automática</strong> em São Paulo e Litoral. Entendemos que problemas como <strong>trancos, marchas que não engatam, ruídos estranhos ou vazamento de fluido</strong> são uma grande preocupação. Por isso, nossa equipe utiliza tecnologia de ponta para um <strong>diagnóstico eletrônico preciso</strong>, identificando a real causa da falha no seu câmbio, seja ele automático convencional, <strong>CVT, DSG, Powershift ou automatizado</strong>. Oferecemos soluções completas, desde a <strong>troca de óleo com máquina</strong> até o reparo completo do sistema, sempre com transparência e a garantia que você precisa para voltar a dirigir com segurança e conforto.</p></div><img className="about-art" src="/assets/NyhfTZLEVX85FhcltSlhzV7uDY.jpg" alt="Camisa da equipe Câmbiofix" /></section>

        <section id="servicos" className="services section-dark" onMouseEnter={() => setServicesPaused(true)} onMouseLeave={() => setServicesPaused(false)} onFocusCapture={() => setServicesPaused(true)} onBlurCapture={() => setServicesPaused(false)}><div className="services-intro"><div><div className="section-kicker">SERVIÇOS</div><h2>O que fazemos<br />de melhor</h2></div><p className="services-description">Descubra nossos serviços de qualidade e eficiência para atender suas necessidades. Com opções variadas, garantimos sua satisfação em cada serviço realizado.</p></div><div className="service-copy"><div className="service-cards"><div className="service-track">{services.map((item, index) => <button key={item.title} className={index === service ? "service-card is-active" : "service-card"} onMouseEnter={() => setService(index)} onFocus={() => setService(index)} onClick={() => setService(index)} aria-pressed={index === service}><img src={`/assets/${serviceImages[index]}`} alt={item.title} /><span>{item.title}</span></button>)}</div></div></div></section>

        <section className="callout"><img className="callout-art" src="/assets/service-detail.png" alt="" /><div><h2>Confie na Câmbiofix<br />para cuidar do seu câmbio</h2><p>Entre em contato agora mesmo e agende o seu serviço!</p></div><a className="button button-red" href={whatsapp} target="_blank" rel="noreferrer">Agende uma conversa <span>↗</span></a></section>

        <section className="feature"><img src="/assets/quality-wordmark.png" alt="Câmbiofix em movimento" /></section>

        <section className="dna section-light"><div className="dna-head"><div className="section-kicker">DIFERENCIAIS</div><div><h2>Nosso DNA</h2><p>Aprimoramos nossos serviços para garantir qualidade, profissionais capacitados, atendimento ágil, garantia e excelência no reparo do seu veículo. Conte conosco!</p></div></div><div className="dna-grid">{[['Custo benefício','Traga seu orçamento para análise. Podemos negociar, fazemos o melhor preço.'],['Equipe','Conte com nossa equipe de profissionais altamente capacitados para atender diversos casos. Confie em nós.'],['Equipamentos e produtos','Utilização de produtos e equipamentos de qualidade, visando a conservação do seu veículo.'],['Diagnóstico Honesto','Nosso compromisso é com a transparência. Você saberá exatamente qual é o problema e qual a solução mais eficiente e econômica.'],['Garantia Total','Todos os nossos reparos e peças possuem garantia, proporcionando tranquilidade e confiança no nosso trabalho.'],['Especialização Comprovada','Nossa equipe vive e respira transmissão automática. Somos focados em resolver o seu problema de câmbio.']].map(([title, text], index) => <article key={title}><div className="dna-icon"><img src="/assets/dna-card.png" alt="" /></div><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

        <section className="quality"><div><div className="section-kicker">QUALIDADE QUE ENTREGA</div><h2>Invista na qualidade</h2><p>Confie em nossa equipe especializada para realizar a retífica do seu câmbio e garanta um desempenho impecável.</p></div><a className="button button-red" href={whatsapp} target="_blank" rel="noreferrer">Contratar agora <span>↗</span></a></section>

        <section className="social section-light"><div className="section-kicker">REDES SOCIAIS</div><h2>Siga a Câmbiofix no Instagram</h2><a className="instagram-link" href="https://www.instagram.com/cambiofixoficina/" target="_blank" rel="noreferrer">Instagram <span>↗</span></a><div className="post-grid">{['DObPLojjczX','DObO7N0jTjp','DObO3jSjWgx'].map((post, index) => <a key={post} className="post-card" href={`https://www.instagram.com/p/${post}/`} target="_blank" rel="noreferrer"><div className="post-art" style={{backgroundImage:`url('/assets/${instagramImages[index]}')`}} /><strong>cambiofixoficina</strong><small>{index + 3} curtidas · Ver mais no Instagram</small></a>)}</div><img className="instagram-art" src="/assets/contact-detail.png" alt="" /></section>

        <section className="osasco-gallery section-dark"><div className="section-kicker">NOVA UNIDADE</div><h2>Conheça a Câmbiofix Osasco</h2><p className="gallery-intro">Nossa nova unidade está pronta para atender você em Osasco, com estrutura completa para manutenção e reparo de transmissões.</p><div className="gallery-grid">{osascoGallery.map(([image, caption]) => <button type="button" className="gallery-card" key={image} onClick={() => setSelectedGalleryImage({ image, caption })}><img src={`/assets/osasco/${image}`} alt={`${caption} — nova unidade Câmbiofix Osasco`} /><span>{caption}</span></button>)}</div><p className="gallery-address">R. Antônio Alves Ribeiro, 1365 — Jardim Munhoz Junior — Osasco</p><a className="button button-red" href={osascoMapUrl} target="_blank" rel="noreferrer">Ver localização ↗</a></section>

        <section className="faq section-light"><div className="section-kicker">DÚVIDAS?</div><h2>Perguntas frequentes</h2><div className="faq-list">{faq.map(([question, answer], index) => <div className={openFaq === index ? "faq-item is-open" : "faq-item"} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><b>{openFaq === index ? "−" : "+"}</b></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></section>

        <section id="contato" className="contact"><div className="contact-main"><div className="section-kicker">CONTATO</div><h2>Agende uma visita<br />agora mesmo</h2><a href={whatsapp} target="_blank" rel="noreferrer"><strong>Contato:</strong><br /><span>11 96819-4802</span> ↗</a></div><div className="contact-details"><div><strong>Horário de funcionamento:</strong><p>Seg a Sex das 09h as 18h</p></div><div><strong>E-mail:</strong><p>contato@cambiofix.com.br</p></div><div><strong>Unidades:</strong><a href={mapUrl} target="_blank" rel="noreferrer">Av. Eng. Heitor Antônio Eiras Garcia, 3534 — Jardim Esmeralda ↗</a><a href={osascoMapUrl} target="_blank" rel="noreferrer">R. Antônio Alves Ribeiro, 1365 — Jardim Munhoz Junior — Osasco ↗</a></div></div></section>
      </main>
      <footer><Logo light /><div><button onClick={() => scrollTo('home')}>Home</button><button onClick={() => scrollTo('aempresa')}>A Empresa</button><button onClick={() => scrollTo('servicos')}>Serviços</button><button onClick={() => scrollTo('contato')}>Contato</button></div><a className="haus-logo" href="https://haus.art.br" target="_blank" rel="noreferrer">Desenvolvido por: haus.art.br</a><span>© Câmbiofix 2025</span></footer>
      {selectedGalleryImage && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={selectedGalleryImage.caption} onClick={() => setSelectedGalleryImage(null)}><button type="button" className="gallery-close" aria-label="Fechar imagem" onClick={() => setSelectedGalleryImage(null)}>×</button><img src={`/assets/osasco/${selectedGalleryImage.image}`} alt={`${selectedGalleryImage.caption} — nova unidade Câmbiofix Osasco`} onClick={(event) => event.stopPropagation()} /><p>{selectedGalleryImage.caption} · Nova unidade Osasco</p></div>}
    </div>
  );
}
