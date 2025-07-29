// Content script - runs on every page
console.log('Sapo Studio Extension loaded');

let sidebarMounted = false;
let sidebarVisible = false;

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleSidebar') {
    toggleSidebar();
    sendResponse({status: 'success'});
  }
});

function toggleSidebar() {
  const existingSidebar = document.getElementById('sapo-studio-extension');

  if (existingSidebar) {
    if (sidebarVisible) {
      hideSidebar();
    } else {
      showSidebar();
    }
  } else {
    createSidebar();
  }
}

function createSidebar() {
  // Avoid creating multiple sidebars
  if (document.getElementById('sapo-studio-extension')) {
    return;
  }

  // Create sidebar container
  const sidebar = document.createElement('div');
  sidebar.id = 'sapo-studio-extension';
  sidebar.className = 'sapo-studio-extension';

   const header = document.createElement('header');
  header.id = 'sapo-studio-header';
  header.className = 'sapo-studio-header';

   const h1 = document.createElement('h1');
   h1.innerText = 'Sapo Studio';
   header.appendChild(h1);

  // Create close button
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '×';
  closeBtn.className = 'sapo-studio-sidebar-close';
  closeBtn.onclick = () => hideSidebar();
  header.appendChild(closeBtn);

  // Create container for React app
  const reactContainer = document.createElement('div');
  reactContainer.id = 'sapo-studio-root';
  reactContainer.className = 'sapo-studio-content';

  sidebar.appendChild(header);
  sidebar.appendChild(reactContainer);
  document.body.appendChild(sidebar);

  // Mount React app
  if (window.mountReactSidebar) {
    window.mountReactSidebar();
    sidebarMounted = true;
  }

  showSidebar();
}

function showSidebar() {
  const sidebar = document.getElementById('sapo-studio-extension');
  if (sidebar) {
    sidebar.style.display = 'block';
    document.body.style.marginRight = '500px';
    document.body.style.transition = 'margin-right 0.3s ease';
    sidebarVisible = true;
  }
}

function hideSidebar() {
  const sidebar = document.getElementById('sapo-studio-extension');
  if (sidebar) {
    sidebar.parentNode.removeChild(sidebar);
    document.body.style.marginRight = '0';
    sidebarVisible = false;
  }
}
