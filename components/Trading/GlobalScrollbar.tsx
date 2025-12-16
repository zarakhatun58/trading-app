"use client";

import { useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { createRoot } from "react-dom/client";

export default function GlobalScrollbar() {
  useEffect(() => {
    document.querySelectorAll("[data-scroll]").forEach((el) => {
      const container = el as HTMLElement;
      if (container.dataset.scrollReady) return;
      container.dataset.scrollReady = "true";

      const wrapper = document.createElement("div");
      wrapper.className = "custom-scroll-wrapper";

      const upBtn = document.createElement("div");
      const downBtn = document.createElement("div");

      wrapper.appendChild(upBtn);
      wrapper.appendChild(downBtn);
      container.parentElement?.appendChild(wrapper);

      createRoot(upBtn).render(
        <button
          className="scroll-btn scroll-up"
          onClick={() => (container.scrollTop -= 60)}
        >
          <ChevronUp size={16} />
        </button>
      );

      createRoot(downBtn).render(
        <button
          className="scroll-btn scroll-down"
          onClick={() => (container.scrollTop += 60)}
        >
          <ChevronDown size={16} />
        </button>
      );
    });
  }, []);

  return null;
}
