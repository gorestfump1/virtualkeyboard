// Rus alphabet
const keyLayoutRU = [
    'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
    'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'del',
    'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '\\', 'enter',
    'shiftLeft', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'shiftRight',
    'ctrlLeft', 'meta', 'altLeft', 'space', 'altRight', 'ctrlRight', '←', '↓', '→',
  ];
  
  // Eng alphabet
  const keyLayoutEN = [
    '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
    'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'del',
    'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '#', 'enter',
    'shiftLeft', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'shiftRight',
    'ctrlLeft', 'meta', 'altLeft', 'space', 'altRight', 'ctrlRight', '←', '↓', '→',
  ];
  
  // Keyboard
  const keyLang = [
    'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
    'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Del',
    'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter',
    'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
    'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
  ];
  
  const parsRU = {};
  keyLayoutRU.forEach((key, i) => { parsRU[key] = keyLayoutEN[i]; });
  
  const parsEN = {};
  keyLayoutEN.forEach((key, i) => { parsEN[key] = keyLayoutRU[i]; });
  
  const Board = {
  
    el: {
      main: null,
      input: null,
      keysContainer: null,
      keys: [],
    },
  
    properties: {
      capsLock: false,
      languageRussian: null,
      keyLayout: null,
    },
  
    pars: [parsRU, parsEN],
  
    init() {
      // Create main elem
      this.el.main = document.createElement('div');
      this.el.input = document.createElement('textarea');
      this.el.keysContainer = document.createElement('div');
  
      // Setup main elem
      this.el.main.classList.add('keyboard');
      this.el.input.classList.add('use-keyboard-input');
      this.el.input.setAttribute('placeholder', 'to change Language, press: ALT + SHIFT');
      this.el.keysContainer.classList.add('keyboard__keys');
  
      // Select Languages
      if (this.language === 'RU') {
        this.keyLayout = keyLayoutRU;
        this.el.keysContainer.appendChild(this.createKeys(this.keyLayout));
      } else {
        this.keyLayout = keyLayoutEN;
        this.el.keysContainer.appendChild(this.createKeys(this.keyLayout));
      }
      this.el.keys = this.el.keysContainer.querySelectorAll('.keyboard__key');
  
      // Add to DOM
      this.el.main.appendChild(this.el.input);
      this.el.main.appendChild(this.el.keysContainer);
      document.body.appendChild(this.el.main);
    },
  
    createKeys() {
      const fragment = document.createDocumentFragment();
  
      this.keyLayout.forEach((key) => {
        // Create rows
        const keyElement = document.createElement('button');
        const insertLineBreak = ['tab', 'shiftleft', 'caps', 'shiftLeft', 'ctrlLeft'].indexOf(key) !== -1;
  
        if (insertLineBreak) {
          fragment.appendChild(document.createElement('br'));
        }
  
        // Add attributes
        keyElement.setAttribute('type', 'button');
        keyElement.classList.add('keyboard__key');
  
        switch (key) {
          case 'tab':
            keyElement.classList.add('keyboard__key--func');
            keyElement.classList.add('keyboard__key_tab');
            keyElement.textContent = 'Tab';
  
            keyElement.addEventListener('click', () => {
              this.el.input.value += '    ';
            });
            break;
  
            case 'caps':
            keyElement.classList.add('keyboard__key--func');
            keyElement.classList.add('keyboard__key_capslock');
            keyElement.textContent = 'CL';
  
            keyElement.addEventListener('click', () => {
              this.toggleCapsLock();
              keyElement.classList.toggle('keyboard__key_cl--active', this.properties.capsLock);
            });
            break;

            case 'del':
            keyElement.classList.add('keyboard__key--special');
            keyElement.classList.add('keyboard__key_del');
            keyElement.textContent = 'Delete';

            keyElement.addEventListener('click', () => {
              this.el.input.value = this.el.input.value.substring(0, this.el.input.value.length - 1);
            });
            break;

            case 'enter':
            keyElement.classList.add('keyboard__key--func');
            keyElement.classList.add('keyboard__key_enter');
            keyElement.textContent = 'Enter';
      
            keyElement.addEventListener('click', () => {
               this.elelem.input.value += '\n';
            });
      
            break;
  
            case 'shiftLeft':
            keyElement.classList.add('keyboard__key--func');
            keyElement.classList.add('keyboard__key_shiftleft');
            keyElement.textContent = 'Shift';
  
            keyElement.addEventListener('mousedown', () => {
              this.toggleCapsLock();
            });
  
            keyElement.addEventListener('mouseup', () => {
              this.toggleCapsLock();
            });
            break;

            case 'shiftRight':
            keyElement.classList.add('keyboard__key--func');
            keyElement.classList.add('keyboard__key_shiftright');
            keyElement.textContent = 'Shift';
  
            keyElement.addEventListener('mousedown', () => {
              this.toggleCapsLock();
            });
  
            keyElement.addEventListener('mouseup', () => {
              this.toggleCapsLock();
            });
            break;
  
            case 'ctrlLeft':
            keyElement.classList.add('keyboard__key--func');
            keyElement.classList.add('keyboard__key_ctrlleft');
            keyElement.textContent = 'Ctrl';
            break;
  
            case 'altLeft':
            keyElement.classList.add('keyboard__key--func');
            keyElement.classList.add('keyboard__key_altleft');
            keyElement.textContent = 'Alt';
            break;
  
            case 'space':
            keyElement.classList.add('keyboard__key--func');
            keyElement.classList.add('keyboard__key_space');
            keyElement.textContent = ' ';
  
            keyElement.addEventListener('click', () => {
              this.el.input.value += ' ';
            });
            break;
  
            case 'altRight':
            keyElement.classList.add('keyboard__key--func');
            keyElement.classList.add('keyboard__key_altright');
            keyElement.textContent = 'Alt gr';
            break;
  
            case 'ctrlRight':
            keyElement.classList.add('keyboard__key--func');
            keyElement.classList.add('keyboard__key_ctrlright');
            keyElement.textContent = 'Ctrl';
            break;
  
            case 'backspace':
            keyElement.classList.add('keyboard__key--func');
            keyElement.classList.add('keyboard__key_backspace');
            keyElement.textContent = 'Backspace';
  
            keyElement.addEventListener('click', () => {
              this.el.input.value = this.el.input.value.substring(0, this.el.input.value.length - 1);
            });
            break;
          
            case 'meta':
            keyElement.classList.add('keyboard__key--func');
            keyElement.classList.add('keyboard__key_meta');
            keyElement.textContent = 'Meta';
            break;
  
            default:
            keyElement.textContent = key.toLowerCase();
            keyElement.addEventListener('click', () => {
              this.el.input.value += keyElement.textContent;
            });
            break;
           }
  
        fragment.appendChild(keyElement);
      });
  
      return fragment;
    },
  
    toggleCapsLock() {
      this.properties.capsLock = !this.properties.capsLock;
      this.el.keys.forEach((key, i) => {
        if (!this.el.keys[i].classList.contains('keyboard__key--func')) {
          if (this.properties.capsLock) {
            this.el.keys[i].textContent = key.textContent.toUpperCase();
          } else {
            this.el.keys[i].textContent = key.textContent.toLowerCase();
          }
        }
      });
    },
  
    changeLanguage() {
      let index = 0;
      if (this.language === 'RU') {
        this.properties.languageRussian = 'EN';
        index = 0;
      } else {
        this.properties.languageRussian = 'RU';
        index = 1;
      }
      this.el.keys.forEach((key, i) => {
        if (this.properties.capsLock === true) {
          if (!key.classList.contains('keyboard__key--func')) {
            this.el.keys[i].textContent = key.textContent.toLowerCase();
            if (Object.prototype.hasOwnProperty.call(this.pars[index], key.textContent)) {
              this.el.keys[i].textContent = this.pars[index][key.textContent].toUpperCase();
            }
          }
        } else if (Object.prototype.hasOwnProperty.call(this.pars[index], key.textContent)) {
          this.el.keys[i].textContent = this.pars[index][key.textContent];
        }
      });
      this.language = this.properties.languageRussian;
    }
  };
  
  // Do styles active element of keyboard
  
  document.addEventListener('keydown', (event) => {
    const index = keyLang.indexOf(event.code);
    if (!event.repeat) {
      Board.el.keys[index].classList.add('keyboard__key--active');
      if (Board.el.keys[index].classList.contains('keyboard__key_tab')) {
        Board.el.input.value += '    ';
      }
      if (event.code === 'CapsLock') {
        Board.toggleCapsLock();
        Board.el.keys[index].classList.toggle('keyboard__key_cl--active', Board.properties.capsLock);
      }
      if (event.code === 'Enter') {
        Board.el.input.value += '\n';
      }
      if (event.code === 'ShiftLeft') {
        Board.toggleCapsLock();
      }
      if (event.code === 'ShiftRight') {
        Board.toggleCapsLock();
      }
      if (!Board.el.keys[index].classList.contains('keyboard__key--func')) {
        Board.el.input.value += Board.el.keys[index].textContent;
      }
      if (Board.el.keys[index].classList.contains('keyboard__key_space')) {
        Board.el.input.value += ' ';
      }
      if (event.altKey && event.shiftKey) {
        Board.changeLanguage();
      }
    }
    if (Board.el.keys[index].classList.contains('keyboard__key_backspace')) {
      Board.el.input.value = Board.el.input.value.substring(0, Board.el.input.value.length - 1);
    }
  });
  
  document.addEventListener('keyup', (event) => {
    const index = keyLang.indexOf(event.code);
    Board.el.keys[index].classList.remove('keyboard__key--active');
  
    if (event.code === 'ShiftLeft') {
      Board.toggleCapsLock();
    }
    if (event.code === 'ShiftRight') {
      Board.toggleCapsLock();
    }
  });
  
  window.addEventListener('DOMContentLoaded', () => {
    Board.init();
  });