import { writable } from "svelte/store";

function isMobile() {
  const { subscribe, set, update } = writable(true);

  return {
    subscribe,
    check: () => {
      let el = document.getElementById("app");

      if (el) {
        let { clientWidth, clientHeight } = el;
        const mobile = clientWidth / clientHeight < 1;
        set(mobile);
      }
      return;
    }
  };
}

export const mobile = isMobile();
