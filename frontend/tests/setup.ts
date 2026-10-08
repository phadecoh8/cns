import '@testing-library/jest-dom/vitest';

if (!HTMLDialogElement.prototype.showModal) {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {value() {
    this.setAttribute('open', '');
  },});
}

if (!HTMLDialogElement.prototype.close) {
  Object.defineProperty(HTMLDialogElement.prototype, 'close', {value() {
    this.removeAttribute('open');
  },});
}
