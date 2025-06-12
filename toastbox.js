// ToastBox Full Setup
(() => {
  const themes = {
  classic: {
    base: "flex items-center gap-3 bg-white text-black border p-4 rounded shadow relative",
    success: "border-green-500 text-green-800",
    error: "border-red-500 text-red-800",
    warning: "border-yellow-500 text-yellow-800",
    info: "border-blue-500 text-blue-800",
    icon: {
      success: "✅",
      error: "❌",
      warning: "⚠️",
      info: "ℹ️"
    }
  },

  flat: {
    base: "flex items-center gap-3 bg-white text-black border-l-4 p-4 rounded shadow-sm relative",
    success: "border-green-500",
    error: "border-red-500",
    warning: "border-yellow-500",
    info: "border-blue-500",
    icon: {
      success: "✔️",
      error: "🛑",
      warning: "⚠️",
      info: "💡"
    }
  },

  glass: {
    base: "flex items-center gap-3 bg-white/30 backdrop-blur border border-white/30 text-black p-4 rounded shadow relative",
    success: "border-green-300 text-green-900",
    error: "border-red-300 text-red-900",
    warning: "border-yellow-300 text-yellow-900",
    info: "border-blue-300 text-blue-900",
    dark: {
      success: "text-green-300 border-green-500",
      error: "text-red-300 border-red-500",
      warning: "text-yellow-300 border-yellow-500",
      info: "text-blue-300 border-blue-500"
    },
    icon: {
      success: "🧊",
      error: "💥",
      warning: "🌫️",
      info: "💡"
    }
  },

  neon: {
    base: "flex items-center gap-3 bg-black border text-green-400 p-4 rounded shadow relative",
    success: "border-green-500 text-green-400",
    error: "border-pink-500 text-pink-400",
    warning: "border-yellow-500 text-yellow-400",
    info: "border-cyan-500 text-cyan-400",
    icon: {
      success: "🟢",
      error: "🟥",
      warning: "🟡",
      info: "🔵"
    }
  },

  material: {
    base: "flex items-center gap-4 p-4 rounded shadow bg-white relative",
    success: "border-l-4 border-green-500 text-green-800",
    error: "border-l-4 border-red-500 text-red-800",
    warning: "border-l-4 border-yellow-500 text-yellow-800",
    info: "border-l-4 border-blue-500 text-blue-800",
    icon: {
      success: "✔️",
      error: "✖️",
      warning: "⚠️",
      info: "ℹ️"
    }
  },

  bubble: {
    base: "flex items-center gap-3 bg-white border p-4 rounded-full shadow relative",
    success: "border-green-400 text-green-600",
    error: "border-red-400 text-red-600",
    warning: "border-yellow-400 text-yellow-600",
    info: "border-blue-400 text-blue-600",
    icon: {
      success: "🥤",
      error: "💣",
      warning: "📣",
      info: "🔔"
    }
  },

  retro: {
    base: "flex items-center gap-3 bg-yellow-50 border border-yellow-800 text-yellow-900 p-4 rounded shadow relative font-mono",
    success: "border-green-700 text-green-800",
    error: "border-red-700 text-red-800",
    warning: "border-yellow-700 text-yellow-900",
    info: "border-blue-700 text-blue-900",
    icon: {
      success: "📟",
      error: "📼",
      warning: "📻",
      info: "📠"
    }
  },

  gradient: {
    base: "flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded shadow relative",
    success: "",
    error: "",
    warning: "",
    info: "",
    icon: {
      success: "🌈",
      error: "🔥",
      warning: "⚡",
      info: "☁️"
    }
  },

  solid: {
    base: "flex items-center gap-3 p-4 rounded text-white shadow relative",
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-600",
    icon: {
      success: "✅",
      error: "❌",
      warning: "⚠️",
      info: "ℹ️"
    }
  },

  minimal: {
    base: "flex items-center gap-3 text-sm p-3 border-l-4 bg-white shadow-sm relative",
    success: "border-green-500 text-green-800",
    error: "border-red-500 text-red-800",
    warning: "border-yellow-500 text-yellow-800",
    info: "border-blue-500 text-blue-800",
    icon: {
      success: "✔️",
      error: "✖️",
      warning: "⚠️",
      info: "ℹ️"
    }
  }
};


  const animations = {
    slide: ["translate-x-full opacity-0", "translate-x-0 opacity-100"],
    fade: ["opacity-0", "opacity-100"],
    zoom: ["scale-50 opacity-0", "scale-100 opacity-100"],
    bounce: ["-translate-y-8 opacity-0", "translate-y-0 opacity-100"],
    flip: ["rotate-x-180 opacity-0", "rotate-x-0 opacity-100"]
  };

  const positions = {
    "top-right": "top-5 right-5",
    "top-left": "top-5 left-5",
    "top-center": "top-5 left-1/2 -translate-x-1/2",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "bottom-right": "bottom-5 right-5",
    "bottom-left": "bottom-5 left-5",
    "bottom-center": "bottom-5 left-1/2 -translate-x-1/2"
  };

  const progressBars = {
    default: "h-1 bg-black/20 rounded-b",
    neon: "h-1 bg-green-400 animate-pulse",
    glass: "h-1 bg-white/50",
    bold: "h-1 bg-black",
    rainbow: "h-1 bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500"
  };

  // Main Toast function
  window.initSuperToasts = function (messages, options = {}) {
    const {
      theme = "classic",
      animation = "slide",
      position = "top-right",
      duration = 4000,
      showProgress = true,
      progressStyle = "default",
      showClose = true,
      queueMode = "stack",
      darkMode = false,
      onClick = null
    } = options;

    const config = themes[theme] || themes.classic;
    const [startAnim, endAnim] = animations[animation] || animations.slide;
    const progressClass = progressBars[progressStyle] || progressBars.default;

    const containerId = "toast-container-" + position.replace(/[^a-z]/gi, "");
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      container.className = `fixed z-50 space-y-3 w-full max-w-xs ${positions[position]}`;
      document.body.appendChild(container);
    } else if (queueMode === "replace") {
      container.innerHTML = "";
    }

    messages.forEach(({ message, tags }) => {
      let type = "info";
      if (tags.includes("success")) type = "success";
      else if (tags.includes("error")) type = "error";
      else if (tags.includes("warning")) type = "warning";

      const icon = config.icon?.[type] || "";
      const toast = document.createElement("div");
      toast.className = `${config.base} ${config[type]} ${
        darkMode ? config.dark?.[type] || "" : ""
      } transform ${startAnim} transition-all duration-500`;

      toast.innerHTML = `
        <div class="text-xl">${icon}</div>
        <div class="flex-1 text-sm pr-6">${message}</div>
        ${
          showClose
            ? '<button class="absolute top-2 right-3 text-lg font-bold hover:opacity-50" aria-label="Close">&times;</button>'
            : ""
        }
        ${
          showProgress
            ? `<div class="absolute bottom-0 left-0 ${progressClass} w-full scale-x-100 origin-left" style="animation: shrink linear ${duration}ms;"></div>`
            : ""
        }
      `;

      toast.querySelector("button")?.addEventListener("click", () =>
        toast.remove()
      );
      if (onClick) toast.addEventListener("click", () => onClick({ type, message }));

      container.appendChild(toast);
      setTimeout(
        () =>
          (toast.className = toast.className.replace(startAnim, endAnim)),
        50
      );
      setTimeout(() => {
        toast.className = toast.className.replace(endAnim, startAnim);
        setTimeout(() => toast.remove(), 500);
      }, duration);
    });
  };
})();
          
