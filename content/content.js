// Content script - runs on every page
console.log('React Sidebar Extension loaded');

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
  const existingSidebar = document.getElementById('react-extension-sidebar');

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
  if (document.getElementById('react-extension-sidebar')) {
    return;
  }

  // Create sidebar container
  const sidebar = document.createElement('div');
  sidebar.id = 'react-extension-sidebar';
  sidebar.className = 'react-extension-sidebar';

  // Create close button
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '×';
  closeBtn.className = 'react-sidebar-close';
  closeBtn.onclick = () => hideSidebar();

  // Create container for React app
  const reactContainer = document.createElement('div');
  reactContainer.id = 'sapo-studio-root';
  reactContainer.className = 'react-sidebar-content';

  sidebar.appendChild(closeBtn);
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
  const sidebar = document.getElementById('react-extension-sidebar');
  if (sidebar) {
    sidebar.style.display = 'block';
    document.body.style.marginRight = '400px';
    document.body.style.transition = 'margin-right 0.3s ease';
    sidebarVisible = true;
  }
}

function hideSidebar() {

  const sidebar = document.getElementById('react-extension-sidebar');
  if (sidebar) {
    console.log('Hiding sidebar');
    sidebar.parentNode.removeChild(sidebar);
    document.body.style.marginRight = '0';
    sidebarVisible = false;
  }
}
