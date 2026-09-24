/**
 * ==========================================================================
 * SPA ROUTER & DOM CONTROLLER — Instituto Raízes
 * ==========================================================================
 * Arquitetura reativa, interativa e com retenção de dados local:
 * 1. Mapeamento de rotas e templates das visões (Início, Projetos, Cadastro).
 * 2. Event Delegation para âncoras SPA e elementos dinâmicos (ex: botão Pix).
 * 3. Menu Mobile acessível com eventos de clique e alternância de classes/ARIA.
 * 4. Rotinas de verificação de consistência e injeção condicional de notificações.
 * 5. Retenção de dados no cliente via localStorage (JSON.stringify / JSON.parse).
 * 6. Recuperação e restauração da interface no carregamento inicial da página.
 * 7. Sincronização com o histórico do navegador (popstate e hashchange).
 * ==========================================================================
 */

// ---------------------------------------------------------------------------
// 1. DEFINIÇÃO DAS ROTAS E TEMPLATES
// ---------------------------------------------------------------------------
const routes = {
  index: {
    title: 'Instituto Raízes — Reflorestamento e educação ambiental',
    className: '',
    navKey: 'index',
    template: `
      <section class="hero" aria-labelledby="hero-titulo">
        <div class="hero-texto">
          <h1 id="hero-titulo">Recuperar a terra, uma muda de cada vez</h1>
          <p>Desde 2011, plantamos florestas nativas e formamos comunidades para cuidar da própria água, do próprio solo e do próprio futuro.</p>
          <a class="botao" href="#contato">Fale com a gente</a>
        </div>
        <img
          src="https://picsum.photos/seed/raizes-plantio/800/600"
          alt="Voluntários plantando mudas de árvores nativas em uma encosta reflorestada"
          width="800" height="600" loading="eager">
      </section>

      <section id="sobre" aria-labelledby="sobre-titulo">
        <h2 id="sobre-titulo">Quem somos</h2>
        <div class="sobre-grade">
          <img
            src="https://picsum.photos/seed/raizes-equipe/700/560"
            alt="Equipe do Instituto Raízes reunida em roda durante oficina de educação ambiental"
            width="700" height="560" loading="lazy">
          <div class="sobre-texto">
            <p>O Instituto Raízes é uma organização sem fins lucrativos que atua na Mata Atlântica paulista, recuperando áreas degradadas por meio de plantio de espécies nativas e formação de agentes ambientais comunitários.</p>
            <p>Hoje somos uma rede de mais de 40 voluntários fixos e parcerias com 12 escolas públicas da região metropolitana de São Paulo.</p>
          </div>
        </div>
      </section>

      <section id="atuacao" aria-labelledby="atuacao-titulo">
        <h2 id="atuacao-titulo">Como atuamos</h2>
        <p>Três frentes de trabalho sustentam o que fazemos todos os dias.</p>
        <div class="numeros">
          <article>
            <p class="numero">18.400</p>
            <h3>Mudas nativas plantadas</h3>
          </article>
          <article>
            <p class="numero">12</p>
            <h3>Escolas parceiras em educação ambiental</h3>
          </article>
          <article>
            <p class="numero">6</p>
            <h3>Microbacias em recuperação</h3>
          </article>
        </div>
      </section>

      <section id="contato" aria-labelledby="contato-titulo">
        <h2 id="contato-titulo">Fale com o Instituto Raízes</h2>
        <div class="contato-grade">
          <address>
            <p>
              <strong>Endereço</strong>
              Rua das Sementes, 245 — Vila Madalena<br>
              São Paulo — SP, 05433-000
            </p>
            <p>
              <strong>Telefone</strong>
              <a href="tel:+551130405060">(11) 3040-5060</a>
            </p>
            <p>
              <strong>E-mail</strong>
              <a href="mailto:contato@institutoraizes.org.br">contato@institutoraizes.org.br</a>
            </p>
            <p>
              <strong>Redes sociais</strong>
              <a href="https://instagram.com/institutoraizes">Instagram</a> ·
              <a href="https://facebook.com/institutoraizes">Facebook</a>
            </p>
          </address>

          <form id="form-contato" aria-label="Formulário de contato" novalidate>
            <div id="feedback-contato" aria-live="polite"></div>
            <div class="campo">
              <label for="nome">Nome</label>
              <input type="text" id="nome" name="nome" placeholder="Seu nome completo" required minlength="3">
            </div>
            <div class="campo">
              <label for="email">E-mail</label>
              <input type="email" id="email" name="email" placeholder="seu@email.com" required>
            </div>
            <div class="campo">
              <label for="mensagem">Mensagem</label>
              <textarea id="mensagem" name="mensagem" rows="4" placeholder="Como podemos ajudar?" required minlength="5"></textarea>
            </div>
            <button type="submit" class="botao">Enviar mensagem</button>
          </form>
        </div>
      </section>
    `
  },

  projetos: {
    title: 'Projetos, voluntariado e doações — Instituto Raízes',
    className: '',
    navKey: 'projetos',
    template: `
      <section class="hero-projetos" aria-labelledby="hero-titulo">
        <h1 id="hero-titulo">Nossas frentes de atuação</h1>
        <p>Conheça onde investimos nosso trabalho, como você pode se tornar voluntário e de que forma cada doação sustenta esses projetos.</p>
      </section>

      <section id="frentes" aria-labelledby="frentes-titulo">
        <h2 id="frentes-titulo">Onde atuamos</h2>
        <div class="frentes-grade">
          <article>
            <img src="https://picsum.photos/seed/raizes-mudas/400/280" alt="Fileiras de mudas nativas em viveiro comunitário" width="400" height="280" loading="lazy">
            <h3>Reflorestamento</h3>
            <p>Plantio de espécies nativas em áreas degradadas da Mata Atlântica, com acompanhamento técnico por três anos após o plantio.</p>
          </article>
          <article>
            <img src="https://picsum.photos/seed/raizes-educacao/400/280" alt="Crianças participando de oficina de educação ambiental ao ar livre" width="400" height="280" loading="lazy">
            <h3>Educação ambiental</h3>
            <p>Oficinas em escolas públicas sobre solo, água e biodiversidade, formando agentes ambientais mirins.</p>
          </article>
          <article>
            <img src="https://picsum.photos/seed/raizes-agua/400/280" alt="Nascente de rio protegida por vegetação nativa recém-plantada" width="400" height="280" loading="lazy">
            <h3>Recuperação de microbacias</h3>
            <p>Proteção de nascentes e matas ciliares para garantir água de qualidade às comunidades vizinhas.</p>
          </article>
        </div>
      </section>

      <section id="voluntariado" aria-labelledby="voluntariado-titulo">
        <h2 id="voluntariado-titulo">Como ser voluntário</h2>
        <p>Não é preciso experiência prévia — cada frente tem uma trilha de formação própria antes do primeiro mutirão.</p>

        <h3>Frentes de voluntariado</h3>
        <div class="vagas-grade">
          <article>
            <h4>Mutirão de plantio</h4>
            <p>Apoio direto no plantio e manutenção das mudas.</p>
            <dl>
              <dt>Dedicação</dt>
              <dd>Sábados pela manhã, quinzenal</dd>
              <dt>Pré-requisitos</dt>
              <dd>Nenhum</dd>
            </dl>
          </article>
          <article>
            <h4>Educador ambiental</h4>
            <p>Conduz oficinas nas escolas parceiras.</p>
            <dl>
              <dt>Dedicação</dt>
              <dd>4h semanais, em horário escolar</dd>
              <dt>Pré-requisitos</dt>
              <dd>Formação em licenciatura ou pedagogia</dd>
            </dl>
          </article>
          <article>
            <h4>Apoio administrativo</h4>
            <p>Organização de doações, comunicação e captação de recursos.</p>
            <dl>
              <dt>Dedicação</dt>
              <dd>Remoto, carga horária flexível</dd>
              <dt>Pré-requisitos</dt>
              <dd>Nenhum</dd>
            </dl>
          </article>
        </div>

        <h3>Como se inscrever</h3>
        <ol class="passos">
          <li>Preencha o formulário de interesse na página de contato.</li>
          <li>Participe de uma roda de acolhimento (online, 40 minutos).</li>
          <li>Escolha a frente de atuação que combina com sua disponibilidade.</li>
          <li>Participe do seu primeiro mutirão como experimentação.</li>
        </ol>

        <h3>Perguntas frequentes</h3>
        <details>
          <summary>Preciso de experiência prévia?</summary>
          <p>Não. Toda formação necessária é oferecida antes do primeiro mutirão.</p>
        </details>
        <details>
          <summary>Qual a idade mínima para participar?</summary>
          <p>16 anos, acompanhado de responsável até os 18.</p>
        </details>
        <details>
          <summary>Posso participar apenas uma vez?</summary>
          <p>Sim, mutirões pontuais são bem-vindos, embora a formação de vínculo ajude o projeto a planejar melhor as atividades.</p>
        </details>
      </section>

      <section id="doacoes" aria-labelledby="doacoes-titulo">
        <h2 id="doacoes-titulo">Como funcionam as doações</h2>
        <p>Publicamos balanço financeiro trimestral e cada doação recorrente recebe um relatório anual de impacto por e-mail.</p>

        <h3>Formas de doação</h3>
        <div class="doacoes-grade">
          <article>
            <h4>Doação única</h4>
            <p>Contribuição pontual via Pix, cartão ou boleto, sem compromisso de recorrência.</p>
            <button type="button" class="botao btn-copiar-pix" data-pix="contato@institutoraizes.org.br" style="margin-top: 1rem; font-size: var(--text-small);">Copiar Chave Pix</button>
          </article>
          <article>
            <h4>Doação recorrente</h4>
            <p>Valor mensal fixo, cancelável a qualquer momento, que sustenta o custeio contínuo dos viveiros.</p>
            <a class="botao" href="#contato" style="margin-top: 1rem; font-size: var(--text-small);">Seja Mantenedor</a>
          </article>
          <article>
            <h4>Doação de insumos</h4>
            <p>Doação de mudas, ferramentas ou material didático diretamente às equipes de campo.</p>
            <a class="botao" href="#contato" style="margin-top: 1rem; font-size: var(--text-small);">Doar Insumos</a>
          </article>
        </div>

        <h3>Para onde vai cada real</h3>
        <table>
          <caption>Destinação média dos recursos arrecadados em 2025</caption>
          <thead>
            <tr>
              <th scope="col">Categoria</th>
              <th scope="col">Percentual</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Mudas e insumos de plantio</td><td>52%</td></tr>
            <tr><td>Educação ambiental nas escolas</td><td>26%</td></tr>
            <tr><td>Manutenção da equipe técnica</td><td>16%</td></tr>
            <tr><td>Administração e transparência</td><td>6%</td></tr>
          </tbody>
        </table>

        <a class="botao" href="#contato">Quero doar agora</a>
      </section>
    `
  },

  cadastro: {
    title: 'Cadastro de voluntário ou doador — Instituto Raízes',
    className: 'pagina-formulario',
    navKey: 'cadastro',
    template: `
      <h1>Cadastro de voluntário ou doador</h1>
      <p>Preencha seus dados abaixo. Depois do envio, nossa equipe entra em contato para os próximos passos, de acordo com a frente de participação escolhida.</p>

      <div id="aviso-rascunho" style="display: none; background: var(--color-neutral-050); border-left: 4px solid var(--color-secondary-600); padding: 0.75rem 1rem; margin-bottom: 1.5rem; font-size: var(--text-small); border-radius: var(--radius-sm);">
        ℹ️ <strong>Rascunho recuperado:</strong> Seus dados previamente digitados foram restaurados do armazenamento local.
      </div>

      <form id="form-cadastro" action="#" method="post" novalidate>
        <div id="feedback-cadastro" aria-live="polite"></div>

        <fieldset>
          <legend>Dados pessoais</legend>

          <div class="campo">
            <label for="nome">Nome completo</label>
            <input type="text" id="nome" name="nome" autocomplete="name" minlength="3" placeholder="Seu nome completo" required>
          </div>

          <div class="linha">
            <div class="campo">
              <label for="cpf">CPF</label>
              <input type="text" id="cpf" name="cpf" inputmode="numeric"
                     pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" maxlength="14"
                     placeholder="000.000.000-00"
                     title="Digite o CPF no formato 000.000.000-00"
                     autocomplete="off" aria-describedby="cpf-dica" required>
              <span class="dica" id="cpf-dica">Formato: 000.000.000-00</span>
            </div>
            <div class="campo">
              <label for="nascimento">Data de nascimento</label>
              <input type="date" id="nascimento" name="nascimento" autocomplete="bday"
                     max="2010-09-11" aria-describedby="nascimento-dica" required>
              <span class="dica" id="nascimento-dica">Idade mínima: 16 anos</span>
            </div>
          </div>

          <div class="linha">
            <div class="campo">
              <label for="email">E-mail</label>
              <input type="email" id="email" name="email" autocomplete="email" placeholder="seu@email.com" required>
            </div>
            <div class="campo">
              <label for="telefone">Telefone</label>
              <input type="tel" id="telefone" name="telefone" inputmode="tel"
                     pattern="\\(\\d{2}\\) \\d{4,5}-\\d{4}" placeholder="(11) 91234-5678"
                     title="Digite o telefone no formato (11) 91234-5678"
                     autocomplete="tel" aria-describedby="telefone-dica">
              <span class="dica" id="telefone-dica">Formato: (DD) 90000-0000</span>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Endereço</legend>

          <div class="linha">
            <div class="campo">
              <label for="cep">CEP</label>
              <input type="text" id="cep" name="cep" inputmode="numeric"
                     pattern="\\d{5}-?\\d{3}" placeholder="00000-000"
                     title="Digite o CEP no formato 00000-000"
                     autocomplete="postal-code" aria-describedby="cep-dica" required>
              <span class="dica" id="cep-dica">Formato: 00000-000</span>
            </div>
            <div class="campo">
              <label for="estado">Estado</label>
              <select id="estado" name="estado" autocomplete="address-level1" required>
                <option value="">Selecione</option>
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="MG">Minas Gerais</option>
                <option value="PR">Paraná</option>
                <option value="SC">Santa Catarina</option>
                <option value="outro">Outro</option>
              </select>
            </div>
          </div>

          <div class="campo">
            <label for="endereco">Endereço (rua e número)</label>
            <input type="text" id="endereco" name="endereco" autocomplete="street-address" placeholder="Ex: Rua das Flores, 123" required>
          </div>

          <div class="campo">
            <label for="cidade">Cidade</label>
            <input type="text" id="cidade" name="cidade" autocomplete="address-level2" placeholder="Sua cidade" required>
          </div>
        </fieldset>

        <fieldset>
          <legend>Como você quer participar</legend>

          <div class="opcao">
            <input type="radio" id="tipo-voluntario" name="tipo-participacao" value="voluntario" required>
            <label for="tipo-voluntario">Quero ser voluntário(a)</label>
          </div>
          <div class="opcao">
            <input type="radio" id="tipo-doador" name="tipo-participacao" value="doador">
            <label for="tipo-doador">Quero ser doador(a)</label>
          </div>
          <div class="opcao">
            <input type="radio" id="tipo-ambos" name="tipo-participacao" value="ambos">
            <label for="tipo-ambos">Quero fazer os dois</label>
          </div>

          <div class="campo" id="campo-frente">
            <label for="frente" id="label-frente">Frente de maior interesse</label>
            <select id="frente" name="frente">
              <option value="">Selecione (opcional)</option>
              <option value="reflorestamento">Reflorestamento</option>
              <option value="educacao">Educação ambiental</option>
              <option value="microbacias">Recuperação de microbacias</option>
              <option value="administrativo">Apoio administrativo</option>
            </select>
          </div>

          <div class="opcao">
            <input type="checkbox" id="newsletter" name="newsletter" value="sim">
            <label for="newsletter">Quero receber novidades do Instituto Raízes por e-mail</label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Consentimento</legend>
          <div class="opcao" id="container-termos">
            <input type="checkbox" id="termos" name="termos" value="aceito" required>
            <label for="termos">Li e aceito a política de privacidade e o uso dos meus dados para fins de contato</label>
          </div>
        </fieldset>

        <button type="submit" class="botao">Enviar cadastro</button>
      </form>

      <section id="secao-historico-cadastros" style="margin-top: 3.5rem; border-top: 1px solid var(--color-line); padding-top: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 0.5rem;">
          <h2 style="font-size: var(--text-h3); margin-bottom: 0.25rem;">Cadastros salvos no navegador</h2>
          <button type="button" id="btn-limpar-historico" style="background: none; border: none; color: var(--color-danger-600); cursor: pointer; font-size: var(--text-small); text-decoration: underline;">Limpar histórico</button>
        </div>
        <p class="dica" style="margin-bottom: 1.25rem;">Dados retidos localmente (localStorage) para consulta sem necessidade de banco de dados remoto.</p>
        <div id="historico-cadastros-lista"></div>
      </section>
    `
  },

  404: {
    title: 'Página Não Encontrada — Instituto Raízes',
    className: '',
    navKey: null,
    template: `
      <section style="text-align: center; padding: 4rem 1rem;">
        <h1>404 — Página não encontrada</h1>
        <p>O conteúdo que você procurou não está disponível ou foi movido.</p>
        <p style="margin-top: 2rem;">
          <a class="botao" href="index.html">Voltar para o início</a>
        </p>
      </section>
    `
  }
};

// Rota ativa atual em memória
let currentActiveRoute = null;

// ---------------------------------------------------------------------------
// 2. RESOLUÇÃO DE ROTAS (URL / HASH -> ROTA INTERNA)
// ---------------------------------------------------------------------------
function resolveRouteFromUrl(urlString) {
  let url;
  try {
    url = new URL(urlString, window.location.href);
  } catch (e) {
    url = window.location;
  }

  const rawPath = url.pathname || '';
  const hash = url.hash || '';

  // 1. Prioriza rotas em formato hash SPA (#/projetos, #/cadastro, #/)
  if (hash.startsWith('#/')) {
    const cleanHash = hash.replace('#/', '').split('?')[0].toLowerCase();
    if (cleanHash === 'projetos') return { key: 'projetos', hash: '' };
    if (cleanHash === 'cadastro') return { key: 'cadastro', hash: '' };
    if (cleanHash === '' || cleanHash === 'index' || cleanHash === 'inicio') return { key: 'index', hash: '' };
  }

  // 2. Se for âncora local que pertence à página inicial (#sobre, #contato)
  if (hash === '#sobre' || hash === '#contato') {
    return { key: 'index', hash };
  }

  // 3. Extrai o nome do arquivo a partir do caminho
  const filename = rawPath.substring(rawPath.lastIndexOf('/') + 1).toLowerCase();

  if (filename.includes('projetos')) {
    return { key: 'projetos', hash };
  }
  if (filename.includes('cadastro')) {
    return { key: 'cadastro', hash };
  }
  if (filename.includes('index') || filename === '') {
    return { key: 'index', hash };
  }

  return { key: 'index', hash: '' };
}

// ---------------------------------------------------------------------------
// 3. RENDERIZAÇÃO DO CONTEÚDO E MANIPULAÇÃO DO DOM
// ---------------------------------------------------------------------------
function renderRoute(routeKey, targetHash = '') {
  const container = document.getElementById('conteudo-principal');
  if (!container) return;

  const targetRoute = routes[routeKey] || routes[404];

  // Injeta o novo conteúdo se for diferente da rota atual
  if (currentActiveRoute !== routeKey) {
    container.innerHTML = targetRoute.template;
    container.className = targetRoute.className || '';
    currentActiveRoute = routeKey;

    // Inicializa rotinas de consistência, persistência e interatividade
    initPageInteractions(routeKey);
  }

  // Sincroniza metadados e acessibilidade
  document.title = targetRoute.title;
  updateNavAriaCurrent(targetRoute.navKey);

  // Rolagem suave: se houver âncora (#contato, #sobre), rola até o elemento
  if (targetHash && targetHash !== '#') {
    setTimeout(() => {
      const targetElement = document.querySelector(targetHash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    }, 60);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ---------------------------------------------------------------------------
// 4. ATUALIZAÇÃO DO MENU DE NAVEGAÇÃO (aria-current="page")
// ---------------------------------------------------------------------------
function updateNavAriaCurrent(navKey) {
  const navLinks = document.querySelectorAll('header nav a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    let matches = false;

    if (navKey === 'index') {
      matches = href.includes('index.html') || href === '/' || href.startsWith('#/');
    } else if (navKey === 'projetos') {
      matches = href.includes('projetos');
    } else if (navKey === 'cadastro') {
      matches = href.includes('cadastro');
    }

    if (matches && !href.includes('#contato')) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

// ---------------------------------------------------------------------------
// 5. NAVEGAÇÃO PROGRAMÁTICA
// ---------------------------------------------------------------------------
function navigateTo(targetUrl) {
  const { key, hash } = resolveRouteFromUrl(targetUrl);

  // Fecha o menu mobile se estiver aberto
  fecharMenuMobile();

  // 1. Atualiza IMEDIATAMENTE a visão do usuário no DOM
  renderRoute(key, hash);

  // 2. Atualiza a URL na barra de endereços (com fallback seguro para file:///)
  try {
    window.history.pushState({ key, hash }, '', targetUrl);
  } catch (err) {
    try {
      const fallbackHash = key === 'index' ? (hash || '#/') : ('#/' + key + (hash || ''));
      if (window.location.hash !== fallbackHash) {
        window.location.hash = fallbackHash;
      }
    } catch (e) {
      // Silencia restrições locais
    }
  }
}

function fecharMenuMobile() {
  const menuPrincipal = document.getElementById('menu-principal');
  const menuToggle = document.getElementById('menu-toggle');
  if (menuPrincipal && menuPrincipal.classList.contains('menu-aberto')) {
    menuPrincipal.classList.remove('menu-aberto');
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰ Menu';
    }
  }
}

// ---------------------------------------------------------------------------
// 6. EVENT DELEGATION GLOBAL (Cliques em Links, Âncoras e Botões Dinâmicos)
// ---------------------------------------------------------------------------
document.addEventListener('click', (event) => {
  // A. Botão de cópia de chave Pix (Elemento Gerado Dinamicamente)
  const btnPix = event.target.closest('.btn-copiar-pix');
  if (btnPix) {
    event.preventDefault();
    const chave = btnPix.getAttribute('data-pix') || 'contato@institutoraizes.org.br';

    const aplicarFeedback = () => {
      const textoOriginal = btnPix.textContent;
      btnPix.textContent = '✓ Chave Pix copiada!';
      btnPix.style.background = 'var(--color-success-600)';
      setTimeout(() => {
        btnPix.textContent = textoOriginal;
        btnPix.style.background = '';
      }, 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(chave).then(aplicarFeedback).catch(() => {
        prompt('Copie a chave Pix do Instituto:', chave);
      });
    } else {
      prompt('Copie a chave Pix do Instituto:', chave);
    }
    return;
  }

  // B. Interceptação de Links e Âncoras de Navegação
  const anchor = event.target.closest('a');
  if (!anchor) return;

  const href = anchor.getAttribute('href');
  if (!href) return;

  // Ignora links externos, tel, mailto, download ou nova aba
  if (href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      anchor.hasAttribute('download') ||
      anchor.getAttribute('target') === '_blank') {
    return;
  }

  // Intercepta a navegação SPA nativamente
  event.preventDefault();

  // Trata âncoras locais (#contato, #sobre, #conteudo-principal)
  if (href.startsWith('#') && !href.startsWith('#/')) {
    fecharMenuMobile();

    if (href === '#conteudo-principal') {
      const mainEl = document.getElementById('conteudo-principal');
      if (mainEl) {
        mainEl.scrollIntoView({ behavior: 'smooth' });
        mainEl.focus({ preventScroll: true });
      }
      return;
    }

    if (currentActiveRoute !== 'index') {
      navigateTo('index.html' + href);
    } else {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        try {
          history.pushState(null, '', href);
        } catch (e) {
          // Ignora em file:///
        }
      }
    }
    return;
  }

  // Navega para o link interno
  navigateTo(href);
});

// ---------------------------------------------------------------------------
// 7. MENU MOBILE HAMBURGUER (EventListener em Botão e Clique Fora)
// ---------------------------------------------------------------------------
function initMenuMobile() {
  const menuToggle = document.getElementById('menu-toggle');
  const menuPrincipal = document.getElementById('menu-principal');
  if (!menuToggle || !menuPrincipal) return;

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const aberto = menuPrincipal.classList.contains('menu-aberto');
    const novoEstado = !aberto;

    menuToggle.setAttribute('aria-expanded', String(novoEstado));
    menuPrincipal.classList.toggle('menu-aberto', novoEstado);
    menuToggle.textContent = novoEstado ? '✕ Fechar' : '☰ Menu';
  });

  // Fecha o menu ao clicar fora dele
  document.addEventListener('click', (e) => {
    if (!menuPrincipal.contains(e.target) && !menuToggle.contains(e.target)) {
      fecharMenuMobile();
    }
  });
}

// ---------------------------------------------------------------------------
// 8. TRATAMENTO DO HISTÓRICO DO NAVEGADOR (popstate e hashchange)
// ---------------------------------------------------------------------------
window.addEventListener('popstate', (event) => {
  if (event.state && event.state.key) {
    renderRoute(event.state.key, event.state.hash || '');
  } else {
    const { key, hash } = resolveRouteFromUrl(window.location.href);
    renderRoute(key, hash);
  }
});

window.addEventListener('hashchange', () => {
  const { key, hash } = resolveRouteFromUrl(window.location.href);
  renderRoute(key, hash);
});

// ---------------------------------------------------------------------------
// 9. ROTINAS DE CONSISTÊNCIA E VALIDAÇÃO CONDICIONAL DO DOM
// ---------------------------------------------------------------------------

function obterMensagemErro(campo) {
  const v = campo.validity;
  if (!v || v.valid) return '';

  if (v.valueMissing) {
    if (campo.type === 'checkbox') return 'É obrigatório aceitar os termos para prosseguir.';
    if (campo.tagName === 'SELECT') return 'Por favor, selecione uma opção válida.';
    return 'Este campo é de preenchimento obrigatório.';
  }

  if (v.tooShort) {
    return `Preencha no mínimo ${campo.minLength} caracteres (atual: ${campo.value.length}).`;
  }

  if (v.typeMismatch && campo.type === 'email') {
    return 'Digite um endereço de e-mail válido (ex: seu@email.com).';
  }

  if (v.rangeOverflow && campo.id === 'nascimento') {
    return 'Idade mínima não atingida: é necessário ter pelo menos 16 anos.';
  }

  if (v.patternMismatch) {
    if (campo.id === 'cpf') return 'O CPF deve ter 11 dígitos no formato 000.000.000-00.';
    if (campo.id === 'cep') return 'O CEP deve ter 8 dígitos no formato 00000-000.';
    if (campo.id === 'telefone') return 'Telefone incompleto. Digite com DDD: (11) 91234-5678.';
    return 'Formato incorreto. Verifique os dados digitados.';
  }

  return 'Dado inconsistente. Por favor, verifique o campo.';
}

function validarCampo(campo) {
  const containerCampo = campo.closest('.campo') || campo.closest('.opcao') || campo.parentElement;
  const erroMsg = obterMensagemErro(campo);

  if (erroMsg) {
    campo.classList.add('input-invalido');
    campo.classList.remove('input-valido');
    campo.setAttribute('aria-invalid', 'true');

    if (containerCampo) {
      let spanErro = containerCampo.querySelector('.campo-erro');
      if (!spanErro) {
        spanErro = document.createElement('span');
        spanErro.className = 'campo-erro';
        spanErro.setAttribute('role', 'alert');
        containerCampo.appendChild(spanErro);
      }
      spanErro.textContent = erroMsg;
    }
    return false;
  } else {
    campo.classList.remove('input-invalido');
    campo.removeAttribute('aria-invalid');

    if (campo.type === 'checkbox' ? campo.checked : (campo.value && campo.value.trim().length > 0)) {
      campo.classList.add('input-valido');
    } else {
      campo.classList.remove('input-valido');
    }

    if (containerCampo) {
      const spanErro = containerCampo.querySelector('.campo-erro');
      if (spanErro) {
        spanErro.remove();
      }
    }
    return true;
  }
}

// ---------------------------------------------------------------------------
// 10. ROTINAS DE RETENÇÃO DE DADOS (LOCALSTORAGE: SET, GET, PARSE, RESTORE)
// ---------------------------------------------------------------------------

const STORAGE_KEYS = {
  CADASTROS: 'instituto_raizes_cadastros',
  RASCUNHO: 'instituto_raizes_rascunho_cadastro'
};

/**
 * Grava (SET) dados serializados em string JSON
 */
function salvarCadastrosLocalStorage(lista) {
  try {
    const stringJSON = JSON.stringify(lista);
    localStorage.setItem(STORAGE_KEYS.CADASTROS, stringJSON);
  } catch (e) {
    console.warn('Não foi possível salvar no localStorage:', e);
  }
}

/**
 * Recupera (GET) e desserializa (PARSE) para Array de Objetos JavaScript
 */
function obterCadastrosLocalStorage() {
  try {
    const stringJSON = localStorage.getItem(STORAGE_KEYS.CADASTROS);
    if (!stringJSON) return [];
    const dados = JSON.parse(stringJSON);
    return Array.isArray(dados) ? dados : [];
  } catch (e) {
    console.warn('Erro ao ler do localStorage:', e);
    return [];
  }
}

/**
 * Renderiza (RESTORE) a interface no DOM a partir dos dados do localStorage
 */
function renderizarHistoricoCadastros() {
  const container = document.getElementById('historico-cadastros-lista');
  if (!container) return;

  const cadastros = obterCadastrosLocalStorage();

  if (cadastros.length === 0) {
    container.innerHTML = `
      <p class="dica" style="font-style: italic;">
        Nenhum cadastro retido neste navegador até o momento. Preencha o formulário acima para testar a retenção de dados!
      </p>
    `;
    return;
  }

  // Gera a lista de cartões preenchidos programaticamente
  container.innerHTML = cadastros.map(c => `
    <article style="background: var(--color-neutral-000); border: 1px solid var(--color-line); padding: var(--space-4); border-radius: var(--radius-sm); margin-bottom: var(--space-3); border-left: 4px solid var(--color-primary-500);">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <strong style="font-size: 1.05rem; color: var(--color-primary-900);">${escapeHtml(c.nome)}</strong>
        <span class="dica" style="margin: 0;">📅 ${c.dataRegistro}</span>
      </div>
      <p style="margin: 0.4rem 0 0; font-size: var(--text-small); color: var(--color-primary-700);">
        <strong>Frente:</strong> ${escapeHtml(c.frente)} &nbsp;|&nbsp; 
        <strong>Modalidade:</strong> ${escapeHtml(c.tipoParticipacao)} &nbsp;|&nbsp; 
        <strong>Local:</strong> ${escapeHtml(c.cidade)}/${escapeHtml(c.estado)}
      </p>
      <p style="margin: 0.25rem 0 0; font-size: var(--text-small); color: var(--color-primary-700);">
        <strong>Contato:</strong> ${escapeHtml(c.email)} · ${escapeHtml(c.telefone)}
      </p>
    </article>
  `).join('');
}

/**
 * Auto-save: Salva rascunho de preenchimento em tempo real
 */
function salvarRascunhoFormulario(form) {
  try {
    const rascunho = {
      nome: form.nome.value,
      cpf: form.cpf.value,
      nascimento: form.nascimento.value,
      email: form.email.value,
      telefone: form.telefone.value,
      cep: form.cep.value,
      estado: form.estado.value,
      endereco: form.endereco.value,
      cidade: form.cidade.value,
      frente: form.frente.value,
      tipoParticipacao: form.querySelector('input[name="tipo-participacao"]:checked')?.value || ''
    };
    localStorage.setItem(STORAGE_KEYS.RASCUNHO, JSON.stringify(rascunho));
  } catch (e) {
    // Silencia em modo anônimo estrito
  }
}

/**
 * Restaura o rascunho do formulário ao abrir a página
 */
function restaurarRascunhoFormulario(form) {
  try {
    const stringJSON = localStorage.getItem(STORAGE_KEYS.RASCUNHO);
    if (!stringJSON) return;

    const rascunho = JSON.parse(stringJSON);
    if (!rascunho) return;

    let temDados = false;
    for (const campoNome in rascunho) {
      if (campoNome === 'tipoParticipacao' && rascunho[campoNome]) {
        const radio = form.querySelector(`input[name="tipo-participacao"][value="${rascunho[campoNome]}"]`);
        if (radio) {
          radio.checked = true;
          temDados = true;
        }
      } else if (form[campoNome] && rascunho[campoNome]) {
        form[campoNome].value = rascunho[campoNome];
        temDados = true;
      }
    }

    if (temDados) {
      const aviso = document.getElementById('aviso-rascunho');
      if (aviso) aviso.style.display = 'block';
    }
  } catch (e) {
    console.warn('Erro ao restaurar rascunho:', e);
  }
}

function limparRascunhoFormulario() {
  try {
    localStorage.removeItem(STORAGE_KEYS.RASCUNHO);
    const aviso = document.getElementById('aviso-rascunho');
    if (aviso) aviso.style.display = 'none';
  } catch (e) {}
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ---------------------------------------------------------------------------
// 11. INICIALIZAÇÃO E GANCHOS ESPECÍFICOS DE VISÕES
// ---------------------------------------------------------------------------
function initPageInteractions(routeKey) {
  // A. PÁGINA INICIAL: Formulário de Contato
  if (routeKey === 'index') {
    const formContato = document.getElementById('form-contato');
    if (formContato) {
      const inputs = formContato.querySelectorAll('input, textarea');

      inputs.forEach(input => {
        input.addEventListener('input', () => validarCampo(input));
        input.addEventListener('blur', () => validarCampo(input));
      });

      formContato.addEventListener('submit', (e) => {
        e.preventDefault();
        let formValido = true;
        let primeiroInvalido = null;

        inputs.forEach(input => {
          const valido = validarCampo(input);
          if (!valido) {
            formValido = false;
            if (!primeiroInvalido) primeiroInvalido = input;
          }
        });

        if (!formValido) {
          if (primeiroInvalido) primeiroInvalido.focus();
          return;
        }

        const feedback = document.getElementById('feedback-contato');
        if (feedback) {
          feedback.innerHTML = `
            <div class="msg-feedback">
              <strong style="color: var(--color-success-600); font-size: 1.05rem;">✓ Mensagem enviada com sucesso!</strong>
              <p style="margin: 0.35rem 0 0;">Obrigado pelo contato. Nossa equipe retornará em até 48 horas úteis.</p>
            </div>
          `;
          formContato.reset();
          inputs.forEach(inp => {
            inp.classList.remove('input-valido', 'input-invalido');
            inp.removeAttribute('aria-invalid');
          });
        }
      });
    }
  }

  // B. PÁGINA DE PROJETOS: Acordeão Exclusivo nas Perguntas Frequentes
  if (routeKey === 'projetos') {
    const container = document.getElementById('conteudo-principal');
    if (container) {
      const todosDetails = container.querySelectorAll('details');
      todosDetails.forEach(detalhe => {
        detalhe.addEventListener('toggle', () => {
          if (detalhe.open) {
            todosDetails.forEach(outro => {
              if (outro !== detalhe && outro.open) {
                outro.open = false;
              }
            });
          }
        });
      });
    }
  }

  // C. PÁGINA DE CADASTRO: Retenção com localStorage, Rascunhos e Validações
  if (routeKey === 'cadastro') {
    const formCadastro = document.getElementById('form-cadastro');
    if (formCadastro) {
      const inputs = formCadastro.querySelectorAll('input:not([type="radio"]), select');

      // 1. Restaura rascunho anterior e renderiza histórico do localStorage
      restaurarRascunhoFormulario(formCadastro);
      renderizarHistoricoCadastros();

      // Botão de limpar histórico de cadastros
      const btnLimparHistorico = document.getElementById('btn-limpar-historico');
      if (btnLimparHistorico) {
        btnLimparHistorico.addEventListener('click', () => {
          if (confirm('Deseja realmente limpar os cadastros salvos neste navegador?')) {
            localStorage.removeItem(STORAGE_KEYS.CADASTROS);
            renderizarHistoricoCadastros();
          }
        });
      }

      // 2. Máscaras de entrada (CPF e CEP)
      const inputCpf = document.getElementById('cpf');
      if (inputCpf) {
        inputCpf.addEventListener('input', (e) => {
          let v = e.target.value.replace(/\D/g, '');
          if (v.length > 11) v = v.substring(0, 11);
          v = v.replace(/(\d{3})(\d)/, '$1.$2');
          v = v.replace(/(\d{3})(\d)/, '$1.$2');
          v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
          e.target.value = v;
        });
      }

      const inputCep = document.getElementById('cep');
      if (inputCep) {
        inputCep.addEventListener('input', (e) => {
          let v = e.target.value.replace(/\D/g, '');
          if (v.length > 8) v = v.substring(0, 8);
          v = v.replace(/(\d{5})(\d{1,3})$/, '$1-$2');
          e.target.value = v;
        });
      }

      // 3. Validação preventiva e salvamento de rascunho em tempo real
      inputs.forEach(input => {
        input.addEventListener('input', () => {
          validarCampo(input);
          salvarRascunhoFormulario(formCadastro);
        });
        input.addEventListener('blur', () => validarCampo(input));
      });

      // 4. Adaptação do rótulo e salvamento de rascunho no 'change' dos radios
      const radiosParticipacao = formCadastro.querySelectorAll('input[name="tipo-participacao"]');
      const labelFrente = document.getElementById('label-frente');
      radiosParticipacao.forEach(radio => {
        radio.addEventListener('change', (e) => {
          salvarRascunhoFormulario(formCadastro);
          if (!labelFrente) return;
          if (e.target.value === 'doador') {
            labelFrente.textContent = 'Frente que deseja apoiar prioritariamente';
          } else if (e.target.value === 'voluntario') {
            labelFrente.textContent = 'Frente de atuação no voluntariado';
          } else {
            labelFrente.textContent = 'Frente de maior interesse (voluntariado e doação)';
          }
          labelFrente.style.color = 'var(--color-secondary-600)';
          setTimeout(() => { labelFrente.style.color = ''; }, 600);
        });
      });

      // 5. Submissão do cadastro e gravação (SET) no localStorage
      formCadastro.addEventListener('submit', (e) => {
        e.preventDefault();
        let formValido = true;
        let primeiroInvalido = null;

        inputs.forEach(input => {
          const valido = validarCampo(input);
          if (!valido) {
            formValido = false;
            if (!primeiroInvalido) primeiroInvalido = input;
          }
        });

        const radioChecado = formCadastro.querySelector('input[name="tipo-participacao"]:checked');
        const grupoRadio = formCadastro.querySelector('.opcao');
        if (!radioChecado) {
          formValido = false;
          if (!primeiroInvalido) primeiroInvalido = formCadastro.querySelector('input[name="tipo-participacao"]');
          if (grupoRadio && !grupoRadio.parentElement.querySelector('.campo-erro')) {
            const span = document.createElement('span');
            span.className = 'campo-erro';
            span.setAttribute('role', 'alert');
            span.textContent = 'Selecione como você deseja participar.';
            grupoRadio.parentElement.appendChild(span);
          }
        } else if (grupoRadio && grupoRadio.parentElement.querySelector('.campo-erro')) {
          grupoRadio.parentElement.querySelector('.campo-erro').remove();
        }

        if (!formValido) {
          if (primeiroInvalido) primeiroInvalido.focus();
          return;
        }

        // --- RETENÇÃO NO LOCALSTORAGE ---
        const novoCadastro = {
          id: Date.now(),
          dataRegistro: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          nome: formCadastro.nome.value.trim(),
          email: formCadastro.email.value.trim(),
          cpf: formCadastro.cpf.value.trim(),
          telefone: formCadastro.telefone.value.trim() || 'Não informado',
          nascimento: formCadastro.nascimento.value,
          estado: formCadastro.estado.value,
          cidade: formCadastro.cidade.value.trim(),
          tipoParticipacao: radioChecado.value === 'voluntario' ? 'Voluntário(a)' : (radioChecado.value === 'doador' ? 'Doador(a)' : 'Ambos'),
          frente: formCadastro.frente.value ? formCadastro.frente.options[formCadastro.frente.selectedIndex].text : 'Geral'
        };

        // Recupera lista atual (GET + PARSE), adiciona e grava novamente (SET + STRINGIFY)
        const listaAtual = obterCadastrosLocalStorage();
        listaAtual.unshift(novoCadastro);
        salvarCadastrosLocalStorage(listaAtual);

        // Limpa o rascunho
        limparRascunhoFormulario();

        // Feedback de sucesso e atualização imediata do DOM
        const feedback = document.getElementById('feedback-cadastro');
        if (feedback) {
          feedback.innerHTML = `
            <div class="msg-feedback">
              <h3 style="margin: 0; color: var(--color-success-600); font-size: 1.25rem;">✓ Cadastro gravado com sucesso!</h3>
              <p style="margin: 0.5rem 0 0;">Os dados de <strong>${escapeHtml(novoCadastro.nome)}</strong> foram persistidos no armazenamento local (localStorage) e adicionados à lista abaixo.</p>
            </div>
          `;
          formCadastro.reset();
          inputs.forEach(inp => {
            inp.classList.remove('input-valido', 'input-invalido');
            inp.removeAttribute('aria-invalid');
          });

          // Atualiza a visualização da lista no DOM
          renderizarHistoricoCadastros();

          window.scrollTo({ top: feedback.offsetTop - 60, behavior: 'smooth' });
        }
      });
    }
  }
}

// ---------------------------------------------------------------------------
// 12. BOOTSTRAP INICIAL RESILIENTE
// ---------------------------------------------------------------------------
function bootstrap() {
  initMenuMobile();
  const { key, hash } = resolveRouteFromUrl(window.location.href);
  renderRoute(key, hash);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}