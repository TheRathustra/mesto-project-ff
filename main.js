(()=>{"use strict";function e(e){!function(e){e.classList.add("popup_is-opened")}(e),document.addEventListener("keydown",t)}function t(e,r){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(r||"Escape"!==e.key||(r=document.querySelector(".popup_is-opened")),!r)return!1;var o=r.querySelector(".popup__close");return!("Escape"!==e.key&&e.target!==o&&e.target.closest(".popup__content")&&!n||(function(e){e.classList.remove("popup_is-opened")}(r),r.querySelectorAll("input").forEach((function(e){e.value=""})),document.removeEventListener("keydown",t),0))}var r=document.querySelector("#card-template").content;function n(e,t,n,o){var c=r.querySelector(".places__item").cloneNode(!0);return function(e,t,r,n){var o=e.querySelector(".card__delete-button");null!==r?o.addEventListener("click",(function(e){r(e,t,n)})):o.classList.add("card__delete-button_hidden")}(c,e,t.trash,n.deleteCard),function(e,t,r){var n=e.querySelector(".card__image");n.setAttribute("src",t.link),n.setAttribute("alt",t.name),e.querySelector(".card__title").textContent=t.name,n.addEventListener("click",(function(){r(t.name,t.link)}))}(c,e,t.card),function(e,t,r,n,o){var c=e.querySelector(".card__like"),u=c.querySelector(".card__like-button");u.addEventListener("click",(function(e){r(e,t,n)})),c.querySelector(".card__like-number").textContent=t.likes.length,t.likes.forEach((function(e){o===e._id&&u.classList.toggle("card__like-button_is-active")}))}(c,e,t.like,n.likeCard,o),c}function o(e,t,r){r(t._id);var n=e.target.closest(".card");n.parentElement.removeChild(n)}var c={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function u(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),n.classList.remove(r.errorClass),n.textContent="",e.querySelector(r.submitButtonSelector).classList.remove(r.inactiveButtonClass)}function a(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(r){u(e,r,t)})),e.querySelector(t.submitButtonSelector).classList.add(t.inactiveButtonClass)}var i="https://nomoreparties.co/v1/".concat("wff-cohort-18","/"),l={"Content-Type":"application/json",authorization:"".concat("6181dd13-c179-480c-8203-2aa7bbc59bd3")},s=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},d={getProfile:function(){return fetch(i+"users/me",{method:"GET",headers:l}).then(s)},patchProfile:function(e,t){return function(e,t){var r={method:"PATCH",headers:l,body:JSON.stringify({name:e,about:t})};return fetch(i+"users/me",r).then(s)}(e,t)},patchAvatar:function(e){return function(e){var t={method:"PATCH",headers:l,body:JSON.stringify({avatar:e})};return fetch(i+"users/me/avatar",t).then(s)}(e)},getCards:function(){return fetch(i+"cards",{method:"GET",headers:l}).then(s)},addCard:function(e,t){return function(e,t){var r={method:"POST",headers:l,body:JSON.stringify({name:e,link:t})};return fetch(i+"cards",r).then(s)}(e,t)},deleteCard:function(e){return function(e){var t={method:"DELETE",headers:l};return fetch(i+"cards/".concat(e),t).then(s)}(e)},likeCard:function(e,t){return function(e,t){var r={method:t?"PUT":"DELETE",headers:l};return fetch(i+"cards/likes/".concat(e),r).then(s)}(e,t)},checkUrl:function(e){return function(e){var t=!1;return fetch(e,{method:"HEAD"}).then((function(e){t=e.ok})).catch((function(){return t=!1})),t}(e)}};function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var f=document.querySelector(".places__list"),_=document.querySelector(".content"),y=document.querySelector(".popup_type_edit .popup__form"),m=document.querySelector(".popup_type_new-card  .popup__form"),v=document.querySelector(".popup_type_avatar  .popup__form"),h=_.querySelector(".profile__title"),S=_.querySelector(".profile__description"),b=_.querySelector(".profile__image"),q=document.querySelector(".popup__input_type_name"),g=document.querySelector(".popup__input_type_description"),E=document.querySelector(".profile__edit-button"),k=document.querySelector(".profile__add-button"),C=document.querySelector(".profile__avatar-button"),L=document.querySelector(".popup__input_type_card-name"),A=document.querySelector(".popup__input_type_url"),x=document.querySelector(".popup__input_type_avatar"),P=document.querySelector(".popup_type_new-card"),T=document.querySelector(".popup_type_edit"),w=document.querySelector(".popup_type_image"),B=document.querySelector(".popup_type_avatar"),j=document.querySelector(".popup__image"),O=document.querySelector(".popup__caption"),D=document.querySelector(".spinner"),I=function(e){console.log(e)},M={trash:o,like:function(e,t,r){e.target.classList.toggle("card__like-button_is-active");var n=e.target.closest(".card__like").querySelector(".card__like-number");r(t._id,e.target.classList.contains("card__like-button_is-active")).then((function(e){return n.textContent=e.likes.length})).catch((function(e){return console.log(e)}))},card:function(t,r){j.src=r,j.alt="На фото "+t,O.textContent=t,e(w)}},N=void 0;function H(e){N=e._id,h.textContent=e.name,S.textContent=e.about,b.style.backgroundImage="url('".concat(e.avatar,"')")}function J(e,t){t.querySelector(".popup__button").textContent=e?"Сохраняю...":"Сохранить",e?D.classList.add("spinner_visible"):D.classList.remove("spinner_visible")}k.addEventListener("click",(function(){e(P)})),E.addEventListener("click",(function(){q.value=h.textContent,g.value=S.textContent,e(T)})),C.addEventListener("click",(function(){e(B)})),m.addEventListener("submit",(function(e){e.preventDefault(),J(!0,m),M.trash=o,d.addCard(L.value,A.value).then((function(r){var o=n(r,M,d,N);t(e,P,!0),f.prepend(o)})).catch(I).finally(J(!1,m)),m.reset(),a(m,c)})),y.addEventListener("submit",(function(e){e.preventDefault(),J(!0,y),d.patchProfile(q.value,g.value).then((function(e){H(e)})).catch(I).finally(J(!1,y)),t(e,T,!0),a(y,c)})),v.addEventListener("submit",(function(e){e.preventDefault(),J(!0,v),d.patchAvatar(x.value).then((function(e){b.style.backgroundImage="url('".concat(e.avatar,"')")})).catch(I).finally(J(!1,v)),t(e,B,!0),a(v,c),v.reset()})),document.querySelectorAll(".popup").forEach((function(e){return function(e){var r=e.querySelector(".popup__close"),n=e.querySelector(".popup__form");r.addEventListener("click",(function(r){t(r,e)&&null!==n&&a(n,c)})),e.addEventListener("click",(function(r){t(r,e)&&null!==n&&a(n,c)}))}(e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){a(t,e),function(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(r){r.addEventListener("input",(function(){!function(e,t,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?u(e,t,r):function(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.classList.add(n.errorClass),o.textContent=r,e.querySelector(n.submitButtonSelector).classList.add(n.inactiveButtonClass)}(e,t,t.validationMessage,r)}(e,r,t)}))}))}(t,e)}))}(c),Promise.all([d.getProfile(),d.getCards()]).then((function(e){var t,r,c=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,u,a=[],i=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=c.call(r)).done)&&(a.push(n.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=r.return&&(u=r.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,r)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?p(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=c[0],a=c[1];H(u),a.forEach((function(e){M.trash=N===e._id?o:null;var t=n(e,M,d,N);f.append(t)}))})).catch(I)})();
//# sourceMappingURL=main.js.map