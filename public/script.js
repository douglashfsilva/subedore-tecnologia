const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const year = document.querySelector('#year');

if (year) year.textContent = new Date().getFullYear();

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 20);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.classList.toggle('is-open');
  mainNav?.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.classList.remove('is-open');
    mainNav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Abrir menu');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

// Demonstração interativa do futuro assistente de descoberta.
const conversation = document.querySelector('#assistant-conversation');
const chatOptions = document.querySelector('#hero-chat-options');
const scenarioData = {
  vendas: {
    user: 'Quero gerar mais oportunidades.',
    assistant: 'Entendi. Hoje sua empresa já possui um site ou depende principalmente de redes sociais e indicações?',
    answer: 'Dependemos bastante de indicações e WhatsApp.',
    diagnosis: '<strong>Diagnóstico inicial:</strong> uma presença digital orientada à conversão pode apresentar melhor seus serviços e criar um caminho mais claro até o contato.'
  },
  processo: {
    user: 'Preciso organizar um processo.',
    assistant: 'Como esse processo funciona atualmente?',
    answer: 'Usamos planilhas, mensagens e controles manuais.',
    diagnosis: '<strong>Diagnóstico inicial:</strong> um sistema corporativo pode centralizar informações, responsáveis, prazos e indicadores em um único ambiente.'
  },
  automacao: {
    user: 'Quero reduzir tarefas manuais.',
    assistant: 'Quais atividades a equipe precisa repetir com frequência?',
    answer: 'Cadastro, avisos, conferências e atualização de planilhas.',
    diagnosis: '<strong>Diagnóstico inicial:</strong> automações e integrações podem reduzir retrabalho, erros e tempo operacional.'
  },
  produto: {
    user: 'Tenho uma ideia de sistema.',
    assistant: 'Qual problema essa ideia ajudaria a resolver e quem utilizaria a solução?',
    answer: 'Ela organizaria um serviço que hoje é feito de forma manual pela equipe.',
    diagnosis: '<strong>Diagnóstico inicial:</strong> o próximo passo é estruturar usuários, fluxos, funcionalidades essenciais e uma primeira versão validável.'
  }
};

const addChatMessage = (type, label, html) => {
  if (!conversation) return;
  const message = document.createElement('div');
  message.className = `chat-message chat-${type}`;
  message.innerHTML = `<span class="chat-label">${label}</span><p>${html}</p>`;
  conversation.appendChild(message);
  conversation.scrollTo({ top: conversation.scrollHeight, behavior: 'smooth' });
};

chatOptions?.addEventListener('click', async (event) => {
  const button = event.target.closest('button[data-scenario]');
  if (!button || chatOptions.classList.contains('is-complete')) return;

  const scenario = scenarioData[button.dataset.scenario];
  if (!scenario) return;

  chatOptions.classList.add('is-complete');
  chatOptions.querySelectorAll('button').forEach((item) => {
    if (item !== button) item.style.opacity = '.32';
  });

  addChatMessage('user', 'Você', scenario.user);
  await wait(450);
  addChatMessage('assistant', 'Subedore', scenario.assistant);
  await wait(650);
  addChatMessage('user', 'Você', scenario.answer);
  await wait(700);
  addChatMessage('assistant chat-diagnostic', 'Subedore', scenario.diagnosis);
});

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Animação da jornada da ideia à evolução.
const flowSteps = [...document.querySelectorAll('.flow-step')];
if (flowSteps.length) {
  let activeFlow = 0;
  window.setInterval(() => {
    flowSteps[activeFlow]?.classList.remove('is-active');
    activeFlow = (activeFlow + 1) % flowSteps.length;
    flowSteps[activeFlow]?.classList.add('is-active');
  }, 2300);
}

// Pré-diagnóstico guiado.
const diagnosisForm = document.querySelector('#diagnosis-form');
const diagnosisSteps = [...document.querySelectorAll('.diagnosis-step')];
const diagnosisNext = document.querySelector('#diagnosis-next');
const diagnosisBack = document.querySelector('#diagnosis-back');
const diagnosisControls = document.querySelector('#diagnosis-controls');
const diagnosisResult = document.querySelector('#diagnosis-result');
const diagnosisSummary = document.querySelector('#diagnosis-summary');
const diagnosisProgressBar = document.querySelector('#diagnosis-progress-bar');
const diagnosisStepCurrent = document.querySelector('#diagnosis-step-current');
const sendDiagnosis = document.querySelector('#send-diagnosis');
const restartDiagnosis = document.querySelector('#restart-diagnosis');
let currentDiagnosisStep = 0;

const showDiagnosisStep = (index) => {
  diagnosisSteps.forEach((step, stepIndex) => step.classList.toggle('is-active', stepIndex === index));
  currentDiagnosisStep = index;
  if (diagnosisStepCurrent) diagnosisStepCurrent.textContent = String(index + 1);
  if (diagnosisProgressBar) diagnosisProgressBar.style.width = `${((index + 1) / diagnosisSteps.length) * 100}%`;
  if (diagnosisBack) diagnosisBack.disabled = index === 0;
  if (diagnosisNext) diagnosisNext.textContent = index === diagnosisSteps.length - 1 ? 'Gerar diagnóstico' : 'Continuar';
};

const validateDiagnosisStep = () => {
  const step = diagnosisSteps[currentDiagnosisStep];
  if (!step) return false;
  const requiredFields = [...step.querySelectorAll('[required]')];
  if (!requiredFields.length) return true;

  const radio = requiredFields.find((field) => field.type === 'radio');
  if (radio) {
    const selected = step.querySelector(`input[name="${radio.name}"]:checked`);
    if (!selected) {
      step.querySelector('.diagnosis-options')?.animate(
        [{ transform: 'translateX(0)' }, { transform: 'translateX(-5px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(0)' }],
        { duration: 260 }
      );
      return false;
    }
  }

  const textField = requiredFields.find((field) => field.tagName === 'TEXTAREA');
  if (textField && !textField.value.trim()) {
    textField.focus();
    return false;
  }
  return true;
};

const getDiagnosisData = () => {
  const data = new FormData(diagnosisForm);
  return {
    need: data.get('need') || '',
    current: String(data.get('current') || '').trim(),
    users: data.get('users') || '',
    result: String(data.get('result') || '').trim(),
    timeline: data.get('timeline') || ''
  };
};

const renderDiagnosis = () => {
  const data = getDiagnosisData();
  diagnosisSteps.forEach((step) => step.classList.remove('is-active'));
  diagnosisControls.hidden = true;
  diagnosisResult.hidden = false;
  if (diagnosisProgressBar) diagnosisProgressBar.style.width = '100%';
  if (diagnosisStepCurrent) diagnosisStepCurrent.textContent = '5';

  diagnosisSummary.innerHTML = `
    <div><strong>Necessidade provável</strong><span>${escapeHtml(data.need)}</span></div>
    <div><strong>Cenário atual</strong><span>${escapeHtml(data.current)}</span></div>
    <div><strong>Usuários</strong><span>${escapeHtml(data.users)}</span></div>
    <div><strong>Resultado esperado</strong><span>${escapeHtml(data.result)}</span></div>
    <div><strong>Prioridade</strong><span>${escapeHtml(data.timeline)}</span></div>
  `;
};

diagnosisNext?.addEventListener('click', () => {
  if (!validateDiagnosisStep()) return;
  if (currentDiagnosisStep < diagnosisSteps.length - 1) showDiagnosisStep(currentDiagnosisStep + 1);
  else renderDiagnosis();
});

diagnosisBack?.addEventListener('click', () => {
  if (currentDiagnosisStep > 0) showDiagnosisStep(currentDiagnosisStep - 1);
});

restartDiagnosis?.addEventListener('click', () => {
  diagnosisForm?.reset();
  diagnosisResult.hidden = true;
  diagnosisControls.hidden = false;
  showDiagnosisStep(0);
});

sendDiagnosis?.addEventListener('click', () => {
  const data = getDiagnosisData();
  const message = [
    'Olá, Douglas! Fiz o pré-diagnóstico no site da Subedore Tecnologia e gostaria de conversar sobre o projeto.',
    '',
    `Necessidade provável: ${data.need}`,
    `Cenário atual: ${data.current}`,
    `Quem utilizará: ${data.users}`,
    `Resultado esperado: ${data.result}`,
    `Quando gostaria de começar: ${data.timeline}`
  ].join('\n');
  openWhatsApp(message);
});

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[char]));
}

// Formulário final de contato.
const projectForm = document.querySelector('#project-form');
projectForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const summary = document.querySelector('#project-summary')?.value.trim();
  const message = summary
    ? `Olá, Douglas! Vi o site da Subedore Tecnologia e gostaria de estruturar um projeto.\n\nMeu cenário ou ideia:\n${summary}`
    : 'Olá, Douglas! Vi o site da Subedore Tecnologia e gostaria de estruturar um projeto.';
  openWhatsApp(message);
});

function openWhatsApp(message) {
  const url = `https://wa.me/5538988018881?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
