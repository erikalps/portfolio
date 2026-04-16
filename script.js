
const skillsData = {
  cpp: {
    title: 'C++ & Lógica de Programação',
    hasProject: true,
    projectLabel: 'ver simulador de empréstimos',
    projectUrl: 'https://erikalps.github.io/simulador_de_emprestimos/',
    text: 'Minha linguagem principal. Resolvi mais de 300 problemas com foco em algoritmos, estruturas de dados e lógica de programação. É a base que sustenta todo o meu raciocínio computacional.'
  },
  html: {
    title: 'HTML & CSS',
    hasProject: true,
    projectLabel: 'ver Lucky Shrub',
    projectUrl: 'https://erikalps.github.io/Projeto-curseira-/',
    text: 'Domínio em marcação semântica e estilização responsiva. Certificado pelo freeCodeCamp. Desenvolvi múltiplos projetos práticos com layouts responsivos e boas práticas de acessibilidade.'
  },
  js: {
    title: 'JavaScript',
    hasProject: true,
    projectLabel: 'ver Favorite movies',
    projectUrl: 'https://github.com/erikalps/favorites_movies',
    text: 'Em desenvolvimento ativo. Já utilizo para consumo de APIs externas, manipulação do DOM e lógica client-side. Atualmente aprofundando meus conhecimentos em um curso dedicado.'
  },
  sql: {
    title: 'SQL / MySQL',
    hasProject: false,
    text: 'Curso completo com MySQL Workbench concluído. Sei criar, consultar, filtrar e manipular dados com SQL. Desenvolvi projetos acadêmicos completos, da modelagem entidade-relacionamento até a implementação física do banco.'
  },
  python: {
    title: 'Python',
    hasProject: true,
    projectLabel: 'ver repositório no gitHub',
    projectUrl: 'https://github.com/erikalps/Click_Rush',
    text: 'Conhecimento básico adquirido por meio de disciplinas acadêmicas. Exploro a linguagem principalmente através de projetos práticos. Um dos mais recentes é o Click Rush, desenvolvido em Python utilizando a biblioteca Pygame, uma demo de jogo simples criada para consolidar e aplicar conceitos aprendidos. básico adquirido em disciplinas acadêmicas. Exploro a linguagem para automação de tarefas e scripts simples, e pretendo aprofundar em análise de dados futuramente.'
  },
  java: {
    title: 'Java',
    hasProject: false,
    text: 'Introdução à linguagem via disciplinas da faculdade de ADS, projetos acadêmicos. Base em orientação aIntrodução à linguagem por meio de disciplinas da faculdade de ADS e desenvolvimento de projetos acadêmicos. Possuo base em orientação a objetos, sintaxe e lógica da JVM. A linguagem é aplicada na construção de projetos práticos durante a graduação. objetos, sintaxe e lógica da JVM. Linguagem utilizada em projetos acadêmicos práticos.'
  },
  git: {
    title: 'Git & GitHub',
    hasProject: true,
    projectLabel: 'ver meu github',
    projectUrl: 'https://github.com/erikalps',
    text: 'Uso Git para controle de versão em todos os meus projetos. Trabalho com commits, branches e pull requests. Todos os meus projetos são hospedados e publicados via GitHub Pages.'
  },
  bd: {
    title: 'Modelagem de Banco de Dados',
    hasProject: false,
    text: 'Experiência em modelagem entidade-relacionamento, normalização de tabelas (1FN, 2FN, 3FN) e implementação física em MySQL. Aplicado em projetos completos desenvolvidos na faculdade de ADS.'
  }, 
  react:{
    title: 'React',
    hasProject: true,
    projectLabel:'ver simulador de Emprestimos',
    projectUrl:'https://erikalps.github.io/simulador_de_emprestimos/',
    text:'Boas noções de React, de React, aplicados em alguns projetos práticos com o objetivo de consolidar os conceitos aprendidos no curso que estou realizando na Hora de Codar, que aborda os fundamentos da biblioteca.'
  }, 
  vue:{
    title:'Vuejs',
    hasProject: false,
    text:'Possuo boas noções de Vue.js, adquiridas por meio de um curso online sobre suas principais funcionalidades. Também desenvolvi um projeto prático para consolidar o aprendizado e aplicar os conceitos na prática.'
  }

};

/* ---------- SKILL CARDS ---------- */
let activeSkill = null;

const panel = document.getElementById('skill-detail-panel');
const cards = document.querySelectorAll('.skill-card[data-skill]');

function renderPanel(skillKey) {
  const d = skillsData[skillKey];
  if (!d) return;

  panel.innerHTML = `
    <div class="sdp-header">
      <span class="sdp-title">${d.title}</span>
      ${d.hasProject
        ? `<span class="sdp-badge"><i class="bi bi-check-circle"></i> projeto disponível</span>`
        : `<span class="sdp-no-badge">// sem projeto ainda</span>`
      }
      <button class="sdp-close" aria-label="Fechar detalhes">&#x2715;</button>
    </div>
    <p class="sdp-text">${d.text}</p>
    ${d.hasProject
      ? `<a href="${d.projectUrl}" target="_blank" rel="noopener noreferrer" class="sdp-link">
           <i class="bi bi-box-arrow-up-right"></i> ${d.projectLabel}
         </a>`
      : ''
    }
  `;

  panel.querySelector('.sdp-close').addEventListener('click', closePanel);
}

function closePanel() {
  panel.innerHTML = '';
  cards.forEach(c => c.classList.remove('active'));
  activeSkill = null;
}

cards.forEach(card => {
  card.addEventListener('click', () => {
    const key = card.dataset.skill;

    if (activeSkill === key) {
      closePanel();
      return;
    }

    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    activeSkill = key;
    renderPanel(key);

    // Scroll suave ao painel em mobile
    if (window.innerWidth < 700) {
      setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
    }
  });
});

/* ---------- SCROLL-IN OBSERVER ---------- */
const animEls = document.querySelectorAll('.skill-card, .proj-card, .stat-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger por índice entre os irmãos visíveis
      const siblings = [...entry.target.parentElement.children];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animEls.forEach(el => observer.observe(el));

/* ---------- NAV LINK ATIVO ---------- */
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));