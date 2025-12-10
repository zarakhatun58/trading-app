"use client";
import { useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const toSvgString = (Icon: any) => {
  const svg = Icon({ size: 16 });
  const children = svg.props.children;

  return `<svg width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round">
      ${children
        .map((c: any) => {
          const name = c.type;
          const props = Object.entries(c.props)
            .map(([k, v]) => `${k}="${v}"`)
            .join(" ");
          return `<${name} ${props} />`;
        })
        .join("")}
    </svg>`;
};

const GlobalScrollbar=()=> {
  useEffect(() => {
    document.querySelectorAll("[data-scroll]").forEach((el: any) => {
      if (el.classList.contains("has-custom-scroll")) return;
      el.classList.add("has-custom-scroll");

      const wrapper = document.createElement("div");
      wrapper.className = "custom-scroll-wrapper";

      const upBtn = document.createElement("button");
      upBtn.className = "scroll-btn scroll-up";
      upBtn.innerHTML = toSvgString(ChevronUp);

      const downBtn = document.createElement("button");
      downBtn.className = "scroll-btn scroll-down";
      downBtn.innerHTML = toSvgString(ChevronDown);

      wrapper.appendChild(upBtn);
      wrapper.appendChild(downBtn);
      el.parentElement?.appendChild(wrapper);

      upBtn.onclick = () => (el.scrollTop -= 60);
      downBtn.onclick = () => (el.scrollTop += 60);
    });
  }, []);

  return null;
}


export default GlobalScrollbar;