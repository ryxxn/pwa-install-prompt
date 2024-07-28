function getFaviconHref() {
  const linkElements = document.getElementsByTagName('link');

  for (let i = 0; i < linkElements.length; i++) {
    if (linkElements[i].getAttribute('rel') === 'icon') {
      return linkElements[i].getAttribute('href');
    }
  }

  return '';
}

const MODAL_STYLE = `
    .modal-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      justify-content: center;
      align-items: center;
      z-index: 99999;
    }
    .modal-content {
      min-width: 300px;
      background: white;
      padding: 20px;
      border-radius: 10px;
      position: relative;
    }
    .modal-content h1 {
      margin-top: 0;
      margin-bottom: 10px;
      font-size: 18px;
    }
    .modal-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
    #wepp-logo {
      border-radius: 8px;
    }
    #wepp-install-button {
      margin-top: 10px;
      width: 100%;
      padding: 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 18px;
      cursor: pointer;
      font-weight: bold;
      transition: 0.3s;
    }
    #wepp-install-button:hover {
      background: #0056b3;
    }
    #wepp-install-button:active {
      transform: scale(0.98);
    }
    #ok-button {
      all: initial;
      width: 100%;
      text-align: center;
      cursor: pointer;
      color: #a0a0a0;
      font-size: 14px;
      text-decoration: underline;
    }
  `;

function createProxy() {
  // 상태 객체
  let state = {
    isInstalled: true,
  };

  // 상태 변화를 감지하기 위한 핸들러
  const handler = {
    set: function (target, property, value) {
      console.log(
        `${property}가 ${target[property]}에서 ${value}(으)로 변경되었습니다.`
      );
      target[property] = value;
      // 상태 변경 후 추가 동작
      if (property === 'isInstalled') {
        if (value) {
          console.log('PWA is already installed');
        } else {
          console.log('PWA is not installed');
        }
      }
      return true;
    },
  };

  // Proxy
  const proxyState = new Proxy(state, handler);

  return proxyState;
}

const renderContent = () => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (isIOS) {
    return `
      <div class="modal-content">
        <div class="modal-body">
          <h1>IOS 앱 설치 방법</h1>
          <img id="wepp-logo" alt="logo" width="64" height="64" />
          <h2 id="wepp-name"></h2>
        </div>
        <p style="display: flex">
          1. 브라우저 주소 표시줄에
          <svg
            version="1.1"
            viewBox="0 0 2048 2048"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              transform="translate(600,655)"
              d="m0 0h301l1 2v79l-1 1-284 1-17 2-10 5-6 5-6 10-3 11v751l3 12 7 10 8 6 8 3 12 2h776l54-1 12-4 9-7 6-10 3-14v-744l-2-12-5-10-5-6-14-7-4-1-18-1-278-1-1-1v-81h301l18 3 16 5 16 8 12 8 12 10v2l3 1 9 11 9 14 8 17 4 14 2 12 1 15v744l-2 21-6 21-9 19-10 14-12 13-10 8-11 7-14 7-18 6-17 3-13 1h-824l-20-2-19-5-16-7-12-7-16-13-11-12-10-15-8-16-5-17-3-18-1-42v-658l1-61 3-18 5-16 4-9 7-13 8-11 3-4h2l2-4 13-12 16-10 15-7 18-5z"
            />
            <path
              transform="translate(1023,229)"
              d="m0 0 5 3 269 269 1 4-53 53-2 3-4-1-172-172-1 3v753l-2 3h-81l-1-2v-758l-174 174h-3l-7-8-48-48 1-5 10-9 162-162 5-6 7-6 5-6 7-6 5-6 7-6 5-6 7-6 5-6 7-6 5-6 7-6 5-6 8-7z"
            />
          </svg>
          아이콘을 클릭하세요.
        </p>
        <p>2. '홈 화면에 추가'를 눌러주세요.</p>

        <button id="ok-button">괜찮아요, 모바일 웹으로 볼게요.</button>
      </div>
    `;
  }
  return `
    <div class="modal-content">
      <div class="modal-body">
        <h1>앱으로 설치하기</h1>
        <img id="wepp-logo" alt="logo" width="64" height="64" />
        <h2 id="wepp-name"></h2>
      </div>
      <button id="wepp-install-button">설치하기</button>
      <button id="ok-button" style="margin-top: 20px">
        괜찮아요, 모바일 웹으로 볼게요.
      </button>
    </div>
  `;
};

function main() {
  // Create and append styles
  const style = document.createElement('style');
  style.textContent = MODAL_STYLE;

  document.head.appendChild(style);

  // Create container
  var container = document.createElement('div');
  container.id = 'wepp-install-modal';
  container.className = 'modal-overlay';
  container.innerHTML = renderContent();

  document.body.appendChild(container);

  // Get the modal
  const modal = document.getElementById('wepp-install-modal');

  const onClose = () => {
    window.location.hash = '';
  };

  modal.addEventListener('click', onClose);
  document.getElementById('ok-button')?.addEventListener('click', onClose);
  modal.querySelector('.modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
  });

  const handleHashChange = () => {
    const hash = window.location.hash;
    const isValidHash = hash.startsWith('#wepp-install-modal');

    const nameElement = document.getElementById('wepp-name');
    const logoElement = document.getElementById('wepp-logo');

    const name = document.title;
    const logo = getFaviconHref();

    nameElement.textContent = name;
    logoElement.src = logo;

    modal.style.display = isValidHash ? 'flex' : 'none';
  };

  window.addEventListener('hashchange', handleHashChange);
  handleHashChange(); // Run on initial load

  // ----------------------------------------------------------
  // pwa install
  const state = createProxy();
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    state.isInstalled = false;
  });

  const installButton = document.getElementById('wepp-install-button');
  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {
    try {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          // User accepted the install prompt
          onClose();
        } else {
          // User dismissed the install prompt
        }
        // Clear the deferredPrompt variable
        deferredPrompt = null;
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
  });
}

if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", main);
} else {
  // `DOMContentLoaded` has already fired
  main();
}
