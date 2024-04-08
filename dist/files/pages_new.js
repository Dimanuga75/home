function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener("click", function (e) {
    e.preventDefault();
    const id = smoothLink.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

let body = document.querySelector("body");
let formaWrapper = document.querySelector(".forma-wrapper");
let formaCall = document.querySelector(".forma__phone");
let inputAlert = document.querySelectorAll(".alert__item");
let formaLoad = document.querySelector(".forma__load-box");
function formaddError() {
  formaWrapper.style.visibility = "visible";
}
function formRemoveFull() {
  formaWrapper.style.visibility = "hidden";
  inputAlert.forEach((item) => (item.style.transform = "scale(0)"));
}
function formRemoveAlert() {
  inputAlert.forEach((item) => (item.style.transform = "scale(0)"));
}

body.addEventListener("click", function (e) {
  if (e.target.classList.contains("order__call")) {
    e.preventDefault();

    formaWrapper.style.visibility = "visible";
    formaCall.classList.add("active");
    document.querySelector(".forma__close").onclick = function () {
      formaWrapper.style.visibility = "hidden";
      formaCall.classList.remove("active");
    };
    let formaTilte = document.querySelector(".forma__title");
    if (e.target.classList.contains("order")) {
      formaTilte.textContent = " СДЕЛАТЬ ЗАКАЗ";
    } else if (e.target.classList.contains("consultation")) {
      formaTilte.textContent = "Получить консультацию";
    } else if (e.target.classList.contains("master")) {
      formaTilte.textContent = "Заказать мастера";
    } else if (e.target.classList.contains("application")) {
      formaTilte.textContent = " Оставить заявку";
    } else if (e.target.classList.contains("measuring")) {
      formaTilte.textContent = " ЗАКАЗАТЬ БЕСПЛАТНЫЙ ЗАМЕР";
    } else {
      formaTilte.textContent = " ОБРАТНЫЙ ЗВОНОК";
    }
  }
});

function formValidate(forma) {
  let error = 0;
  const formReq = document.querySelectorAll(".req");
  for (let index = 0; index < formReq.length; index++) {
    let input = formReq[index];
    if (input.classList.contains("phone__check")) {
      if (phoneTest(input)) {
        document.querySelector(
          ".phone__check"
        ).nextElementSibling.style.display = "block";
        error++;
      }
    } else if (
      input.getAttribute("type") == "checkbox" &&
      input.checked == false
    ) {
      document.querySelector(".agree__box").nextElementSibling.style.display =
        "block";
      error++;
    }
  }
  return error;
}

document.addEventListener("DOMContentLoaded", function () {
  const forma = document.getElementById("form__phone");

  forma.addEventListener("submit", formSend);
  async function formSend(e) {
    e.preventDefault();
    let error = formValidate(forma);
    if (error === 0) {
      let data = new FormData(forma);
      formaLoad.classList.add("active");
      let responce = await fetch("../../files/send.php", {
        method: "POST",
        headers: {
          "Content-Type": "aplication/json;chartset=utf-8",
        },
        body: JSON.stringify({
          form: { name: data.get("name"), phone: data.get("phone") },
        }),
      });
      let rezult = await responce.text();

      if (responce.ok) {
        formaLoad.classList.remove("active");
        formaCall.classList.remove("active");
        document.querySelector(".alert__item.success").style.transform =
          "scale(1)";
        setTimeout(formRemoveFull, 5000);
        forma.reset();
      } else {
        formaLoad.classList.remove("active");
        document.querySelector(".alert__item.server").style.transform =
          "scale(1)";
        setTimeout(formRemoveAlert, 5000);
      }
    } else {
      //setTimeout(formRemoveError, 7000);
    }
  }
  let alertBox = document.querySelector(".forma__alert-box");
  alertBox.addEventListener("click", function (e) {
    e.preventDefault();

    if (
      e.target.classList.contains("click__popup") &&
      formaCall.classList.contains("active")
    ) {
      formRemoveAlert();
    } else {
      formRemoveFull();
    }
  });
});
function phoneTest(input) {
  return !/^[\d\+][\d\(\)\ -]{4,14}\d$/.test(input.value);
}

let box = document.querySelector(".project__box-more");
let itemWidth;
itemWidth = document.querySelector(".project__more").clientWidth;

const screen639 = window.matchMedia("screen and (max-width: 640px)");
if (screen639.matches) {
  itemWidth = window.screen.width;
} else {
  itemWidth = document.querySelector(".project__more").clientWidth;
}

let scrollBox = document.querySelector(".project__slider");
let btnRight = document.querySelector(".project__btn-slider.btn__right");
let btnLeft = document.querySelector(".project__btn-slider.btn__left");
let projectItem = document.querySelectorAll(".project__item-img");
let projectItemImg = document.querySelectorAll(".project__slider-img");
let indexNew = 0;
box.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn__right")) {
    scrollBox.scrollBy({
      left: itemWidth,
      top: 0,
      behavior: "smooth",
    });
  }
  if (e.target.classList.contains("btn__left")) {
    scrollBox.scrollBy({
      left: -itemWidth,
      top: 0,
      behavior: "smooth",
    });
  }
  if (e.target.classList.contains("project__item--click")) {
    let indexControl = e.target.dataset.coint;
    let interval = indexControl - indexNew;

    projectItemImg.forEach((item) => item.classList.add("disactive"));
    scrollBox.scrollBy({
      left: interval * itemWidth,
      top: 0,
      behavior: "smooth",
    });
    indexNew = indexControl;
    function removeClass() {
      projectItemImg.forEach((item) => item.classList.remove("disactive"));
    }
    setTimeout(removeClass, 200);
  }
});

box.addEventListener(
  "scroll",
  function scroll(e) {
    let indexScroll = Math.floor(scrollBox.scrollLeft / itemWidth);
    // console.log(Math.floor(scrollBox.scrollLeft / itemWidth));
    // if (indexScroll === parseInt(indexScroll, 10)) {
    projectItem.forEach((item) => item.classList.remove("active"));
    projectItem[indexScroll].classList.add("active");
    indexNew = indexScroll;
    // }

    if (scrollBox.scrollLeft > 0) {
      btnLeft.classList.add("active__btn");
    } else {
      btnLeft.classList.remove("active__btn");
    }
    if (scrollBox.scrollLeft > scrollBox.scrollWidth - itemWidth - 10) {
      btnRight.classList.remove("active__btn");
    } else {
      btnRight.classList.add("active__btn");
    }
  },
  true
);
