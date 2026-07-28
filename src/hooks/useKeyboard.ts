// hooks/useKeyboard.ts

import { useEffect } from "react";

type KeyHandler = (event: KeyboardEvent) => void;

interface KeyboardShortcuts {
  [key: string]: KeyHandler;
}

export const useKeyboard = (shortcuts: KeyboardShortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const ctrl = event.ctrlKey || event.metaKey;
      const shift = event.shiftKey;
      const alt = event.altKey;

      let shortcutKey = "";
      if (ctrl) shortcutKey += "ctrl+";
      if (shift) shortcutKey += "shift+";
      if (alt) shortcutKey += "alt+";
      shortcutKey += key;

      if (shortcuts[shortcutKey]) {
        event.preventDefault();
        shortcuts[shortcutKey](event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shortcuts]);
};
