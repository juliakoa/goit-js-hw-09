!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.body,a=null;function o(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16));n.style.backgroundColor=t}t.addEventListener("click",(function(){t.disabled=!0,a=setInterval(o,1e3)})),e.addEventListener("click",(function(){t.disabled=!1,clearInterval(a)}))}();
//# sourceMappingURL=01-color-switcher.f784e4ec.js.map