// Estado da Aplicação (Simulando Context API)
const AppState = {
  user: null,
  setUser(userData) {
    this.user = userData;
    if (userData) {
      localStorage.setItem('pcd_user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('pcd_user');
    }
    render();
  },
  init() {
    const saved = localStorage.getItem('pcd_user');
    if (saved) this.user = JSON.parse(saved);
    render();
  }
};

// Seleção de Elementos DOM
const authSection = document.getElementById('auth-section');
const dashboardSection = document.getElementById('dashboard-section');
const registerForm = document.getElementById('register-form');
const userWelcome = document.getElementById('user-welcome');
const featuresContainer = document.getElementById('accessibility-features');
const logoutBtn = document.getElementById('logout-btn');
const themeToggle = document.getElementById('theme-toggle');

// Eventos
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const disability = document.getElementById('disability').value;
  AppState.setUser({ name, disability });
});

logoutBtn.addEventListener('click', () => AppState.setUser(null));

themeToggle.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', newTheme);
  themeToggle.textContent = newTheme === 'dark' ? 'Modo Claro' : 'Modo Escuro';
});

// Renderização Dinâmica conforme o tipo de deficiência
function render() {
  if (AppState.user) {
    authSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    userWelcome.textContent = `Olá, ${AppState.user.name}!`;

    // Conteúdo adaptado
    let content = '';
    switch (AppState.user.disability) {
      case 'visual':
        content = '<p>🔍 <strong>Recursos Visual:</strong> Leitores de tela ativados, alertas sonoros de rotas e semáforos com áudio.</p>';
        break;
      case 'auditiva':
        content = '<p>🤟 <strong>Recursos Auditivos:</strong> Alertas visuais por pisca-alerta e mapas com navegação gráfica facilitada.</p>';
        break;
      case 'fisico-motora':
        content = '<p>♿ <strong>Recursos Motores:</strong> Mapeamento de rampas, elevadores urbanos e piso tátil rebaixado.</p>';
        break;
      default:
        content = '<p>ℹ️ <strong>Recursos Gerais:</strong> Rotas adaptadas e suporte a tempo estendido em semáforos.</p>';
    }
    featuresContainer.innerHTML = content;
  } else {
    authSection.classList.remove('hidden');
    dashboardSection.classList.add('hidden');
  }
}

// Inicializar Aplicação
AppState.init();