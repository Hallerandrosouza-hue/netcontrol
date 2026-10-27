(function () {
  const WA = 'https://wa.me/5589994002815';
  const DEFAULT_MSG = 'Olá! Gostaria de saber mais sobre os cursos da Net Control Informática.';
  const WA_DEFAULT = WA + '?text=' + encodeURIComponent(DEFAULT_MSG);
  const IG = 'https://www.instagram.com/netcontroloficial/';
  const page = document.body.dataset.page || '';

  const links = [
    ['index.html', 'Início', 'home'],
    ['cursos.html', 'Cursos (+200)', 'cursos'],
    ['index.html#diferenciais', 'Diferenciais', 'diferenciais'],
    ['index.html#aprendiz', 'Aluno Aprendiz', 'aprendiz'],
    ['resultados.html', 'Resultados & Formaturas', 'resultados'],
    ['indique.html', 'Indique e Ganhe', 'indique'],
    ['index.html#faq', 'Dúvidas / FAQ', 'faq'],
    ['contato.html', 'Contato', 'contato']
  ];

  const logoHTML = `
    <a href="index.html" class="logo" aria-label="Net Control Informática - Início">
      <img src="assets/img/emblema-27.png" alt="Net Control 27 Anos" class="logo-emblem" width="48" height="48">
      <span class="logo-text">Net Control<small>INFORMÁTICA · 27 ANOS</small></span>
    </a>
  `;

  window.NC = { WA, WA_DEFAULT, DEFAULT_MSG, IG };

  // Helper for generating WA links with specific messages
  window.NC.getWaLink = (msg) => WA + '?text=' + encodeURIComponent(msg || DEFAULT_MSG);

  // If header is missing from static HTML, inject as fallback
  if (!document.getElementById('siteHeader')) {
    const headerHTML = `
      <a class="skip" href="#main">Ir para o conteúdo principal</a>
      <header id="siteHeader">
        <div class="container nav">
          ${logoHTML}
          <button class="burger" id="burgerBtn" aria-label="Abrir menu de navegação" aria-expanded="false">☰</button>
          <nav class="menu" id="primaryMenu" aria-label="Menu principal">
            ${links.map(l => `<a href="${l[0]}" class="${l[2] === page ? 'active' : ''}">${l[1]}</a>`).join('')}
            <div class="header-cta">
              <a class="btn btn-primary btn-sm" href="${WA_DEFAULT}" target="_blank" rel="noopener">Matrícula pelo WhatsApp</a>
            </div>
          </nav>
        </div>
      </header>
    `;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }

  const mainEl = document.querySelector('main') || document.querySelector('section');
  if (mainEl && !document.getElementById('main')) mainEl.id = 'main';

  // If footer is missing from static HTML, inject as fallback
  if (!document.getElementById('siteFooter')) {
    const footerHTML = `
      <footer id="siteFooter">
        <div class="container">
          <div class="foot-grid">
            <div class="foot-brand">
              ${logoHTML}
              <p><strong>“Desde o século passado capacitando pessoas.”</strong><br>
              Fundada em 1999, a Net Control Informática une 27 anos de credibilidade comprovada ao que há de mais inovador em Inteligência Artificial, programação, dados e tecnologia no Piauí, Bahia e Maranhão.</p>
              <div class="foot-social">
                <a href="${IG}" target="_blank" rel="noopener">📸 Siga no Instagram</a>
                <a href="${WA_DEFAULT}" target="_blank" rel="noopener">💬 Fale no WhatsApp</a>
              </div>
            </div>
            <div>
              <h4>Navegação Rápida</h4>
              <ul>
                ${links.map(l => `<li><a href="${l[0]}">${l[1]}</a></li>`).join('')}
              </ul>
            </div>
            <div>
              <h4>Áreas de Formação</h4>
              <ul>
                <li><a href="cursos.html#essencial">Informática & Tecnologia (28 cursos)</a></li>
                <li><a href="cursos.html#excel">Excel, Dados & Power BI (24 cursos)</a></li>
                <li><a href="cursos.html#design">Design & Criação Digital (26 cursos)</a></li>
                <li><a href="cursos.html#programacao">Web, Programação & Python (32 cursos)</a></li>
                <li><a href="cursos.html#ia">Inteligência Artificial (18 cursos)</a></li>
                <li><a href="cursos.html#administracao">Gestão & Administração (35 cursos)</a></li>
                <li><a href="cursos.html">Ver catálogo completo (+200 cursos) →</a></li>
              </ul>
            </div>
            <div>
              <h4>Central de Atendimento</h4>
              <ul>
                <li><strong>WhatsApp Oficial:</strong><br><a href="${WA_DEFAULT}" target="_blank" rel="noopener">(89) 99400-2815</a></li>
                <li><strong>Instagram:</strong><br><a href="${IG}" target="_blank" rel="noopener">@netcontroloficial</a></li>
                <li><strong>Horário de Aulas & Atendimento:</strong><br>Segunda a Sexta: 08h às 21h<br>Sábado: 08h às 12h</li>
                <li><strong>Presença Regional:</strong><br>Piauí (PI) · Bahia (BA) · Maranhão (MA)</li>
              </ul>
            </div>
          </div>
          <div class="copy">
            © ${new Date().getFullYear()} Net Control Informática. Todos os direitos reservados. Desde 1999 capacitando pessoas com excelência.
          </div>
        </div>
      </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  // Floating WhatsApp Widget with Speech Balloon
  if (!document.getElementById('waWidget')) {
    const waWidgetHTML = `
      <div class="wa-widget" id="waWidget">
        <div class="wa-bubble show" id="waBubble">
          <button class="wa-bubble-close" id="waClose" aria-label="Fechar balão de atendimento">&times;</button>
          <div class="wa-bubble-header">
            <span class="wa-status-dot"></span>
            <strong>Net Control Informática</strong>
            <span class="wa-badge">Online</span>
          </div>
          <p>👋 Olá! Precisa de ajuda para escolher seu curso ou garantir sua vaga? Fale com nossa equipe agora mesmo!</p>
          <a href="${WA_DEFAULT}" target="_blank" rel="noopener" class="wa-bubble-btn">
            Iniciar conversa no WhatsApp
          </a>
        </div>
        <a class="wa-float" href="${WA_DEFAULT}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp com a Net Control">
          <span class="wa-pulse"></span>
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M16 3C9 3 3.4 8.6 3.4 15.5c0 2.3.6 4.4 1.7 6.3L3 29l7.4-1.9c1.8 1 3.7 1.5 5.6 1.5 7 0 12.6-5.6 12.6-12.5S23 3 16 3zm0 22.9c-1.8 0-3.5-.5-5-1.4l-.4-.2-4.4 1.1 1.2-4.3-.3-.4a10.3 10.3 0 0 1-1.6-5.6C5.5 9.8 10.2 5.2 16 5.2s10.5 4.6 10.5 10.3S21.8 25.9 16 25.9zm5.7-7.7c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.5 8.5 0 0 1-4.2-3.7c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 1.8.8 2.5.9 3.4.7.6-.1 1.9-.8 2.1-1.5s.3-1.4.2-1.5c-.1-.1-.3-.2-.6-.4z"/>
          </svg>
        </a>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', waWidgetHTML);
  }

  // Lightbox Modal for Photo Galleries
  if (!document.querySelector('.lightbox')) {
    const lightboxHTML = `
      <div class="lightbox" role="dialog" aria-label="Imagem ampliada" aria-hidden="true">
        <button class="lb-x" aria-label="Fechar">×</button>
        <button class="lb-prev" aria-label="Anterior">‹</button>
        <img alt="Foto ampliada">
        <button class="lb-next" aria-label="Próxima">›</button>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
  }

  // Mobile Menu Toggle
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  if (burger && menu) {
    burger.onclick = () => {
      const open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    menu.addEventListener('click', e => {
      if (e.target.tagName === 'A') {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Header scroll shadow
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // WhatsApp Bubble Controls
  const waBubble = document.getElementById('waBubble');
  const waClose = document.getElementById('waClose');
  if (waClose && waBubble) {
    waClose.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      waBubble.classList.remove('show');
      sessionStorage.setItem('nc_wa_closed', '1');
    });

    if (sessionStorage.getItem('nc_wa_closed') === '1') {
      waBubble.classList.remove('show');
    }
  }

  // Bind conversion links and fallback WhatsApp URLs
  window.NC.bind = (root = document) => {
    root.querySelectorAll('[data-wa]').forEach(a => {
      const text = a.dataset.wa;
      const targetUrl = text && text !== '1'
        ? WA + '?text=' + encodeURIComponent(text)
        : WA_DEFAULT;
      if (!a.getAttribute('href') || a.getAttribute('href') === '#' || a.getAttribute('href') === '') {
        a.href = targetUrl;
      }
      a.target = '_blank';
      a.rel = 'noopener';
    });

    root.querySelectorAll('[data-ig]').forEach(a => {
      if (!a.getAttribute('href') || a.getAttribute('href') === '#' || a.getAttribute('href') === '') {
        a.href = IG;
      }
      a.target = '_blank';
      a.rel = 'noopener';
    });

    // Ensure all anchor tags have href
    root.querySelectorAll('a:not([href])').forEach(a => {
      a.href = WA_DEFAULT;
      a.target = '_blank';
      a.rel = 'noopener';
    });

    root.querySelectorAll('.reveal:not(.show)').forEach(el => io.observe(el));

    root.querySelectorAll('img[data-initials]').forEach(img => {
      const fallback = () => {
        const ph = document.createElement('div');
        ph.className = 'photo-ph';
        ph.style.cssText = 'aspect-ratio:4/5;display:grid;place-items:center;background:#E2E8F0;color:#0A192F;font-weight:800;font-size:2.5rem;border-radius:14px;';
        ph.innerHTML = '<span>' + (img.dataset.initials || 'NC') + '</span>';
        img.replaceWith(ph);
      };
      img.addEventListener('error', fallback);
      if (img.complete && !img.naturalWidth) fallback();
    });
  };

  // Scroll Reveal Observer
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Number Counter Animation: starts from 0 up to target if JS is active
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      countObserver.unobserve(entry.target);
      const el = entry.target;
      const target = +el.dataset.count;
      if (isNaN(target)) return;
      const prefix = el.dataset.pre || '';
      const suffix = el.dataset.suf || '';
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 45));
      const interval = setInterval(() => {
        current = Math.min(target, current + step);
        el.textContent = prefix + current.toLocaleString('pt-BR') + suffix;
        if (current >= target) clearInterval(interval);
      }, 30);
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

  // Gallery Population from media.js if container is empty
  document.querySelectorAll('[data-media]').forEach(gallery => {
    // Only populate if container has no child items
    if (gallery.children.length === 0) {
      const key = gallery.dataset.media;
      const list = (window.MEDIA && MEDIA[key]) || [];
      const limit = +gallery.dataset.limit || list.length;
      const start = +gallery.dataset.start || 0;
      gallery.innerHTML = list.slice(start, start + limit).map((src, i) => `
        <figure class="item reveal">
          <img src="${src}" alt="${gallery.dataset.alt || 'Foto Net Control'} - Registro ${i + 1}" loading="lazy">
        </figure>
      `).join('');
    }
  });

  // Lightbox Modal
  const lb = document.querySelector('.lightbox');
  if (lb) {
    const lbImg = lb.querySelector('img');
    let imgSet = [], activeIndex = 0;

    const setImg = (index) => {
      activeIndex = (index + imgSet.length) % imgSet.length;
      lbImg.src = imgSet[activeIndex].src;
      lbImg.alt = imgSet[activeIndex].alt;
    };

    document.addEventListener('click', e => {
      const trigger = e.target.closest('.gallery .item img, .zoom img, .journey-photos-grid .item img, .sim-photos-row .item img');
      if (trigger) {
        const group = trigger.closest('.gallery, .zoom-group, .journey-photos-grid, .sim-photos-row');
        imgSet = group ? [...group.querySelectorAll('img')] : [trigger];
        setImg(imgSet.indexOf(trigger));
        lb.classList.add('open');
        lb.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        return;
      }
      if (e.target.closest('.lb-prev')) { setImg(activeIndex - 1); return; }
      if (e.target.closest('.lb-next')) { setImg(activeIndex + 1); return; }
      if (lb.classList.contains('open') && (e.target === lb || e.target.closest('.lb-x'))) {
        lb.classList.remove('open');
        lb.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });

    window.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
      if (e.key === 'ArrowRight') setImg(activeIndex + 1);
      if (e.key === 'ArrowLeft') setImg(activeIndex - 1);
    });
  }

  // FAQ Accordion
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  // Contact Form Submission to WhatsApp
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(contactForm);
      const text = `Olá! Gostaria de informações sobre os cursos da Net Control Informática.\n\n` +
        `*Nome:* ${fd.get('nome') || '-'}\n` +
        `*WhatsApp:* ${fd.get('tel') || '-'}\n` +
        `*E-mail:* ${fd.get('email') || '-'}\n` +
        `*Curso de interesse:* ${fd.get('curso') || '-'}\n` +
        `*Cidade/Estado:* ${fd.get('cidade') || '-'}\n` +
        `*Mensagem:* ${fd.get('msg') || '-'}`;
      window.open(WA + '?text=' + encodeURIComponent(text), '_blank');
    });
  }

  // Indique e Ganhe Form Submission to WhatsApp
  const indiqueForm = document.getElementById('indique-form');
  if (indiqueForm) {
    indiqueForm.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(indiqueForm);
      const text = `🤝 *NOVA INDICAÇÃO DE ALUNO - NET CONTROL*\n\n` +
        `*Meu Nome (Indicador):* ${fd.get('indicador_nome') || '-'}\n` +
        `*Meu WhatsApp (PIX):* ${fd.get('indicador_tel') || '-'}\n` +
        `*Minha Cidade:* ${fd.get('indicador_cidade') || '-'}\n\n` +
        `📌 *Dados do Amigo Indicado:*\n` +
        `*Nome do Amigo:* ${fd.get('amigo_nome') || '-'}\n` +
        `*WhatsApp do Amigo:* ${fd.get('amigo_tel') || '-'}\n` +
        `*Curso de Interesse:* ${fd.get('amigo_curso') || 'A definir com a equipe'}\n` +
        `*Cidade do Amigo:* ${fd.get('amigo_cidade') || '-'}\n\n` +
        `Por favor, entrem em contato com ele para fechar a matrícula!`;
      window.open(WA + '?text=' + encodeURIComponent(text), '_blank');
    });
  }

  // Hero Quick Finder form redirect
  const heroFinder = document.getElementById('heroFinderForm');
  if (heroFinder) {
    heroFinder.addEventListener('submit', e => {
      e.preventDefault();
      const query = (heroFinder.querySelector('#finderQuery') || {}).value || '';
      const cat = (heroFinder.querySelector('#finderCategory') || {}).value || '';
      let url = 'cursos.html';
      const params = [];
      if (query.trim()) params.push('q=' + encodeURIComponent(query.trim()));
      if (cat && cat !== 'todos' && cat !== '') params.push('cat=' + encodeURIComponent(cat));
      if (params.length) url += '?' + params.join('&');
      window.location.href = url;
    });
  }

  NC.bind();
})();
