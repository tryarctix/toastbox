/**
 * SuperToasts v2.0 - Complete Toast Notification System
 * Features: 20 themes, 18 animations, 18 positions, 18 progress styles
 * No dependencies - Works with Tailwind CSS
 */
(function () {
    // Browser support check
    if (!document.createElement || !document.body || !window) {
        console.error('Required browser features not available');
        return;
    }

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
    @keyframes roll {
  from { transform: translateX(-100%) rotate(-360deg); opacity: 0; }
  to { transform: translateX(0) rotate(0deg); opacity: 1; }
}
.animate-roll { animation: roll 0.8s ease-out; }

@keyframes jiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  75% { transform: rotate(-5deg); }
}
.animate-jiggle { animation: jiggle 0.6s ease-in-out; }

@keyframes swing {
  20% { transform: rotate(15deg); }
  40% { transform: rotate(-10deg); }
  60% { transform: rotate(5deg); }
  80% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
}
.animate-swing { animation: swing 0.8s ease-in-out; }

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.75; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-pulse { animation: pulse 1s ease-in-out; }

@keyframes flash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.animate-flash { animation: flash 1s linear; }

@keyframes wobble {
  0% { transform: translateX(0%); }
  15% { transform: translateX(-25%) rotate(-5deg); }
  30% { transform: translateX(20%) rotate(3deg); }
  45% { transform: translateX(-15%) rotate(-3deg); }
  60% { transform: translateX(10%) rotate(2deg); }
  75% { transform: translateX(-5%) rotate(-1deg); }
  100% { transform: translateX(0%); }
}
.animate-wobble { animation: wobble 0.9s ease-in-out; }

@keyframes tada {
  0% { transform: scale(1); }
  10%, 20% { transform: scale(0.9) rotate(-3deg); }
  30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
  40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
  100% { transform: scale(1) rotate(0); }
}
.animate-tada { animation: tada 1s ease-in-out; }

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  50% { transform: translateX(8px); }
  75% { transform: translateX(-4px); }
}
.animate-shake { animation: shake 0.5s ease-in-out; }

@keyframes swirl {
  from { transform: rotate(0deg) scale(0); opacity: 0; }
  to { transform: rotate(720deg) scale(1); opacity: 1; }
}
.animate-swirl { animation: swirl 1s ease-out; }

@keyframes explode {
  0% { transform: scale(0.5); opacity: 0; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); }
}
.animate-explode { animation: explode 0.6s ease-in-out; }

@keyframes rubber {
  0% { transform: scale3d(1, 1, 1); }
  30% { transform: scale3d(1.25, 0.75, 1); }
  40% { transform: scale3d(0.75, 1.25, 1); }
  50% { transform: scale3d(1.15, 0.85, 1); }
  65% { transform: scale3d(.95, 1.05, 1); }
  75% { transform: scale3d(1.05, .95, 1); }
  100% { transform: scale3d(1, 1, 1); }
}
.animate-rubber { animation: rubber 0.9s ease-in-out; }

@keyframes swirlin {
  0% { transform: rotate(-540deg) scale(0); opacity: 0; }
  100% { transform: rotate(0) scale(1); opacity: 1; }
}
.animate-swirlin { animation: swirlin 1s ease-in; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-float { animation: float 2s ease-in-out infinite; }

@keyframes flicker {
  0%, 100% { opacity: 1; }
  40% { opacity: 0.3; }
  60% { opacity: 0.9; }
}
.animate-flicker { animation: flicker 1.2s infinite; }

@keyframes drip {
  0% { transform: translateY(-30px); opacity: 0; }
  50% { transform: translateY(10px); }
  100% { transform: translateY(0); opacity: 1; }
}
.animate-drip { animation: drip 0.7s ease-out; }

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.animate-blink { animation: blink 0.5s step-end infinite; }

@keyframes vibrate {
  0% { transform: translateX(0); }
  20% { transform: translateX(-2px); }
  40% { transform: translateX(2px); }
  60% { transform: translateX(-2px); }
  80% { transform: translateX(2px); }
  100% { transform: translateX(0); }
}
.animate-vibrate { animation: vibrate 0.3s linear infinite; }

@keyframes glitch {
  0% { transform: translate(0); opacity: 1; }
  20% { transform: translate(-3px, 2px); }
  40% { transform: translate(3px, -2px); opacity: 0.8; }
  60% { transform: translate(-1px, 1px); }
  80% { transform: translate(1px, -1px); }
  100% { transform: translate(0); opacity: 1; }
}
.animate-glitch { animation: glitch 0.4s steps(2, end) infinite; }

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
            icon: { success: "✔️", error: "✖️", warning: "⚠️", info: "ℹ️" }
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
            icon: { success: "✓", error: "✕", warning: "!", info: "i" }
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
        },
        ocean: {
            base: "flex items-center gap-3 bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-100 text-blue-900 p-4 rounded shadow",
            success: "border border-green-300",
            error: "border border-red-300",
            warning: "border border-yellow-300",
            info: "border border-blue-400",
            icon: { success: "🐬", error: "🦑", warning: "🪼", info: "🌊" }
        },
        pixel: {
            base: "flex items-center gap-3 bg-white border p-4 rounded shadow font-mono text-xs tracking-tight",
            success: "border-green-500 text-green-700",
            error: "border-red-500 text-red-700",
            warning: "border-yellow-500 text-yellow-700",
            info: "border-blue-500 text-blue-700",
            icon: { success: "🟩", error: "🟥", warning: "🟨", info: "🟦" }
        },
        monochrome: {
            base: "flex items-center gap-3 bg-gray-100 text-gray-800 p-4 rounded shadow border",
            success: "border-gray-400",
            error: "border-gray-500",
            warning: "border-gray-600",
            info: "border-gray-300",
            icon: { success: "✅", error: "❌", warning: "⚠️", info: "ℹ️" }
        },
        nature: {
            base: "flex items-center gap-3 bg-green-50 border border-green-300 text-green-800 p-4 rounded shadow",
            success: "border-green-600",
            error: "border-red-600 text-red-800",
            warning: "border-yellow-600 text-yellow-800",
            info: "border-blue-600 text-blue-800",
            icon: { success: "🌳", error: "🔥", warning: "🍁", info: "💧" }
        },
        candy: {
            base: "flex items-center gap-3 bg-pink-200 text-pink-900 p-4 rounded-lg shadow border border-pink-400",
            success: "text-green-800 border-green-400",
            error: "text-red-800 border-red-400",
            warning: "text-yellow-800 border-yellow-400",
            info: "text-blue-800 border-blue-400",
            icon: { success: "🍬", error: "🍭", warning: "🍡", info: "🧁" }
        },
        paper: {
            base: "flex items-center gap-3 bg-white text-black p-4 rounded shadow border border-gray-300",
            success: "border-l-4 border-green-400",
            error: "border-l-4 border-red-400",
            warning: "border-l-4 border-yellow-400",
            info: "border-l-4 border-blue-400",
            icon: { success: "📄", error: "📕", warning: "📒", info: "📘" }
        },
        galaxy: {
            base: "flex items-center gap-3 bg-gradient-to-br from-indigo-800 to-purple-900 text-white p-4 rounded shadow border border-indigo-400",
            success: "text-green-300 border-green-500",
            error: "text-red-300 border-red-500",
            warning: "text-yellow-300 border-yellow-500",
            info: "text-cyan-300 border-cyan-500",
            icon: { success: "🌌", error: "🌠", warning: "🪐", info: "🚀" }
        },
        cartoon: {
            base: "flex items-center gap-3 bg-yellow-100 text-black p-4 rounded shadow border border-black font-bold",
            success: "border-green-500",
            error: "border-red-500",
            warning: "border-yellow-500",
            info: "border-blue-500",
            icon: { success: "😄", error: "😡", warning: "😮", info: "😎" }
        },
        muted: {
            base: "flex items-center gap-3 bg-gray-100 text-gray-700 p-4 rounded shadow-sm border border-gray-300",
            success: "text-green-700 border-green-300",
            error: "text-red-700 border-red-300",
            warning: "text-yellow-700 border-yellow-300",
            info: "text-blue-700 border-blue-300",
            icon: { success: "✔️", error: "✖️", warning: "⚠️", info: "ℹ️" }
        },
        fiesta: {
            base: "flex items-center gap-3 bg-gradient-to-r from-red-300 via-yellow-300 to-green-300 text-black p-4 rounded shadow border border-red-400",
            success: "border-green-500 text-green-900",
            error: "border-red-500 text-red-900",
            warning: "border-yellow-500 text-yellow-900",
            info: "border-blue-500 text-blue-900",
            icon: { success: "🎉", error: "🎭", warning: "🎈", info: "🎊" }
        },
        blush: {
            base: "flex items-center gap-3 bg-pink-100 text-pink-900 p-4 rounded shadow border border-pink-300",
            success: "border-green-400 text-green-700",
            error: "border-red-400 text-red-700",
            warning: "border-yellow-400 text-yellow-700",
            info: "border-blue-400 text-blue-700",
            icon: {
                success: '<i class="fas fa-heart-circle-check"></i>',
                error: '<i class="fas fa-heart-crack"></i>',
                warning: '<i class="fas fa-heart"></i>',
                info: '<i class="fas fa-comment-heart"></i>'
            }
        },
        shadow: {
            base: "flex items-center gap-3 bg-gray-900 text-gray-100 p-4 rounded shadow-2xl border border-gray-700",
            success: "text-green-300 border-green-600",
            error: "text-red-300 border-red-600",
            warning: "text-yellow-300 border-yellow-600",
            info: "text-blue-300 border-blue-600",
            icon: {
                success: '<i class="fas fa-check-double"></i>',
                error: '<i class="fas fa-times-circle"></i>',
                warning: '<i class="fas fa-exclamation-triangle"></i>',
                info: '<i class="fas fa-info-circle"></i>'
            }
        },
        lime: {
            base: "flex items-center gap-3 bg-lime-100 text-lime-900 p-4 rounded shadow border border-lime-300",
            success: "border-green-500 text-green-700",
            error: "border-red-500 text-red-700",
            warning: "border-yellow-500 text-yellow-700",
            info: "border-blue-500 text-blue-700",
            icon: {
                success: '<i class="fas fa-leaf"></i>',
                error: '<i class="fas fa-bug"></i>',
                warning: '<i class="fas fa-seedling"></i>',
                info: '<i class="fas fa-spa"></i>'
            }
        },
        comic: {
            base: "flex items-center gap-3 bg-white p-4 border border-black rounded shadow font-comic-sans text-black",
            success: "border-green-600 text-green-800",
            error: "border-red-600 text-red-800",
            warning: "border-yellow-600 text-yellow-800",
            info: "border-blue-600 text-blue-800",
            icon: {
                success: '<i class="fas fa-smile-beam"></i>',
                error: '<i class="fas fa-dizzy"></i>',
                warning: '<i class="fas fa-meh-blank"></i>',
                info: '<i class="fas fa-grin-alt"></i>'
            }
        },
        pixelated: {
            base: "flex items-center gap-3 bg-white p-4 rounded shadow border border-gray-300 font-pixel text-xs",
            success: "border-green-500 text-green-700",
            error: "border-red-500 text-red-700",
            warning: "border-yellow-500 text-yellow-700",
            info: "border-blue-500 text-blue-700",
            icon: { success: "🟩", error: "🟥", warning: "🟨", info: "🟦" }
        },
        vintage: {
            base: "flex items-center gap-3 bg-amber-100 text-amber-900 p-4 rounded shadow border border-amber-300",
            success: "border-green-500 text-green-800",
            error: "border-red-500 text-red-800",
            warning: "border-yellow-500 text-yellow-800",
            info: "border-blue-500 text-blue-800",
            icon: {
                success: '<i class="fas fa-feather-alt"></i>',
                error: '<i class="fas fa-radio"></i>',
                warning: '<i class="fas fa-tape"></i>',
                info: '<i class="fas fa-tv-retro"></i>'
            }
        },
        iceberg: {
            base: "flex items-center gap-3 bg-blue-50 text-blue-900 p-4 rounded shadow border border-blue-200",
            success: "border-green-300 text-green-700",
            error: "border-red-300 text-red-700",
            warning: "border-yellow-300 text-yellow-700",
            info: "border-cyan-300 text-cyan-700",
            icon: {
                success: '<i class="fas fa-snowflake"></i>',
                error: '<i class="fas fa-temperature-low"></i>',
                warning: '<i class="fas fa-icicles"></i>',
                info: '<i class="fas fa-mountain"></i>'
            }
        },
        tropical: {
            base: "flex items-center gap-3 bg-gradient-to-r from-yellow-100 via-green-100 to-teal-100 text-green-800 p-4 rounded shadow border",
            success: "border-green-400",
            error: "border-red-400",
            warning: "border-yellow-400",
            info: "border-blue-400",
            icon: {
                success: '<i class="fas fa-umbrella-beach"></i>',
                error: '<i class="fas fa-sun"></i>',
                warning: '<i class="fas fa-cloud-sun"></i>',
                info: '<i class="fas fa-palm-tree"></i>'
            }
        },
        arcade: {
            base: "flex items-center gap-3 bg-black text-lime-400 p-4 rounded border border-lime-600 shadow-lg font-mono",
            success: "text-green-400 border-green-600",
            error: "text-red-400 border-red-600",
            warning: "text-yellow-400 border-yellow-600",
            info: "text-cyan-400 border-cyan-600",
            icon: {
                success: '<i class="fas fa-gamepad"></i>',
                error: '<i class="fas fa-bomb"></i>',
                warning: '<i class="fas fa-space-shuttle"></i>',
                info: '<i class="fas fa-robot"></i>'
            }
        },
        metro: {
            base: "flex items-center gap-3 bg-white text-gray-900 p-4 border-l-8 rounded shadow border-blue-500",
            success: "border-green-600 text-green-800",
            error: "border-red-600 text-red-800",
            warning: "border-yellow-600 text-yellow-800",
            info: "border-blue-600 text-blue-800",
            icon: {
                success: '<i class="fas fa-check-circle"></i>',
                error: '<i class="fas fa-times-circle"></i>',
                warning: '<i class="fas fa-exclamation-circle"></i>',
                info: '<i class="fas fa-info-circle"></i>'
            }
        },
        chalkboard: {
            base: "flex items-center gap-3 bg-green-900 text-white p-4 rounded shadow border border-white font-mono",
            success: "text-green-200 border-green-400",
            error: "text-red-200 border-red-400",
            warning: "text-yellow-200 border-yellow-400",
            info: "text-blue-200 border-blue-400",
            icon: {
                success: '<i class="fas fa-chalkboard-teacher"></i>',
                error: '<i class="fas fa-eraser"></i>',
                warning: '<i class="fas fa-ruler"></i>',
                info: '<i class="fas fa-book-open"></i>'
            }
        },
        monochrome: {
            base: "flex items-center gap-3 p-4 rounded bg-white text-gray-800 border shadow",
            success: "border-gray-300",
            error: "border-gray-400",
            warning: "border-gray-500",
            info: "border-gray-600",
            icon: {
                success: "<i class='fas fa-check-circle'></i>",
                error: "<i class='fas fa-times-circle'></i>",
                warning: "<i class='fas fa-exclamation-triangle'></i>",
                info: "<i class='fas fa-info-circle'></i>"
            }
        },
        fire: {
            base: "flex items-center gap-3 p-4 rounded shadow text-white bg-gradient-to-br from-red-600 to-orange-500",
            success: "border border-orange-200",
            error: "border border-red-300",
            warning: "border border-yellow-300",
            info: "border border-white/40",
            icon: {
                success: "<i class='fas fa-fire'></i>",
                error: "<i class='fas fa-bomb'></i>",
                warning: "<i class='fas fa-burn'></i>",
                info: "<i class='fas fa-flame'></i>"
            }
        },
        arctic: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-blue-50 text-blue-900 border",
            success: "border-blue-300",
            error: "border-red-300",
            warning: "border-yellow-300",
            info: "border-cyan-300",
            icon: {
                success: "<i class='fas fa-snowflake'></i>",
                error: "<i class='fas fa-icicles'></i>",
                warning: "<i class='fas fa-thermometer-empty'></i>",
                info: "<i class='fas fa-temperature-low'></i>"
            }
        },
        fruity: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-white border text-black",
            success: "border-green-400",
            error: "border-red-400",
            warning: "border-yellow-400",
            info: "border-purple-400",
            icon: {
                success: "<i class='fas fa-apple-alt'></i>",
                error: "<i class='fas fa-cherry'></i>",
                warning: "<i class='fas fa-lemon'></i>",
                info: "<i class='fas fa-grape'></i>"
            }
        },
        elegant: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-gradient-to-r from-gray-700 to-black text-white border",
            success: "border-green-500",
            error: "border-red-500",
            warning: "border-yellow-500",
            info: "border-blue-500",
            icon: {
                success: "<i class='fas fa-check-double'></i>",
                error: "<i class='fas fa-skull-crossbones'></i>",
                warning: "<i class='fas fa-exclamation'></i>",
                info: "<i class='fas fa-info'></i>"
            }
        },
        bamboo: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-green-50 text-green-800 border border-green-200",
            success: "border-green-400",
            error: "border-red-400",
            warning: "border-yellow-400",
            info: "border-blue-400",
            icon: {
                success: "<i class='fas fa-leaf'></i>",
                error: "<i class='fas fa-axe'></i>",
                warning: "<i class='fas fa-tree'></i>",
                info: "<i class='fas fa-seedling'></i>"
            }
        },
        metal: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900 border",
            success: "border-green-700",
            error: "border-red-700",
            warning: "border-yellow-700",
            info: "border-blue-700",
            icon: {
                success: "<i class='fas fa-bolt'></i>",
                error: "<i class='fas fa-radiation'></i>",
                warning: "<i class='fas fa-battery-quarter'></i>",
                info: "<i class='fas fa-magnet'></i>"
            }
        },
        chocolate: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-yellow-100 text-brown-800 border border-brown-400",
            success: "border-green-600",
            error: "border-red-600",
            warning: "border-yellow-600",
            info: "border-orange-600",
            icon: {
                success: "<i class='fas fa-cookie-bite'></i>",
                error: "<i class='fas fa-candy-cane'></i>",
                warning: "<i class='fas fa-ice-cream'></i>",
                info: "<i class='fas fa-mug-hot'></i>"
            }
        },
        wave: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-gradient-to-r from-cyan-500 to-blue-500 text-white",
            success: "border border-cyan-300",
            error: "border border-red-300",
            warning: "border border-yellow-300",
            info: "border border-white",
            icon: {
                success: "<i class='fas fa-water'></i>",
                error: "<i class='fas fa-tsunami'></i>",
                warning: "<i class='fas fa-wind'></i>",
                info: "<i class='fas fa-fish'></i>"
            }
        },
        cybergrid: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-black text-green-300 border border-green-600 font-mono",
            success: "border-green-400",
            error: "border-red-400",
            warning: "border-yellow-400",
            info: "border-cyan-400",
            icon: {
                success: "<i class='fas fa-dna'></i>",
                error: "<i class='fas fa-virus'></i>",
                warning: "<i class='fas fa-bug'></i>",
                info: "<i class='fas fa-terminal'></i>"
            }
        },
        vaporwave: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white border border-white/30",
            success: "border-green-300",
            error: "border-red-300",
            warning: "border-yellow-300",
            info: "border-blue-300",
            icon: {
                success: "<i class='fas fa-heart'></i>",
                error: "<i class='fas fa-skull'></i>",
                warning: "<i class='fas fa-bolt'></i>",
                info: "<i class='fas fa-music'></i>"
            }
        },
        gamer: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-gray-900 text-lime-400 font-mono border border-lime-500",
            success: "border-green-400",
            error: "border-red-400",
            warning: "border-yellow-400",
            info: "border-cyan-400",
            icon: {
                success: "<i class='fas fa-gamepad'></i>",
                error: "<i class='fas fa-bug'></i>",
                warning: "<i class='fas fa-crosshairs'></i>",
                info: "<i class='fas fa-question'></i>"
            }
        },
        ocean: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-gradient-to-r from-blue-300 to-cyan-200 text-blue-900 border",
            success: "border-green-300",
            error: "border-red-300",
            warning: "border-yellow-300",
            info: "border-cyan-400",
            icon: {
                success: "<i class='fas fa-fish'></i>",
                error: "<i class='fas fa-anchor'></i>",
                warning: "<i class='fas fa-life-ring'></i>",
                info: "<i class='fas fa-ship'></i>"
            }
        },
        nature: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-green-50 text-green-800 border border-green-200",
            success: "border-green-600",
            error: "border-red-600",
            warning: "border-yellow-600",
            info: "border-blue-600",
            icon: {
                success: "<i class='fas fa-seedling'></i>",
                error: "<i class='fas fa-fire-flame-curved'></i>",
                warning: "<i class='fas fa-mountain-sun'></i>",
                info: "<i class='fas fa-cloud-sun'></i>"
            }
        },
        rainbow: {
            base: "flex items-center gap-3 p-4 rounded shadow text-white bg-gradient-to-r from-red-500 via-yellow-400 to-green-500",
            success: "border border-white/40",
            error: "border border-white/40",
            warning: "border border-white/40",
            info: "border border-white/40",
            icon: {
                success: "<i class='fas fa-rainbow'></i>",
                error: "<i class='fas fa-cloud-showers-heavy'></i>",
                warning: "<i class='fas fa-cloud-bolt'></i>",
                info: "<i class='fas fa-cloud-sun-rain'></i>"
            }
        },
        tech: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-gray-800 text-blue-300 border border-blue-500",
            success: "border-green-500 text-green-300",
            error: "border-red-500 text-red-300",
            warning: "border-yellow-500 text-yellow-300",
            info: "border-cyan-500 text-cyan-300",
            icon: {
                success: "<i class='fas fa-microchip'></i>",
                error: "<i class='fas fa-server'></i>",
                warning: "<i class='fas fa-database'></i>",
                info: "<i class='fas fa-code'></i>"
            }
        },
        aurora: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-gradient-to-r from-indigo-500 via-sky-400 to-green-300 text-white border border-white/20",
            success: "border border-white/30",
            error: "border border-white/30",
            warning: "border border-white/30",
            info: "border border-white/30",
            icon: {
                success: "<i class='fas fa-star'></i>",
                error: "<i class='fas fa-meteor'></i>",
                warning: "<i class='fas fa-asterisk'></i>",
                info: "<i class='fas fa-sun'></i>"
            }
        },
        ink: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-white text-black border border-black",
            success: "border-black",
            error: "border-black",
            warning: "border-black",
            info: "border-black",
            icon: {
                success: "<i class='fas fa-pen-nib'></i>",
                error: "<i class='fas fa-eraser'></i>",
                warning: "<i class='fas fa-highlighter'></i>",
                info: "<i class='fas fa-book'></i>"
            }
        },
        holiday: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-red-50 text-red-800 border border-red-200",
            success: "border-green-300 text-green-800",
            error: "border-red-400 text-red-800",
            warning: "border-yellow-300 text-yellow-800",
            info: "border-blue-300 text-blue-800",
            icon: {
                success: "<i class='fas fa-gift'></i>",
                error: "<i class='fas fa-sleigh'></i>",
                warning: "<i class='fas fa-snowman'></i>",
                info: "<i class='fas fa-holly-berry'></i>"
            }
        },
        galaxy: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-gradient-to-r from-black via-purple-900 to-blue-900 text-white border border-white/20",
            success: "text-green-300 border-green-600",
            error: "text-pink-300 border-pink-600",
            warning: "text-yellow-300 border-yellow-600",
            info: "text-blue-300 border-blue-600",
            icon: {
                success: "<i class='fas fa-star-and-crescent'></i>",
                error: "<i class='fas fa-meteor'></i>",
                warning: "<i class='fas fa-satellite-dish'></i>",
                info: "<i class='fas fa-globe'></i>"
            }
        }, vintage: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-yellow-100 text-brown-700 font-serif border border-yellow-500",
            success: "border-green-600 text-green-800",
            error: "border-red-600 text-red-800",
            warning: "border-yellow-600 text-yellow-900",
            info: "border-blue-600 text-blue-900",
            icon: {
                success: "<i class='fas fa-thumbs-up'></i>",
                error: "<i class='fas fa-thumbs-down'></i>",
                warning: "<i class='fas fa-exclamation-triangle'></i>",
                info: "<i class='fas fa-info-circle'></i>"
            }
        },
        social: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-white text-gray-800 border",
            success: "border-green-400",
            error: "border-red-400",
            warning: "border-yellow-400",
            info: "border-blue-400",
            icon: {
                success: "<i class='fab fa-instagram'></i>",
                error: "<i class='fab fa-twitter'></i>",
                warning: "<i class='fab fa-facebook'></i>",
                info: "<i class='fab fa-linkedin'></i>"
            }
        },
        ice: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-blue-50 text-blue-800 border border-blue-200",
            success: "border-green-300",
            error: "border-red-300",
            warning: "border-yellow-300",
            info: "border-blue-400",
            icon: {
                success: "<i class='fas fa-snowflake'></i>",
                error: "<i class='fas fa-icicles'></i>",
                warning: "<i class='fas fa-ice-cream'></i>",
                info: "<i class='fas fa-temperature-low'></i>"
            }
        },
        noir: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-black text-white border border-white/20",
            success: "text-green-400 border-green-600",
            error: "text-red-400 border-red-600",
            warning: "text-yellow-400 border-yellow-600",
            info: "text-blue-400 border-blue-600",
            icon: {
                success: "<i class='fas fa-user-secret'></i>",
                error: "<i class='fas fa-skull-crossbones'></i>",
                warning: "<i class='fas fa-mask'></i>",
                info: "<i class='fas fa-eye'></i>"
            }
        },
        zen: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-green-50 text-green-700 border border-green-200",
            success: "border-green-400",
            error: "border-red-300",
            warning: "border-yellow-300",
            info: "border-blue-300",
            icon: {
                success: "<i class='fas fa-leaf'></i>",
                error: "<i class='fas fa-wind'></i>",
                warning: "<i class='fas fa-water'></i>",
                info: "<i class='fas fa-spa'></i>"
            }
        },
        lava: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-gradient-to-r from-red-800 via-orange-600 to-yellow-400 text-white border border-yellow-500",
            success: "text-green-200 border-green-400",
            error: "text-red-200 border-red-400",
            warning: "text-yellow-200 border-yellow-400",
            info: "text-blue-200 border-blue-400",
            icon: {
                success: "<i class='fas fa-fire'></i>",
                error: "<i class='fas fa-volcano'></i>",
                warning: "<i class='fas fa-fire-extinguisher'></i>",
                info: "<i class='fas fa-hot-tub'></i>"
            }
        },
        chrome: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-gradient-to-br from-gray-200 to-gray-400 text-gray-900 border border-gray-500",
            success: "text-green-700 border-green-500",
            error: "text-red-700 border-red-500",
            warning: "text-yellow-700 border-yellow-500",
            info: "text-blue-700 border-blue-500",
            icon: {
                success: "<i class='fas fa-check-circle'></i>",
                error: "<i class='fas fa-times-circle'></i>",
                warning: "<i class='fas fa-exclamation-circle'></i>",
                info: "<i class='fas fa-info'></i>"
            }
        },
        space: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-gradient-to-r from-black via-indigo-900 to-purple-800 text-white border border-white/10",
            success: "text-green-300 border-green-500",
            error: "text-red-300 border-red-500",
            warning: "text-yellow-300 border-yellow-500",
            info: "text-blue-300 border-blue-500",
            icon: {
                success: "<i class='fas fa-rocket'></i>",
                error: "<i class='fas fa-comet'></i>",
                warning: "<i class='fas fa-satellite'></i>",
                info: "<i class='fas fa-planet-ringed'></i>"
            }
        },
        festival: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-gradient-to-br from-yellow-200 via-red-200 to-pink-200 text-red-800 border border-yellow-400",
            success: "border-green-400 text-green-800",
            error: "border-red-400 text-red-800",
            warning: "border-yellow-400 text-yellow-900",
            info: "border-blue-400 text-blue-900",
            icon: {
                success: "<i class='fas fa-gifts'></i>",
                error: "<i class='fas fa-explosion'></i>",
                warning: "<i class='fas fa-fireworks'></i>",
                info: "<i class='fas fa-birthday-cake'></i>"
            }
        },
        books: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-orange-50 text-orange-900 border border-orange-300",
            success: "border-green-400",
            error: "border-red-400",
            warning: "border-yellow-400",
            info: "border-blue-400",
            icon: {
                success: "<i class='fas fa-book-open'></i>",
                error: "<i class='fas fa-book-dead'></i>",
                warning: "<i class='fas fa-book-atlas'></i>",
                info: "<i class='fas fa-book'></i>"
            }
        },
        naruto: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-orange-100 text-orange-900 border border-orange-400",
            success: "border-yellow-500 text-yellow-800",
            error: "border-red-500 text-red-800",
            warning: "border-orange-500 text-orange-900",
            info: "border-blue-500 text-blue-800",
            icon: {
                success: "<i class='fas fa-fire'></i>",       // Rasengan
                error: "<i class='fas fa-skull-crossbones'></i>", // Akatsuki
                warning: "<i class='fas fa-exclamation'></i>",   // Danger
                info: "<i class='fas fa-eye'></i>"           // Sharingan
            }
        },
        onepiece: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-yellow-100 text-yellow-900 border border-yellow-500",
            success: "border-blue-500 text-blue-700",
            error: "border-red-500 text-red-700",
            warning: "border-orange-500 text-orange-700",
            info: "border-green-500 text-green-700",
            icon: {
                success: "<i class='fas fa-anchor'></i>",
                error: "<i class='fas fa-skull'></i>",        // Jolly Roger
                warning: "<i class='fas fa-exclamation-triangle'></i>",
                info: "<i class='fas fa-map'></i>"            // Grand Line
            }
        },
        demonSlayer: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-pink-100 text-pink-900 border border-pink-400",
            success: "border-green-400 text-green-800",
            error: "border-red-500 text-red-800",
            warning: "border-yellow-500 text-yellow-800",
            info: "border-blue-500 text-blue-800",
            icon: {
                success: "<i class='fas fa-fan'></i>",        // Nezuko's motif
                error: "<i class='fas fa-skull'></i>",
                warning: "<i class='fas fa-fire'></i>",
                info: "<i class='fas fa-water'></i>"          // Water Breathing
            }
        },
        deathNote: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-black text-white border border-gray-700 font-mono",
            success: "border-green-500 text-green-300",
            error: "border-red-500 text-red-300",
            warning: "border-yellow-500 text-yellow-300",
            info: "border-blue-500 text-blue-300",
            icon: {
                success: "<i class='fas fa-pen-nib'></i>",
                error: "<i class='fas fa-book-dead'></i>",
                warning: "<i class='fas fa-cross'></i>",
                info: "<i class='fas fa-question'></i>"
            }
        },
        aot: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-gray-900 text-white border border-green-700",
            success: "border-green-500 text-green-300",
            error: "border-red-600 text-red-300",
            warning: "border-yellow-600 text-yellow-300",
            info: "border-blue-600 text-blue-300",
            icon: {
                success: "<i class='fas fa-shield-alt'></i>",     // Survey Corps
                error: "<i class='fas fa-bolt'></i>",              // Titan Attack
                warning: "<i class='fas fa-dungeon'></i>",
                info: "<i class='fas fa-landmark'></i>"
            }
        },
        bleach: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-white text-black border border-orange-400",
            success: "border-green-500 text-green-800",
            error: "border-red-500 text-red-800",
            warning: "border-yellow-500 text-yellow-800",
            info: "border-blue-500 text-blue-800",
            icon: {
                success: "<i class='fas fa-wind'></i>",      // Zangetsu
                error: "<i class='fas fa-ghost'></i>",        // Hollow
                warning: "<i class='fas fa-burn'></i>",
                info: "<i class='fas fa-sun'></i>"
            }
        },
        mha: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-green-100 text-green-900 border border-green-400",
            success: "border-yellow-500 text-yellow-800",
            error: "border-red-500 text-red-800",
            warning: "border-orange-500 text-orange-800",
            info: "border-blue-500 text-blue-800",
            icon: {
                success: "<i class='fas fa-fist-raised'></i>",    // One For All
                error: "<i class='fas fa-bomb'></i>",             // Bakugo
                warning: "<i class='fas fa-lightbulb'></i>",
                info: "<i class='fas fa-book'></i>"
            }
        },
        jujutsu: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-indigo-100 text-indigo-900 border border-indigo-400",
            success: "border-green-500 text-green-800",
            error: "border-red-500 text-red-800",
            warning: "border-yellow-500 text-yellow-800",
            info: "border-blue-500 text-blue-800",
            icon: {
                success: "<i class='fas fa-eye'></i>",          // Sukuna
                error: "<i class='fas fa-virus'></i>",
                warning: "<i class='fas fa-magic'></i>",
                info: "<i class='fas fa-scroll'></i>"
            }
        },
        dragonBall: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-yellow-200 text-orange-900 border border-orange-500",
            success: "border-green-500 text-green-800",
            error: "border-red-500 text-red-800",
            warning: "border-yellow-600 text-yellow-900",
            info: "border-blue-500 text-blue-800",
            icon: {
                success: "<i class='fas fa-star'></i>",         // Dragon Ball
                error: "<i class='fas fa-fire-alt'></i>",       // Kamehameha
                warning: "<i class='fas fa-meteor'></i>",
                info: "<i class='fas fa-dragon'></i>"
            }
        },
        tokyoGhoul: {
            base: "flex items-center gap-3 p-4 rounded shadow bg-gray-900 text-white border border-red-600",
            success: "border-green-500 text-green-300",
            error: "border-red-500 text-red-300",
            warning: "border-yellow-500 text-yellow-300",
            info: "border-blue-500 text-blue-300",
            icon: {
                success: "<i class='fas fa-mask'></i>",
                error: "<i class='fas fa-skull-crossbones'></i>",
                warning: "<i class='fas fa-eye'></i>",
                info: "<i class='fas fa-lightbulb'></i>"
            }
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

        roll: ["animate-roll", ""],
        jiggle: ["animate-jiggle", ""],
        swing: ["animate-swing", ""],
        pulse: ["animate-pulse", ""],
        flash: ["animate-flash", ""],
        wobble: ["animate-wobble", ""],
        tada: ["animate-tada", ""],
        shake: ["animate-shake", ""],
        swirl: ["animate-swirl", ""],
        explode: ["animate-explode", ""],
        rubber: ["animate-rubber", ""],
        swirlin: ["animate-swirlin", ""],
        float: ["animate-float", ""],
        flicker: ["animate-flicker", ""],
        drip: ["animate-drip", ""],
        blink: ["animate-blink", ""],
        vibrate: ["animate-vibrate", ""],
        glitch: ["animate-glitch", ""],
    };


    // ========================
    // POSITIONS (18 options)
    // ========================
    const positions = {
        // Original Positions
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
        "center-bottom": "bottom-0 left-1/2 -translate-x-1/2",
        "center-top-left": "top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2",
        "center-top-right": "top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2",
        "center-bottom-left": "bottom-1/4 left-1/4 -translate-x-1/2 translate-y-1/2",
        "center-bottom-right": "bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2",
        "middle-left-edge": "top-1/2 left-0 -translate-y-1/2 flex justify-start",
        "middle-right-edge": "top-1/2 right-0 -translate-y-1/2 flex justify-end",
        "center-screen": "inset-0 flex justify-center items-center",
        "middle-top": "top-1/3 left-1/2 -translate-x-1/2",
        "middle-bottom": "bottom-1/3 left-1/2 -translate-x-1/2",
        "floating-center": "top-[40%] left-1/2 -translate-x-1/2",
        "floating-center-bottom": "top-[60%] left-1/2 -translate-x-1/2",
        "left-edge": "top-0 bottom-0 left-0 flex flex-col justify-center",
        "right-edge": "top-0 bottom-0 right-0 flex flex-col justify-center",
        "mobile-top": "top-4 left-4 right-4",
        "mobile-bottom": "bottom-4 left-4 right-4",
        "top-stacked-right": "top-5 right-5 flex flex-col space-y-2",
        "top-stacked-left": "top-5 left-5 flex flex-col space-y-2",
        "bottom-stacked-right": "bottom-5 right-5 flex flex-col-reverse space-y-2",
        "bottom-stacked-left": "bottom-5 left-5 flex flex-col-reverse space-y-2",
        "fullscreen-center": "top-0 left-0 w-full h-full flex items-center justify-center",
        "floating-top-center": "top-[10%] left-1/2 -translate-x-1/2",
        "floating-bottom-center": "bottom-[10%] left-1/2 -translate-x-1/2",
        "floating-center-left": "top-1/2 left-[10%] -translate-y-1/2",
        "floating-center-right": "top-1/2 right-[10%] -translate-y-1/2",
        "center-quarter": "top-1/4 left-1/2 -translate-x-1/2",
        "center-three-quarter": "top-3/4 left-1/2 -translate-x-1/2",
        "quarter-top-right": "top-[15%] right-[5%]",
        "quarter-top-left": "top-[15%] left-[5%]",
        "quarter-bottom-right": "bottom-[15%] right-[5%]",
        "quarter-bottom-left": "bottom-[15%] left-[5%]",
        "top-modal-center": "fixed top-1/4 left-1/2 -translate-x-1/2 z-[9999]",
        "bottom-modal-center": "fixed bottom-1/4 left-1/2 -translate-x-1/2 z-[9999]",
        "center-modal": "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999]",
        "top-mobile": "top-3 left-1/2 -translate-x-1/2 w-[95%] max-w-sm",
        "bottom-mobile": "bottom-3 left-1/2 -translate-x-1/2 w-[95%] max-w-sm",
        "center-mobile": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-sm",
        "top-toolbar": "top-14 left-1/2 -translate-x-1/2",
        "bottom-navbar": "bottom-14 left-1/2 -translate-x-1/2",
        "left-panel-center": "top-1/2 left-10 -translate-y-1/2",
        "right-panel-center": "top-1/2 right-10 -translate-y-1/2",
        "fullscreen-top-left": "top-0 left-0 w-full flex justify-start p-2",
        "fullscreen-top-right": "top-0 right-0 w-full flex justify-end p-2",
        "fullscreen-bottom-left": "bottom-0 left-0 w-full flex justify-start p-2",
        "fullscreen-bottom-right": "bottom-0 right-0 w-full flex justify-end p-2",
        "center-fixed": "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"

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
        "gradient-stripe": "h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-[length:20px_20px] animate-pulse",
        "cyberpunk": "h-1 bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-700 animate-pulse",
        "matrix": "h-1 bg-green-500/80 bg-[length:10px_10px] animate-pulse",
        "electric": "h-1 bg-blue-400 animate-ping",
        "lava": "h-1 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400",
        "ice": "h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-white",
        "twilight": "h-1 bg-gradient-to-r from-purple-800 via-indigo-600 to-blue-500",
        "galaxy": "h-1 bg-gradient-to-r from-indigo-700 via-pink-500 to-indigo-700 animate-pulse",
        "shadow": "h-1 bg-black/80 shadow-md",
        "lightbar": "h-1 bg-gradient-to-r from-white to-white/10 animate-pulse",
        "storm": "h-1 bg-gradient-to-r from-gray-500 via-slate-600 to-gray-500 animate-pulse",
        "midnight": "h-1 bg-gray-900",
        "ocean": "h-1 bg-gradient-to-r from-cyan-600 via-blue-500 to-cyan-600",
        "plasma": "h-1 bg-gradient-to-r from-fuchsia-600 via-rose-400 to-orange-300 animate-pulse",
        "static": "h-1 bg-white/30 bg-[length:4px_4px] bg-no-repeat",
        "retro": "h-1 bg-gradient-to-r from-orange-300 via-yellow-200 to-pink-300",
        "pastel": "h-1 bg-gradient-to-r from-pink-200 via-blue-200 to-green-200",
        "terminal": "h-1 bg-lime-500",
        "nuclear": "h-1 bg-yellow-400 animate-pulse",
        "wave": "h-1 bg-gradient-to-r from-teal-300 to-indigo-400 bg-[length:20px_20px] animate-pulse",
        "crystal": "h-1 bg-white/60 backdrop-blur-md shadow-inner",
        "minimal": "h-0.5 bg-gray-300",
        "bold-glow": "h-2 bg-blue-500 shadow-md shadow-blue-400/50",
        "rainbow": "h-1 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 animate-pulse",
        "sunset": "h-1 bg-gradient-to-r from-orange-300 via-pink-500 to-purple-600",
        "nature": "h-1 bg-gradient-to-r from-green-300 via-green-500 to-lime-400",
        "peach": "h-1 bg-gradient-to-r from-orange-200 via-pink-200 to-red-300",
        "fire": "h-1 bg-gradient-to-r from-yellow-400 via-red-600 to-orange-500 animate-pulse",
        "water": "h-1 bg-gradient-to-r from-sky-300 via-cyan-400 to-blue-500 animate-pulse",
        "aurora": "h-1 bg-gradient-to-r from-green-400 via-pink-300 to-blue-300",
        "ninja": "h-1 bg-black/80",
        "ghost": "h-1 bg-white/10",
        "static-blur": "h-1 bg-white/30 backdrop-blur-sm",
        "dark-glow": "h-1 bg-gray-800 shadow shadow-blue-500/20",
        "stealth": "h-1 bg-gray-700/50",
        "bubblegum": "h-1 bg-gradient-to-r from-pink-300 via-fuchsia-400 to-pink-500",
        "mint": "h-1 bg-gradient-to-r from-emerald-200 via-green-300 to-teal-200",
        "candy": "h-1 bg-gradient-to-r from-red-200 via-orange-300 to-yellow-200",
        "jetstream": "h-1 bg-gradient-to-r from-cyan-100 via-sky-200 to-blue-300",
        "pixel": "h-1 bg-[url('data:image/svg+xml;utf8,<svg width=4 height=4 xmlns=http://www.w3.org/2000/svg><rect width=2 height=2 fill=%2300f/></svg>')] bg-repeat",
        "none": "hidden"
    };

    // ========================
    // CORE FUNCTION
    // ========================
    window.initSuperToasts = function (messages, userOptions = {}) {
        // Validation
        if (!Array.isArray(messages)) {
            console.error('Messages parameter must be an array');
            return;
        }

        if (!messages.length) {
            console.warn('No messages provided to display');
            return;
        }

        // Default options
        const defaultOptions = {
            theme: "classic",

            animation: "slide",
            position: "top-right",
            duration: 4000,
            showProgress: true,
            progressStyle: "glassline",
            showClose: true,
            queueMode: "stack",
            darkMode: false,
            onClick: null
        };

        const options = { ...defaultOptions, ...userOptions };

        // Validate options
        if (!themes[options.theme]) {
            console.warn(`Theme "${options.theme}" not found, using default`);
            options.theme = "classic";
        }

        // Create and manage toasts
        const createToast = (message) => {
            const toast = document.createElement('div');
            toast.className = `toast ${options.theme} animate-${options.animation}`;

            // Add close button if enabled
            if (options.showClose) {
                const closeBtn = document.createElement('button');
                const closeHandler = () => {
                    toast.classList.add("toast-exit");
                    setTimeout(() => {
                        toast.remove();
                        closeBtn.removeEventListener("click", closeHandler);
                        cleanup();
                    }, 400);
                };
                closeBtn.addEventListener("click", closeHandler);
                toast.appendChild(closeBtn);
            }

            // Auto-remove after duration
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.classList.add("toast-exit");
                    setTimeout(() => {
                        toast.remove();
                        cleanup();
                    }, 400);
                }
            }, options.duration);

            return toast;
        };

        // Cleanup function
        const cleanup = () => {
            const containers = document.querySelectorAll('[id^="toast-container-"]');
            containers.forEach(container => {
                if (!container.hasChildNodes()) {
                    container.remove();
                }
            });
        };

        // Process messages
        messages.forEach(message => {
            const toast = createToast(message);
            // Add to container based on position
            const cid = "toast-container-" + options.position.replace(/[^a-z]/gi, "");
            let container = document.getElementById(cid);
            if (!container) {
                container = document.createElement("div");
                container.id = cid;
                container.className = `fixed z-50 space-y-3 w-full max-w-xs ${positions[options.position]}`;
                document.body.appendChild(container);
            } else if (options.queueMode === "replace") {
                container.innerHTML = "";
            }

            container.appendChild(toast);

            // Animate in
            setTimeout(() => {
                toast.className = toast.className.replace("animate-" + options.animation, "");
                const pb = toast.querySelector(".toast-progress-animate");
                if (pb) {
                    pb.style.animation = `shrink linear ${options.duration}ms forwards`;
                    pb.style.transformOrigin = 'left';
                }
            }, 20);

            // Auto-remove after duration
            setTimeout(() => {
                toast.classList.add("toast-exit");
                setTimeout(() => toast.remove(), 400);
            }, options.duration);
        });
    };

    // ========================
    // HELPER FUNCTIONS
    // ========================
    window.clearAllToasts = function () {
        document.querySelectorAll('[id^="toast-container-"]').forEach(el => el.remove());
    };

    window.showToast = function (message, type = "info", options = {}) {
        initSuperToasts([{ message, tags: [type] }], options);
    };

})();