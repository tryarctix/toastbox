/**
 * SuperToasts v2.0 - Complete Toast Notification System
 * Features: 20 themes, 18 animations, 18 positions, 18 progress styles
 * No dependencies - Works with Tailwind CSS
 */
(function() {
  // ========================
  // CORE STYLES
  // ========================
  const style = document.createElement("style");
  style.textContent = `
    @keyframes shrink {
      from { transform: scaleX(1); }
      to { transform: scaleX(0); }
    }
    .toast-progress-animate {
      transform-origin: left;
    }
    .toast:hover .toast-progress-animate {
      animation-play-state: paused;
    }
    .toast-exit {
      opacity: 0;
      transform: scale(0.95);
      transition: all 0.4s ease;
    }
    .toast {
      overflow: hidden;
    }
    @keyframes roll { 0% {transform: rotate(-120deg) scale(0)} 100% {transform: rotate(0) scale(1)} }
    .anim-roll { animation: roll 0.5s ease-out }
    @keyframes jiggle { 0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)} }
    .anim-jiggle { animation: jiggle 0.6s ease-in-out }
    @keyframes swing { 0%{transform: rotate(0)}25%{transform: rotate(10deg)}75%{transform: rotate(-10deg)}100%{transform: rotate(0)} }
    .anim-swing { animation: swing 0.8s ease-in-out }
    @keyframes pulse { 0%,100%{transform: scale(1)}50%{transform: scale(1.05)} }
    .anim-pulse { animation: pulse 1s ease-in-out infinite }
  `;
  document.head.appendChild(style);


  // ========================
  // THEMES (20 options)
  // ========================
  const themes = {
    classic: { 
      base: "flex items-center gap-3 bg-white text-black border p-4 rounded shadow relative", 
      success: "border-green-500 text-green-800", 
      error: "border-red-500 text-red-800", 
      warning: "border-yellow-500 text-yellow-800", 
      info: "border-blue-500 text-blue-800", 
      icon: { success: "✅", error: "❌", warning: "⚠️", info: "ℹ️" } 
    },
    flat: { 
      base: "flex items-center gap-3 bg-white text-black border-l-4 p-4 rounded shadow-sm relative", 
      success: "border-green-500", 
      error: "border-red-500", 
      warning: "border-yellow-500", 
      info: "border-blue-500", 
      icon: { success: "✔️", error: "🛑", warning: "⚠️", info: "💡" } 
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
      icon: { success: "🧊", error: "💥", warning: "🌫️", info: "💡" } 
    },
    neon: { 
      base: "flex items-center gap-3 bg-black border text-green-400 p-4 rounded shadow relative", 
      success: "border-green-500 text-green-400", 
      error: "border-pink-500 text-pink-400", 
      warning: "border-yellow-500 text-yellow-400", 
      info: "border-cyan-500 text-cyan-400", 
      icon: { success: "🟢", error: "🟥", warning: "🟡", info: "🔵" } 
    },
    material: { 
      base: "flex items-center gap-4 p-4 rounded shadow bg-white relative", 
      success: "border-l-4 border-green-500 text-green-800", 
      error: "border-l-4 border-red-500 text-red-800", 
      warning: "border-l-4 border-yellow-500 text-yellow-800", 
      info: "border-l-4 border-blue-500 text-blue-800", 
      icon: { success: "✔️", error: "✖️", warning: "⚠️", info: "ℹ️" } 
    },
    bubble: { 
      base: "flex items-center gap-3 bg-white border p-4 rounded-full shadow relative", 
      success: "border-green-400 text-green-600", 
      error: "border-red-400 text-red-600", 
      warning: "border-yellow-400 text-yellow-600", 
      info: "border-blue-400 text-blue-600", 
      icon: { success: "🥤", error: "💣", warning: "📣", info: "🔔" } 
    },
    retro: { 
      base: "flex items-center gap-3 bg-yellow-50 border border-yellow-800 text-yellow-900 p-4 rounded shadow relative font-mono", 
      success: "border-green-700 text-green-800", 
      error: "border-red-700 text-red-800", 
      warning: "border-yellow-700 text-yellow-900", 
      info: "border-blue-700 text-blue-900", 
      icon: { success: "📟", error: "📼", warning: "📻", info: "📠" } 
    },
    gradient: { 
      base: "flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded shadow relative", 
      success: "", 
      error: "", 
      warning: "", 
      info: "", 
      icon: { success: "🌈", error: "🔥", warning: "⚡", info: "☁️" } 
    },
    solid: { 
      base: "flex items-center gap-3 p-4 rounded text-white shadow relative", 
      success: "bg-green-600", 
      error: "bg-red-600", 
      warning: "bg-yellow-500 text-black", 
      info: "bg-blue-600", 
      icon: { success: "✅", error: "❌", warning: "⚠️", info: "ℹ️" } 
    },
    minimal: { 
      base: "flex items-center gap-3 text-sm p-3 border-l-4 bg-white shadow-sm relative", 
      success: "border-green-500 text-green-800", 
      error: "border-red-500 text-red-800", 
      warning: "border-yellow-500 text-yellow-800", 
      info: "border-blue-500 text-blue-800", 
      icon: { success: "✔️", error: "✖️", warning: "⚠️", info: "ℹ️" } 
    },
    cyberpunk: { 
      base: "flex items-center gap-3 p-4 rounded shadow bg-black text-pink-500 border border-pink-400", 
      success: "text-green-400 border-green-300", 
      error: "text-red-400 border-red-300", 
      warning: "text-yellow-400 border-yellow-300", 
      info: "text-cyan-400 border-cyan-300", 
      icon: { success: "🧬", error: "💀", warning: "⚡", info: "🤖" } 
    },
    pastel: { 
      base: "flex items-center gap-3 p-4 rounded shadow bg-pink-50 border text-pink-700", 
      success: "border-green-200 text-green-700", 
      error: "border-red-200 text-red-700", 
      warning: "border-yellow-200 text-yellow-700", 
      info: "border-blue-200 text-blue-700", 
      icon: { success: "🍃", error: "🍓", warning: "🍋", info: "🫐" } 
    },
    terminal: { 
      base: "flex items-center gap-3 bg-black text-green-400 p-4 rounded border border-green-600 font-mono shadow", 
      success: "text-green-500 border-green-400", 
      error: "text-red-500 border-red-400", 
      warning: "text-yellow-500 border-yellow-400", 
      info: "text-cyan-500 border-cyan-400", 
      icon: { success: "🖥️", error: "💣", warning: "⚠️", info: "📡" } 
    },
    aqua: { 
      base: "flex items-center gap-3 bg-gradient-to-r from-cyan-100 to-blue-200 text-blue-800 p-4 rounded shadow", 
      success: "border border-green-300", 
      error: "border border-red-300", 
      warning: "border border-yellow-300", 
      info: "border border-blue-300", 
      icon: { success: "💧", error: "🌊", warning: "💦", info: "🧊" } 
    },
    forest: { 
      base: "flex items-center gap-3 bg-green-100 text-green-900 border border-green-400 p-4 rounded shadow", 
      success: "border-green-600 text-green-800", 
      error: "border-red-600 text-red-800", 
      warning: "border-yellow-600 text-yellow-800", 
      info: "border-blue-600 text-blue-800", 
      icon: { success: "🌲", error: "🌋", warning: "🍂", info: "🌿" } 
    },
    luxury: { 
      base: "flex items-center gap-3 bg-gradient-to-r from-gray-900 to-black text-yellow-300 p-4 rounded shadow-lg border border-yellow-500", 
      success: "text-green-300 border-green-500", 
      error: "text-red-300 border-red-500", 
      warning: "text-yellow-300 border-yellow-500", 
      info: "text-blue-300 border-blue-500", 
      icon: { success: "👑", error: "💎", warning: "🪙", info: "🧿" } 
    },
    sports: { 
      base: "flex items-center gap-3 p-4 rounded shadow bg-white border-t-4", 
      success: "border-green-600 text-green-700", 
      error: "border-red-600 text-red-700", 
      warning: "border-yellow-600 text-yellow-700", 
      info: "border-blue-600 text-blue-700", 
      icon: { success: "🏆", error: "❌", warning: "⚠️", info: "🎯" } 
    },
    coffee: { 
      base: "flex items-center gap-3 p-4 rounded shadow bg-yellow-50 border", 
      success: "text-green-600 border-green-400", 
      error: "text-red-600 border-red-400", 
      warning: "text-yellow-600 border-yellow-400", 
      info: "text-blue-600 border-blue-400", 
      icon: { success: "☕", error: "🔥", warning: "⚠️", info: "💡" } 
    },
    sunset: { 
      base: "flex items-center gap-3 p-4 rounded shadow bg-gradient-to-r from-purple-400 to-orange-300 text-white", 
      success: "", 
      error: "", 
      warning: "", 
      info: "", 
      icon: { success: "🌅", error: "🌇", warning: "🌆", info: "🌄" } 
    },
    midnight: { 
      base: "flex items-center gap-3 p-4 rounded shadow bg-gray-800 text-white", 
      success: "border-green-500 text-green-300", 
      error: "border-red-500 text-red-300", 
      warning: "border-yellow-500 text-yellow-300", 
      info: "border-blue-500 text-blue-300", 
      icon: { success: "🌙", error: "💤", warning: "⭐", info: "✨" } 
    }
  };

  // ========================
  // ANIMATIONS (18 options)
  // ========================
  const animations = {
    slide: ["translate-x-full opacity-0", "translate-x-0 opacity-100"],
    fade: ["opacity-0", "opacity-100"],
    zoom: ["scale-50 opacity-0", "scale-100 opacity-100"],
    bounce: ["-translate-y-8 opacity-0", "translate-y-0 opacity-100"],
    flip: ["rotate-x-180 opacity-0", "rotate-x-0 opacity-100"],
    "flip-x": ["rotate-x-90 opacity-0", "rotate-x-0 opacity-100"],
    "flip-y": ["rotate-y-90 opacity-0", "rotate-y-0 opacity-100"],
    "slide-up": ["translate-y-full opacity-0", "translate-y-0 opacity-100"],
    "slide-down": ["-translate-y-full opacity-0", "translate-y-0 opacity-100"],
    "zoom-in": ["scale-0 opacity-0", "scale-100 opacity-100"],
    "zoom-out": ["scale-150 opacity-0", "scale-100 opacity-100"],
    pop: ["opacity-0 scale-75", "opacity-100 scale-100"],
    "bounce-up": ["translate-y-10 opacity-0", "translate-y-0 opacity-100"],
    stretch: ["scale-y-0", "scale-y-100 opacity-100"],
    drop: ["translate-y-[-30px] opacity-0", "translate-y-0 opacity-100"],
    roll: ["anim-roll", "", ""],
    jiggle: ["anim-jiggle", "", ""],
    swing: ["anim-swing", "", ""],
    pulse: ["anim-pulse", "", ""]
  };

  // ========================
  // POSITIONS (18 options)
  // ========================
  const positions = {
    "top-right": "top-5 right-5",
    "top-left": "top-5 left-5",
    "top-center": "top-5 left-1/2 -translate-x-1/2",
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "bottom-right": "bottom-5 right-5",
    "bottom-left": "bottom-5 left-5",
    "bottom-center": "bottom-5 left-1/2 -translate-x-1/2",
    "top-edge": "top-0 left-0 w-full flex justify-center",
    "bottom-edge": "bottom-0 left-0 w-full flex justify-center",
    "top-right-corner": "top-2 right-2",
    "top-left-corner": "top-2 left-2",
    "bottom-right-corner": "bottom-2 right-2",
    "bottom-left-corner": "bottom-2 left-2",
    "center-left": "top-1/2 left-2 -translate-y-1/2",
    "center-right": "top-1/2 right-2 -translate-y-1/2",
    "top-left-edge": "top-0 left-0 w-full flex justify-start",
    "bottom-right-edge": "bottom-0 right-0",
    "center-top": "top-0 left-1/2 -translate-x-1/2",
    "center-bottom": "bottom-0 left-1/2 -translate-x-1/2"
  };

  // ========================
  // PROGRESS BARS (18 options)
  // ========================
  const progressBars = {
    "default": "h-1 bg-black/20 rounded-b",
    "neon": "h-1 bg-green-400 animate-pulse",
    "glass": "h-1 bg-white/50",
    "bold": "h-1 bg-black",
    "rainbow": "h-1 bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500",
    "striped": "h-1 bg-gradient-to-r from-gray-300 to-gray-100 bg-[length:20px_20px] animate-pulse",
    "dotted": "h-1 bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[size:10px_10px]",
    "animated": "h-1 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 animate-pulse",
    "thick": "h-2 bg-black",
    "thin": "h-0.5 bg-gray-600",
    "white": "h-1 bg-white",
    "glassline": "h-1 bg-white/40 backdrop-blur-sm",
    "aqua": "h-1 bg-gradient-to-r from-cyan-400 to-blue-500",
    "fire": "h-1 bg-gradient-to-r from-yellow-500 via-red-500 to-pink-600",
    "carbon": "h-1 bg-gradient-to-r from-gray-700 to-gray-900",
    "pulse-stripe": "h-1 bg-gray-400 bg-[length:5px_5px] animate-pulse",
    "shine": "h-1 bg-white/50 animate-pulse",
    "pulse": "h-2 bg-green-400 animate-pulse",
    "gradient-stripe": "h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-[length:20px_20px] animate-pulse"
  };

  // ========================
  // CORE FUNCTION
  // ========================
  window.initSuperToasts = function(messages, options = {}) {
    const {
      theme = "classic",
      animation = "slide",
      position = "top-right",
      duration = 4000,
      showProgress = true,
      progressStyle = "neon",
      showClose = true,
      queueMode = "stack",
      darkMode = false,
      onClick = null
    } = options;

    const cfg = themes[theme] || themes.classic;
    const [startAnim, endAnim] = animations[animation] || animations.slide;
    const pb = progressBars[progressStyle] || progressBars.default;
    const cid = "toast-container-" + position.replace(/[^a-z]/gi, "");
    
    let container = document.getElementById(cid);
    if (!container) {
      container = document.createElement("div");
      container.id = cid;
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

      const icon = cfg.icon[type] || "";
      const toast = document.createElement("div");
      toast.className = `${cfg.base} ${cfg[type]} ${darkMode && cfg.dark?.[type] ? cfg.dark[type] : ""} transform ${startAnim} transition-all duration-500 toast`;

      toast.innerHTML = `
        <div class="text-xl">${icon}</div>
        <div class="flex-1 text-sm pr-6">${message}</div>
        ${showClose ? '<button class="absolute top-2 right-3 text-lg font-bold hover:opacity-50">&times;</button>' : ""}
      `;
      
      if (showProgress) {
        const progressDiv = document.createElement("div");
        progressDiv.className = `absolute bottom-0 left-0 ${pb} w-full toast-progress-animate`;
        progressDiv.style.animation = `shrink linear ${duration}ms forwards`;
        progressDiv.style.transformOrigin = "left";
        toast.appendChild(progressDiv);
      }


      // Add click handlers
      toast.querySelector("button")?.addEventListener("click", () => {
        toast.classList.add("toast-exit"); 
        setTimeout(() => toast.remove(), 400);
      });
      
      if (onClick) {
        toast.style.cursor = "pointer";
        toast.addEventListener("click", () => onClick({ type, message }));
      }

      container.appendChild(toast);

      // Animate in
      setTimeout(() => {
        toast.className = toast.className.replace(startAnim, endAnim);
        const pb = toast.querySelector(".toast-progress-animate");
        if (pb) {
          pb.style.animation = `shrink linear ${duration}ms forwards`;
          pb.style.transformOrigin = 'left';
        }
      }, 20);

      // Auto-remove after duration
      setTimeout(() => { 
        toast.classList.add("toast-exit"); 
        setTimeout(() => toast.remove(), 400); 
      }, duration);
    });
  };

  // ========================
  // HELPER FUNCTIONS
  // ========================
  window.clearAllToasts = function() {
    document.querySelectorAll('[id^="toast-container-"]').forEach(el => el.remove());
  };

  window.showToast = function(message, type = "info", options = {}) {
    initSuperToasts([{ message, tags: [type] }], options);
  };

})();
