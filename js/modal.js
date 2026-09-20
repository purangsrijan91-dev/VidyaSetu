/**
 * VidyaSetu - Accessible Modal Engine with Strict Keyboard Focus Trap
 * Pure DOM node mounting with zero innerHTML, WCAG 2.2 focus trapping, and Escape key handling.
 */
'use strict';

const ModalManager = (() => {
  let previouslyFocusedElement = null;
  let keydownHandler = null;

  function getFocusableElements(container) {
    const selector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(container.querySelectorAll(selector));
  }

  function open(titleText, contentNode) {
    if (typeof document === 'undefined') return;

    const modalContainer = document.getElementById('modal-container');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    if (!modalContainer || !modalTitle || !modalBody) return;

    // Save previous focus to restore on close
    previouslyFocusedElement = document.activeElement;

    // PURE DOM ASSIGNMENT - Zero innerHTML
    modalTitle.textContent = titleText;
    modalBody.replaceChildren(contentNode);

    modalContainer.classList.remove('hidden');

    // Accessibility attributes
    modalContainer.setAttribute('role', 'dialog');
    modalContainer.setAttribute('aria-modal', 'true');
    modalContainer.setAttribute('aria-labelledby', 'modal-title');

    // Trap focus inside modal
    const focusable = getFocusableElements(modalContainer);
    if (focusable.length > 0) {
      focusable[0].focus();
    }

    if (keydownHandler) {
      document.removeEventListener('keydown', keydownHandler);
    }

    keydownHandler = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }

      if (e.key === 'Tab') {
        const currentFocusables = getFocusableElements(modalContainer);
        if (currentFocusables.length === 0) return;

        const first = currentFocusables[0];
        const last = currentFocusables[currentFocusables.length - 1];

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          // Tab
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', keydownHandler);
  }

  function close() {
    if (typeof document === 'undefined') return;

    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
      modalContainer.classList.add('hidden');
    }

    if (keydownHandler) {
      document.removeEventListener('keydown', keydownHandler);
      keydownHandler = null;
    }

    // Restore focus to original element
    if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
      try {
        previouslyFocusedElement.focus();
      } catch (e) {}
    }
  }

  return {
    open,
    close
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ModalManager };
}
