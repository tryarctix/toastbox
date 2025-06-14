(function(){
  const themes = {}, positions = {}, progressBars = {}, animations = {};

  // Add animation styles for new animations
  const additionalAnimations = `
@keyframes flip-in {
  from { transform: perspective(400px) rotateY(90deg); opacity: 0; }
  to { transform: perspective(400px) rotateY(0deg); opacity: 1; }
}
@keyframes flip-out {
  from { transform: perspective(400px) rotateY(0deg); opacity: 1; }
  to { transform: perspective(400px) rotateY(90deg); opacity: 0; }
}
.animate-flip-in { animation: flip-in 0.4s ease-out forwards; }
.animate-flip-out { animation: flip-out 0.4s ease-in forwards; }

@keyframes swirl-in {
  from { transform: rotate(-540deg) scale(0); opacity: 0; }
  to { transform: rotate(0) scale(1); opacity: 1; }
}
@keyframes swirl-out {
  from { transform: rotate(0) scale(1); opacity: 1; }
  to { transform: rotate(540deg) scale(0); opacity: 0; }
}
.animate-swirl-in { animation: swirl-in 0.5s ease-out forwards; }
.animate-swirl-out { animation: swirl-out 0.5s ease-in forwards; }
`;

  const addAnimationStyles = () => {
    if (document.getElementById('toast-animation-styles')) return;
    const style = document.createElement('style');
    style.id = 'toast-animation-styles';
    style.textContent = `
@keyframes slide-in-right{from{transform:translateX(100%);opacity:0;}to{transform:translateX(0);opacity:1;}}
@keyframes slide-out-right{from{transform:translateX(0);opacity:1;}to{transform:translateX(100%);opacity:0;}}
.animate-slide-in-right{animation:slide-in-right 0.4s ease forwards;}
.animate-slide-out-right{animation:slide-out-right 0.4s ease forwards;}

@keyframes fade-in{from{opacity:0;}to{opacity:1;}}
@keyframes fade-out{from{opacity:1;}to{opacity:0;}}
.animate-fade-in{animation:fade-in 0.3s ease forwards;}
.animate-fade-out{animation:fade-out 0.3s ease forwards;}

@keyframes zoom-in{from{transform:scale(0.8);opacity:0;}to{transform:scale(1);opacity:1;}}
@keyframes zoom-out{from{transform:scale(1);opacity:1;}to{transform:scale(0.8);opacity:0;}}
.animate-zoom-in{animation:zoom-in 0.3s ease forwards;}
.animate-zoom-out{animation:zoom-out 0.3s ease forwards;}

@keyframes bounce-in{0%,100%{transform:scale(0.98);}50%{transform:scale(1.05);}}
@keyframes bounce-out{from{opacity:1;transform:scale(1);}to{opacity:0;transform:scale(0.3);}}
.animate-bounce-in{animation:bounce-in 0.5s cubic-bezier(.215,.610,.355,1) forwards;}
.animate-bounce-out{animation:bounce-out 0.3s ease forwards;}

@keyframes shrink{from{width:100%;}to{width:0%;}}
    ${additionalAnimations}
`;
    document.head.appendChild(style);
  };

  Object.assign(themes, {
    classic: {
      base: "p-4 rounded shadow bg-white text-gray-800 border",
      info: "border-blue-400 bg-blue-50 text-blue-800",
      success: "border-green-400 bg-green-50 text-green-800",
      error: "border-red-400 bg-red-50 text-red-800",
      warning: "border-yellow-400 bg-yellow-50 text-yellow-800",
      icon: { info: "ℹ️", success: "✔️", error: "❌", warning: "⚠️" }
    },
    minimal: {
      base: "p-3 rounded-md bg-white text-sm text-gray-700 border",
      info: "border-blue-200",
      success: "border-green-200",
      error: "border-red-200",
      warning: "border-yellow-200",
      icon: { info: "🆘", success: "✅", error: "❗", warning: "⚠️" }
    },
    material: {
      base: "p-4 rounded shadow-md text-white",
      info: "bg-blue-600",
      success: "bg-green-600",
      error: "bg-red-600",
      warning: "bg-yellow-600",
      icon: { info: "ℹ️", success: "✔️", error: "❌", warning: "⚠️" }
    },
    neon: {
      base: "p-4 rounded-lg shadow-lg border-2 font-mono text-lg",
      info: "border-blue-400 bg-blue-900 text-blue-300 shadow-blue-400/50",
      success: "border-green-400 bg-green-900 text-green-300 shadow-green-400/50",
      error: "border-red-400 bg-red-900 text-red-300 shadow-red-400/50",
      warning: "border-yellow-400 bg-yellow-900 text-yellow-300 shadow-yellow-400/50",
      icon: { info: "📡", success: "✨", error: "💥", warning: "⚡" }
    },
    pastel: {
      base: "p-4 rounded-xl shadow-md font-sans",
      info: "bg-blue-100 text-blue-600 border border-blue-200",
      success: "bg-green-100 text-green-600 border border-green-200",
      error: "bg-red-100 text-red-600 border border-red-200",
      warning: "bg-yellow-100 text-yellow-600 border border-yellow-200",
      icon: { info: "🌟", success: "🎨", error: "🎭", warning: "🌈" }
    }
  });

  Object.assign(positions, {
    "top-right": "top-5 right-5",
    "top-left": "top-5 left-5",
    "top-center": "top-5 left-1/2 transform -translate-x-1/2",
    "bottom-right": "bottom-5 right-5",
    "bottom-left": "bottom-5 left-5",
    "bottom-center": "bottom-5 left-1/2 transform -translate-x-1/2",
    center: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  });

  Object.assign(animations, {
    slide: ["animate-slide-in-right", "animate-slide-out-right"],
    fade: ["animate-fade-in", "animate-fade-out"],
    zoom: ["animate-zoom-in", "animate-zoom-out"],
    bounce: ["animate-bounce-in", "animate-bounce-out"],
    flip: ["animate-flip-in", "animate-flip-out"],
    swirl: ["animate-swirl-in", "animate-swirl-out"]
  });

  Object.assign(progressBars, {
    glassline: "absolute bottom-0 left-0 h-1 bg-blue-400 rounded-full opacity-40",
    solid: "absolute bottom-0 left-0 h-1 bg-green-500",
    thin: "absolute bottom-0 left-0 h-0.5 bg-gray-600",
    default: "absolute bottom-0 left-0 h-1 bg-black",
    neon: "absolute bottom-0 left-0 h-1 bg-blue-500 shadow-lg shadow-blue-500/50 rounded-full",
    rainbow: "absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
  });

  const createToast = (messageObj, options) => {
    const { message, tags = ["info"] } = messageObj;
    const type = tags[0] || "info";
    const theme = themes[options.theme] || themes.classic || {};
    const base = theme.base || "";
    const variant = theme[type] || "";
    const icon = theme.icon?.[type] || "";

    const toast = document.createElement("div");
    toast.className = `toast ${base} ${variant} overflow-hidden relative ${animations[options.animation]?.[0] || ""}`;

    const msgDiv = document.createElement("div");
    msgDiv.className = "toast-message flex items-center gap-2";
    msgDiv.innerHTML = icon ? `<span class="text-xl">${icon}</span><span>${message}</span>` : `<span>${message}</span>`;
    toast.appendChild(msgDiv);

    let dismissTimeout;
    if (options.showClose) {
      const closeBtn = document.createElement("button");
      closeBtn.innerHTML = '&times;';
      closeBtn.className = "absolute top-1 right-2 text-xl text-gray-700 hover:text-black cursor-pointer";
      closeBtn.onclick = () => {
        clearTimeout(dismissTimeout);
        toast.classList.add("toast-exit");
        setTimeout(() => toast.remove(), 200);
      };
      toast.appendChild(closeBtn);
    }

    let progress = null;
    if (options.showProgress) {
      progress = document.createElement("div");
      const progressClass = progressBars?.[options.progressStyle] ?? progressBars.default;
      progress.className = `toast-progress-animate ${progressClass}`;
      toast.appendChild(progress);
      setTimeout(() => {
        progress.style.animation = `shrink linear ${options.duration}ms forwards`;
      }, 10);
    }

    setTimeout(() => {
      const entry = animations[options.animation]?.[0] || "";
      const exit = animations[options.animation]?.[1] || "";
      toast.classList.remove(...entry.split(" ").filter(Boolean));
      // Remove this line that adds exit animation immediately
      // toast.classList.add(...exit.split(" ").filter(Boolean));
    }, 10);

    const startTime = Date.now();
    let remainingTime = options.duration;

    const dismiss = () => {
      const exit = animations[options.animation]?.[1] || "";
      toast.classList.add(...exit.split(" ").filter(Boolean));
      // Increase timeout to match animation duration
      setTimeout(() => toast.remove(), 400); // Changed from 200 to 400ms
    };

    dismissTimeout = setTimeout(dismiss, options.duration);

    let pauseTime = 0;

    toast.addEventListener("mouseenter", () => {
      clearTimeout(dismissTimeout);
      if (progress) {
        progress.style.animationPlayState = 'paused';
        pauseTime = Date.now();
      }
    });

    toast.addEventListener("mouseleave", () => {
      if (progress) {
        progress.style.animationPlayState = 'running';
        const pauseDuration = Date.now() - pauseTime;
        remainingTime = Math.max(0, remainingTime - pauseDuration);
      }
      dismissTimeout = setTimeout(dismiss, remainingTime);
    });

    return toast;
  };

  const initSuperToasts = function (messages, userOptions = {}) {
    if (!Array.isArray(messages)) return console.error("Messages must be an array");
    if (!messages.length) return console.warn("No messages provided");
    if (!document.getElementById('toast-animation-styles')) addAnimationStyles();

    const defaultOptions = {
      theme: "classic",
      animation: "slide",
      position: "top-right",
      duration: 4000,
      showProgress: true,
      progressStyle: "glassline",
      showClose: true,
      queueMode: "stack"
    };
    const options = { ...defaultOptions, ...userOptions };
    if (!themes[options.theme]) options.theme = "classic";

    messages.forEach(messageObj => {
      const toast = createToast(messageObj, options);
      const cid = "toast-container-" + options.position.replace(/[^a-z]/gi, "");
      let container = document.getElementById(cid);
      if (!container) {
        container = document.createElement("div");
        container.id = cid;
        container.className = `fixed z-50 space-y-3 w-full max-w-xs ${positions[options.position] || ""}`;
        document.body.appendChild(container);
      } else if (options.queueMode === "replace") {
        container.innerHTML = "";
      }
      container.appendChild(toast);
    });
  };

  const showToast = function (message, type = "info", options = {}) {
    initSuperToasts([{ message, tags: [type] }], options);
  };

  const clearAllToasts = function () {
    document.querySelectorAll('[id^="toast-container-"]').forEach(el => el.remove());
  };

  window.initSuperToasts = initSuperToasts;
  window.showToast = showToast;
  window.clearAllToasts = clearAllToasts;
})();
