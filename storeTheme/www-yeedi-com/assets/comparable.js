function comparableInit(){function e(){const e=localStorage.getItem("comparableProducts");return e&&JSON.parse(e)||[]}function a(){const e=document.querySelector('[data-behavior="comparison_data"]');e?(p=e.parentElement,h=JSON.parse(e.dataset.products),e.remove()):p=document.querySelector(".grid--view-items")}function t(){const e=document.createElement("div");e.className=["comparable-collection-button",comparableConfig.stickyButton.useIcon?"with-icon":"",comparableConfig.stickyButton.position].filter(e=>e).join(" "),e.dataset.behavior="comparable-collection-add-to-compare",e.innerHTML=`\n      <a title="${comparableLocales.collection_compare_btn}">${d()}</a>\n    `,document.body.append(e),e.addEventListener("click",()=>{b?i():(o(),n())})}function o(){p||(p=document.querySelector(".grid--view-items"));const a=e();S||[...p.children].filter(e=>e.querySelector('a[href*="/products/"]')||"A"===e.tagName).forEach(t=>{if(!t.querySelector(".comparable-products")){(t=t.children[0]).classList.add("comparable-products");try{const r=(t.querySelector('a[href*="/products/"]')||"A"===t.tagName&&t).href.match(/.*\/products\/([\S-]+)/),n=r[1].split("?")[0],i=r[1].split("?")[1];let l=null;if(i){const e=i.match(/variant=(\d+)/);l=e&&e[1]}if(a.length){const e=a.find(e=>e.handle==n&&(!l||e.currentVariantId==l));e&&(c(e,t),e.shownInBar=!0)}t.addEventListener("click",a=>{if(b){let r;function o(a){let o=e();if(t.classList.contains("in-comparison")){t.classList.remove("in-comparison");const e=document.querySelector(`.compare-products-item-${n}-variant-${l}`)||document.querySelector(`.compare-products-item-${n}`);e?e.remove():console.log("Bar element not found"),o=o.filter(e=>e.handle!==n)}else{const{imageSrc:e}=c(a,t);o.push({title:a.title,imageSrc:e,handle:n,currentVariantId:a.currentVariantId})}localStorage.setItem("comparableProducts",JSON.stringify(o))}a.preventDefault(),(r=h.find(e=>e.handle==n&&(!l||e.currentVariantId==l)))?o(r):m(n,o)}})}catch(o){console.log(o)}}});let t=!1;a.forEach(e=>{e.shownInBar||(S&&e.handle===S[1]?(c(e,undefined,()=>{s()}),t=!0):c(e))}),S&&!t&&s()}function c(e,a,t){const o=a&&a.querySelector("img")||{src:""},c=document.createElement("div"),r=o.currentSrc||o.src||e.imageSrc;return document.querySelector(`.compare-products-item-${e.handle}`)?{imageSrc:r}:(c.className="compare-products-item"+` compare-products-item-${e.handle}`+` compare-products-item-${e.handle}-variant-${e.currentVariantId}`,c.innerHTML=`\n      <div class="compare-products-item-content">\n        <img class="compare-products-item-image" src="${r}" />\n        <div class="compare-products-item-text">${e.title.trim()}</div>\n      </div>\n      <div class="compare-products-item-remove-btn" data-behavior="compare-bar-products-item-remove">&#10005;</div>\n    `,document.querySelector('[data-behavior="comparable-bar-products-list"]').prepend(c),c.querySelector('[data-behavior="compare-bar-products-item-remove"]').addEventListener("click",()=>{c.remove(),a&&a.classList.remove("in-comparison");const o=localStorage.getItem("comparableProducts");let r=o&&JSON.parse(o)||[];r=r.filter(a=>a.handle!==e.handle),localStorage.setItem("comparableProducts",JSON.stringify(r)),t&&t()}),a&&a.classList.add("in-comparison"),{imageSrc:r})}function r(){const e=document.createElement("div");e.className="compare-bar comparable-hidden",e.dataset.behavior="comparable-bar",e.innerHTML=`\n      <div class="compare-products-list-wrapper">\n        <div class="compare-products-list" data-behavior="comparable-bar-products-list"></div>\n      </div>\n      <div class="compare-products-actions">\n        <a class="compare-link" data-behavior="comparable-bar-compare">${comparableLocales.bar_compare_btn}</a>\n        <div class="bottom-actions">\n          <a class="close-bar" data-behavior="comparable-bar-close">${comparableLocales.bar_close_btn}</a>\n          <a class="clear-bar" data-behavior="comparable-bar-clear">\n            <svg viewBox="-40 0 427 427.00131" xmlns="http://www.w3.org/2000/svg" fill="#fff">\n              <path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"/><path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/>\n            </svg>\n          </a>\n        </div>\n      </div>\n    `,document.body.append(e),document.querySelector('[data-behavior="comparable-bar-compare"]').addEventListener("click",()=>{document.querySelector('[data-behavior="comparable-bar-products-list"]').childElementCount&&(window.location.pathname="/pages/compare")}),document.querySelector('[data-behavior="comparable-bar-close"]').addEventListener("click",()=>{i()}),document.querySelector('[data-behavior="comparable-bar-clear"]').addEventListener("click",()=>{l()})}function n(){b=!0,document.querySelector('[data-behavior="comparable-bar"]').classList.remove("comparable-hidden"),document.querySelector('[data-behavior="comparable-collection-add-to-compare"]').classList.add("comparable-hidden"),p&&p.classList.add("compare_mode-collection")}function i(){b=!1,document.querySelector('[data-behavior="comparable-bar"]').classList.add("comparable-hidden"),document.querySelector('[data-behavior="comparable-collection-add-to-compare"]').classList.remove("comparable-hidden"),document.querySelector('[data-behavior="comparable-collection-add-to-compare"] a').innerHTML=d(),p&&p.classList.remove("compare_mode-collection")}function l(){localStorage.setItem("comparableProducts",JSON.stringify([])),[...document.querySelector('[data-behavior="comparable-bar-products-list"]').children].forEach(e=>{e.classList.contains("add-to-compare")||e.remove()}),[...document.querySelectorAll(".comparable-products")].forEach(e=>{e.classList.remove("in-comparison")})}function d(){const a=e().length;if(comparableConfig.stickyButton.useIcon){const e=a?`<span class='products-count'>${a}</span>`:"";return comparableConfig.stickyButton.iconSvg+e}{let e=comparableLocales.collection_compare_btn;return a&&(e+=` (${a})`),e}}function s(){const e=document.createElement("div");e.className="compare-products-item add-to-compare",e.innerHTML=`\n      <div class="compare-products-item-content" data-behavior="add-to-compare">\n        <span>${comparableLocales.bar_add_to_compare_btn}</span>\n      </div>\n    `,document.querySelector('[data-behavior="comparable-bar-products-list"]').prepend(e),e.querySelector('[data-behavior="add-to-compare"]').addEventListener("click",()=>{function e(e){let a;const t=window.location.search.match(/variant=(\d+)/);a=t?t[1]:(e.variants.find(e=>e.available)||e.variants[0]).id;const o=localStorage.getItem("comparableProducts");let r=o&&JSON.parse(o)||[];const n={title:e.title,imageSrc:e.featured_image,handle:e.handle,currentVariantId:a};r.push(n),localStorage.setItem("comparableProducts",JSON.stringify(r)),c(n,undefined,()=>{s()}),document.querySelector('[data-behavior="add-to-compare"]').parentElement.remove()}u?e(u):"undefined"!=typeof fetch?fetch(S[0]+".js").then(e=>e.json()).then(a=>{e(u=a)}):$.getJSON(S[0]+".js",function(a){e(u=a)})})}function m(e,a){const t=v.find(a=>a.handle===e);if(t)a(t);else{let t=`/products/${e}`;"undefined"!=typeof fetch?fetch(t+".js").then(e=>e.json()).then(e=>{a&&a(e),v.push(e)}):$.getJSON(t+".js",function(e){a&&a(e),v.push(e)})}}if(!comparableConfig.enabled||comparableInit.inited)return;comparableInit.inited=!0;let p,u,b=!1,h=[],v=[];const f=window.location.pathname.match(/.*\/collections\/([\w\d-]+)/)||decodeURI(window.location.pathname).match(/.*\/collections\/((\w|[^\x00-\x7F]|-)+)/),g=f&&!window.location.pathname.match(/.*\/products\//),S=window.location.pathname.match(/.*\/products\/([\w\d-]+)/);g&&(comparableConfig.enablePages.enableOnAllCollections||comparableConfig.enablePages.exceptCollections.includes(f[1]))&&(a(),t(),r()),S&&comparableConfig.enablePages.enableOnProductPages&&(t(),r())}document.addEventListener("DOMContentLoaded",function(){function e(){const e=document.querySelector('[data-behavior="comparison_data"]');e&&e.remove()}if("undefined"!=typeof comparableConfig&&comparableConfig.enabled&&document.head.innerText.match(/comparable-loader.js/))try{comparableInit()}catch(a){console.log(a),e()}else e()});