(() => {
  // Inject required styles (keyframes + classes)
  const style = document.createElement("style");
  style.textContent = `
    @keyframes shrink {
      from { transform: scaleX(1); }
      to { transform: scaleX(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .toast-progress-animate {
      animation: shrink linear var(--toast-duration, 4000ms) forwards;
      transform-origin: left;
    }
    .toast:hover .toast-progress-animate {
      animation-play-state: paused;
    }
    .toast-pulse {
      animation: pulse 2s infinite;
    }
    .toast-bounce {
      animation: bounce 0.5s ease infinite;
    }
    .toast-spin {
      animation: spin 1s linear infinite;
    }
    .toast-glow {
      box-shadow: 0 0 10px currentColor;
    }
  `;
  document.head.appendChild(style);

  const themes = {
    classic: {
      base: "flex items-center gap-3 bg-white text-black border p-4 rounded-lg shadow-lg relative transition-all duration-300",
      success: "border-green-500 text-green-800",
      error: "border-red-500 text-red-800",
      warning: "border-yellow-500 text-yellow-800",
      info: "border-blue-500 text-blue-800",
      icon: {
        success: "✅",
        error: "❌",
        warning: "⚠️",
        info: "ℹ️"
      },
      iconAnimation: {}
    },
    flat: {
      base: "flex items-center gap-3 bg-white text-black border-l-4 p-4 rounded shadow-md relative transition-all duration-300",
      success: "border-green-500 bg-green-50",
      error: "border-red-500 bg-red-50",
      warning: "border-yellow-500 bg-yellow-50",
      info: "border-blue-500 bg-blue-50",
      icon: {
        success: "✔️",
        error: "🛑",
        warning: "⚠️",
        info: "💡"
      },
      iconAnimation: {
        success: "toast-bounce"
      }
    },
    glass: {
      base: "flex items-center gap-3 bg-white/30 backdrop-blur-lg border border-white/30 text-black p-4 rounded-lg shadow-lg relative transition-all duration-300",
      success: "border-green-300 text-green-900",
      error: "border-red-300 text-red-900",
      warning: "border-yellow-300 text-yellow-900",
      info: "border-blue-300 text-blue-900",
      dark: {
        success: "text-green-100 border-green-500 bg-green-900/30",
        error: "text-red-100 border-red-500 bg-red-900/30",
        warning: "text-yellow-100 border-yellow-500 bg-yellow-900/30",
        info: "text-blue-100 border-blue-500 bg-blue-900/30"
      },
      icon: {
        success: "💎",
        error: "💥",
        warning: "🌫️",
        info: "💡"
      },
      iconAnimation: {
        info: "toast-spin"
      }
    },
    neon: {
      base: "flex items-center gap-3 bg-black border-2 text-green-400 p-4 rounded-lg shadow-lg relative transition-all duration-300 toast-glow",
      success: "border-green-500 text-green-400",
      error: "border-pink-500 text-pink-400",
      warning: "border-yellow-500 text-yellow-400",
      info: "border-cyan-500 text-cyan-400",
      icon: {
        success: "🟢",
        error: "🟥",
        warning: "🟡",
        info: "🔵"
      },
      iconAnimation: {
        success: "toast-pulse",
        error: "toast-pulse",
        warning: "toast-pulse",
        info: "toast-pulse"
      }
    },
    material: {
      base: "flex items-center gap-4 p-4 rounded-lg shadow-lg bg-white relative transition-all duration-300",
      success: "border-l-4 border-green-500 text-green-800",
      error: "border-l-4 border-red-500 text-red-800",
      warning: "border-l-4 border-yellow-500 text-yellow-800",
      info: "border-l-4 border-blue-500 text-blue-800",
      icon: {
        success: "✔️",
        error: "✖️",
        warning: "⚠️",
        info: "ℹ️"
      },
      iconAnimation: {}
    },
    bubble: {
      base: "flex items-center gap-3 bg-white border-2 p-4 rounded-full shadow-lg relative transition-all duration-300",
      success: "border-green-400 text-green-600 bg-green-100",
      error: "border-red-400 text-red-600 bg-red-100",
      warning: "border-yellow-400 text-yellow-600 bg-yellow-100",
      info: "border-blue-400 text-blue-600 bg-blue-100",
      icon: {
        success: "🥤",
        error: "💣",
        warning: "📣",
        info: "🔔"
      },
      iconAnimation: {
        error: "toast-bounce",
        info: "toast-spin"
      }
    },
    retro: {
      base: "flex items-center gap-3 bg-yellow-50 border-2 border-yellow-800 text-yellow-900 p-4 rounded-lg shadow-lg relative font-mono transition-all duration-300",
      success: "border-green-700 text-green-800 bg-green-50",
      error: "border-red-700 text-red-800 bg-red-50",
      warning: "border-yellow-700 text-yellow-900 bg-yellow-50",
      info: "border-blue-700 text-blue-900 bg-blue-50",
      icon: {
        success: "📟",
        error: "📼",
        warning: "📻",
        info: "📠"
      },
      iconAnimation: {
        warning: "toast-pulse"
      }
    },
    gradient: {
      base: "flex items-center gap-3 bg-gradient-to-r text-white p-4 rounded-lg shadow-lg relative transition-all duration-300",
      success: "from-green-500 to-teal-500",
      error: "from-red-500 to-pink-500",
      warning: "from-yellow-500 to-orange-500",
      info: "from-blue-500 to-indigo-500",
      icon: {
        success: "🌈",
        error: "🔥",
        warning: "⚡",
        info: "☁️"
      },
      iconAnimation: {
        success: "toast-spin",
        warning: "toast-bounce"
      }
    },
    solid: {
      base: "flex items-center gap-3 p-4 rounded-lg shadow-lg text-white relative transition-all duration-300",
      success: "bg-green-600",
      error: "bg-red-600",
      warning: "bg-yellow-500 text-black",
      info: "bg-blue-600",
      icon: {
        success: "✅",
        error: "❌",
        warning: "⚠️",
        info: "ℹ️"
      },
      iconAnimation: {}
    },
    minimal: {
      base: "flex items-center gap-3 text-sm p-3 border-l-4 bg-white shadow-sm relative transition-all duration-300",
      success: "border-green-500 text-green-800",
      error: "border-red-500 text-red-800",
      warning: "border-yellow-500 text-yellow-800",
      info: "border-blue-500 text-blue-800",
      icon: {
        success: "✔️",
        error: "✖️",
        warning: "⚠️",
        info: "ℹ️"
      },
      iconAnimation: {}
    },
    dark: {
      base: "flex items-center gap-3 bg-gray-800 text-white p-4 rounded-lg shadow-lg relative transition-all duration-300",
      success: "border-l-4 border-green-400",
      error: "border-l-4 border-red-400",
      warning: "border-l-4 border-yellow-400",
      info: "border-l-4 border-blue-400",
      icon: {
        success: "🌙",
        error: "🌑",
        warning: "🌗",
        info: "🌒"
      },
      iconAnimation: {
        info: "toast-spin"
      }
    }
  };

  const animations = {
    slide: ["translate-x-full opacity-0", "translate-x-0 opacity-100"],
    fade: ["opacity-0", "opacity-100"],
    zoom: ["scale-50 opacity-0", "scale-100 opacity-100"],
    bounce: ["-translate-y-8 opacity-0", "translate-y-0 opacity-100"],
    flip: ["rotate-y-90 opacity-0", "rotate-y-0 opacity-100"],
    swing: ["rotate-12 opacity-0", "rotate-0 opacity-100"]
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
    neon: "h-1 bg-current opacity-30",
    glass: "h-1 bg-white/50",
    bold: "h-2 bg-black/80",
    rainbow: "h-1 bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500",
    thin: "h-0.5 bg-gray-400",
    dotted: "h-1 bg-repeat-x bg-[length:10px_2px] bg-dotted",
    striped: "h-2 bg-stripes bg-stripes-white"
  };

  // Toast Function
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
      onClick = null,
      pauseOnHover = true
    } = options;

    const config = themes[theme] || themes.classic;
    const [startAnim, endAnim] = animations[animation] || animations.slide;
    const progressClass = progressBars[progressStyle] || progressBars.default;

    const containerId = "toast-container-" + position.replace(/[^a-z]/gi, "");
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      container.className = `fixed z-[9999] space-y-3 w-full max-w-xs ${positions[position]}`;
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
      const iconAnim = config.iconAnimation?.[type] || "";
      
      const toast = document.createElement("div");
      toast.className = `${config.base} ${config[type]} ${
        darkMode ? config.dark?.[type] || "" : ""
      } transform ${startAnim} transition-all duration-500 ease-out toast`;
      
      // Generate random ID for the toast
      const toastId = "toast-" + Math.random().toString(36).substr(2, 9);
      toast.id = toastId;

      toast.innerHTML = `
        <div class="text-xl ${iconAnim}">${icon}</div>
        <div class="flex-1 text-sm pr-6">${message}</div>
        ${
          showClose
            ? '<button class="absolute top-2 right-3 text-lg font-bold hover:opacity-50 transition-opacity" aria-label="Close">&times;</button>'
            : ""
        }
        ${
          showProgress
            ? `<div class="absolute bottom-0 left-0 right-0 ${progressClass} w-full scale-x-100 toast-progress" style="--toast-duration: ${duration}ms;"></div>`
            : ""
        }
      `;

      // Add progress animation after element is created
      if (showProgress) {
        setTimeout(() => {
          const progress = toast.querySelector(".toast-progress");
          if (progress) {
            progress.classList.add("toast-progress-animate");
          }
        }, 10);
      }

      // Close button handler
      toast.querySelector("button")?.addEventListener("click", (e) => {
        e.stopPropagation();
        dismissToast(toast, startAnim);
      });

      // Click handler
      if (onClick) {
        toast.style.cursor = "pointer";
        toast.addEventListener("click", () => onClick({ type, message }));
      }

      // Hover behavior
      if (pauseOnHover) {
        toast.addEventListener("mouseenter", () => {
          const progress = toast.querySelector(".toast-progress-animate");
          if (progress) {
            progress.style.animationPlayState = "paused";
          }
        });

        toast.addEventListener("mouseleave", () => {
          const progress = toast.querySelector(".toast-progress-animate");
          if (progress) {
            progress.style.animationPlayState = "running";
          }
        });
      }

      container.appendChild(toast);
      
      // Animate in
      setTimeout(() => {
        toast.className = toast.className.replace(startAnim, endAnim);
      }, 50);

      // Auto-dismiss
      let dismissTimeout;
      if (duration > 0) {
        dismissTimeout = setTimeout(() => {
          dismissToast(toast, startAnim);
        }, duration);
      }

      // Store dismiss function on the toast element
      toast.dismiss = () => {
        if (dismissTimeout) clearTimeout(dismissTimeout);
        dismissToast(toast, startAnim);
      };
    });

    function dismissToast(toast, animClass) {
      toast.className = toast.className.replace(/\bopacity-100\b/, "opacity-0");
      setTimeout(() => {
        toast.remove();
      }, 500);
    }
  };

  // Add dismissAll method
  window.dismissAllToasts = function() {
    document.querySelectorAll('[id^="toast-container-"]').forEach(container => {
      container.querySelectorAll('.toast').forEach(toast => {
        if (toast.dismiss) toast.dismiss();
      });
    });
  };
})();
