"use strict"
//код для определения на каком усройтве открыт сайт
const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};
// проверяем усл где открыт сайт и доб определенный класс
if (isMobile.any()) {
   document.body.classList.add('_touch');
} else {
   document.body.classList.add('_pc');
}

//Меню бургер

//получаем объект
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.header__menu');
//проверка есть ли такой объект
if(iconMenu) {

iconMenu.addEventListener('click', function(e) {
   //запрет скролла страницы под меню
   document.body.classList.toggle('._lock');
   iconMenu.classList.toggle('_active');
   menuBody.classList.toggle('_active');
} );
}


//прокрутка при клике

//созд конст в которой будут найдены объекты с кл .menu__link
// но только те у которых есть атрибут data-goto
const menuLinks = document.querySelectorAll('.header__link[data-goto]');
//проверка по длине - по найденному
if (menuLinks.length > 0) {
    //бежим циклом по найденому и вешаем на каждого клик
   //созд перемен menuLink и на нее вешаем функцией событие клик
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
         //получаем объект на который кликаем
		const menuLink = e.target;
      //проверка заполнен ли атрибут и сущ-ет ли объект на который ссылается этот атрибут
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
         //высчитываем высоту прокрутки до объекта с учетом размера шапки
// pageYOffset - кол-во прокрученных px
//отнимаем document.querySelector('header').offsetHeight - высоту шапки
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

//для закрывания меню на клик
//если бургер открыт и содержит класс актив
if (iconMenu.classList.contains('_active')) {
//мы должны удалить классы с других объектов
document.body.classList.remove('_lock');
iconMenu.classList.remove('_active');
menuBody.classList.remove('_active');
}


         //для прокрутки скролла
//обращаемся к окну браузера
			window.scrollTo({
				top: gotoBlockValue, // сверху + высчитанное количество положения секции
				behavior: "smooth" // плавность
			});
			e.preventDefault(); //фун-ция отменяет действие ссылки по умолчанию
		}
	}
}

/*==========================================================================================*/ 

//для попап - конверт - обратная связь
//проверка что документ загружен
document.addEventListener('DOMContentLoaded', function () {
	//получаем всю форму в константу
   const form = document.getElementById('form');
	//вешаем событие submit и функцию formSend
   form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault(); //запрещаем стандартн поведение 'submit'

		let error = formValidate(form);
      let formData = new FormData(form);


//проверка
if (error === 0) {
   form.classList.add('_sending'); //доб класс - идет отправка формы
   
   let response = await fetch('sendmail.php', {
      method: 'POST',
      body: formData
   });
   if (response.ok) {
      let result = await response.json();
      alert(result.message);
      formPreview.innerHTML = ''; //очитска формы при отправке
      form.reset();
      form.classList.remove('_sending');
   } else {
      alert("Ошибка");
          form.classList.remove('_sending');
   } 
} else {
   alert('Заполните обязательные поля');
}



        //валидация
      function formValidate(form) {
         let error = 0;
         let formReq = document.querySelectorAll('._req');
   //цикл - будем проверять заполнено ли поле
         for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            //изначлаьно удаляем класс Error
            formRemoveError(input);
   
            if (input.classList.contains('_email')) {
                     //проверка по функции теста email
               if (emailTest(input)) {
                  //если true то вешаем класс Error
                  formAddError(input);
                  error++;
               }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
               formAddError(input);
               error++;
            } else { //если пустое поле
               if (input.value === '') {
                  formAddError(input);
                  error++;
               }
            }
         }
         return error;
      }
      // функции удалить добавить класс Error на элемент и родителя
      function formAddError(input) {
         input.parentElement.classList.add('_error');
         input.classList.add('_error');
      }
      function formRemoveError(input) {
         input.parentElement.classList.remove('_error');
         input.classList.remove('_error');
      }
      //Функция теста email
      function emailTest(input) {
         return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
      }
   }
});   

//кнопка - показать больше

function toggleShowMoreBtn(showMoreBtn) {
   showMoreBtn.classList.toggle('show');
   console.log('click');
 
   if (showMoreBtn.classList.contains('show')) {
     showMoreBtn.innerHTML = 'Скрыть';
     // фун-ция с равенством и условием
   } else {
     showMoreBtn.innerHTML = 'показать больше';
     // фун-ция с равенством и условием
   }
 };
 // временная функция для скрытых блоков 
 function toggleShowMoreBtn11(showMoreBtn) {
   showMoreBtn.classList.toggle('show11');
   console.log('click');
   if (showMoreBtn.classList.contains('show11')) {
     showMoreBtn.innerHTML = 'Скоро появится информация';
   } else {
     showMoreBtn.innerHTML = 'показать больше';
   }
 };

 // получение всех макетов на странице
 const makets = document.querySelectorAll('.maket__present');
 makets.forEach((maket) => {
   // получаем кнопку, соответствующую данному макету
   const showMoreBtn = maket.querySelector('button.button__btn');
   // получаем соответствующий блок
   const blockShow = maket.querySelector('.block__show, .block__show11'); //
   console.log(blockShow);
   // добавляем обработчик клика
   showMoreBtn.addEventListener('click', (e) => {
     
     if (blockShow.classList.contains('block__show11')) {
         // меняем текст на кнопке
      toggleShowMoreBtn11(showMoreBtn);
     } else {
   // меняем видимость блока с контентом
      blockShow.classList.toggle('block');
      // меняем текст на кнопке
      toggleShowMoreBtn(showMoreBtn);
     }
   });
 });

 //открытие фото и блока слайдера - поп-ап классы в html поставила 

/*
 const popupLinks = document.querySelectorAll('.popup-link');
// получаем body
const body = document.querySelector('body');
//
const lockPadding = document.querySelectorAll('.lock-padding')
//нужна чтобы не было двойных нажатий
let unlock = true;
// время в ms как в .popup  = transition: all 0.8s ease 0s;
const timeout = 800;

//проверка сущ-ют ли ссылки на странице
if(popupLinks.length>0) {
   //циклом по кажд ссылке и получаем каждую в popupLink
   for( let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      //вешаем клик
      popupLink.addEventListener('click', function(e) {
         //из атрибута href убираем #
         const popupName = popupLink.getAttribute('href').replace('#','');
         //получаем объект поп-апа
         const curentPopup = document.getElementById(popupName);
         //объект отправляем в функцию открывания
         popupOpen(curentPopup);
         //запрет стандартного действия ссылки
         e.preventDefault();
      })
   }
};
//закрытие поп-апа
const popupCloseIcon = document.querySelectorAll('.close-popup');
//проверка есть ли такой объект
if (popupCloseIcon.length > 0) {
   for(let index = 0; index < popupCloseIcon; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
         //в функцию отправляем объект который явл-ся ближайшим родителем
         popupClose(el.closest('.popup'));
         e.preventDefault();
      });
   }
}
//сама функция открытия  popupOpen
function popupOpen(curentPopup) {
   //проверка есть перемен curentPopup и unlock=true
   if (curentPopup && unlock) {
// сначала закрываем поп-ап
const popupActive = document.querySelectorAll('.popup.open');
if(popupActive) {
   popupClose(popupActive, false);
} else {
   bodyLock(); //блочим боди
}
//доб класс open'
curentPopup.classList.add('.open');
curentPopup.addEventListener('click',function(e) {
   //если у нажатого объекта нет в родителе объекта с классом popup__content
   //тогда закрываем
   if(!e.target.closest('.popup__content')) {
      popupClose(e.target.closest('.popup'));
   }
});
   }
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();

*/






// функция возвращает cookie с именем name, если есть, если нет, то undefined    
function getCookie(name) {
   let matches = document.cookie.match(new RegExp(
   "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
   ));
   return matches ? decodeURIComponent(matches[1]) : undefined;
}
let cookiecook = getCookie("cookiecook"),
cookiewin = document.getElementsByClassName('cookie_notice')[0];    
// проверяем, есть ли у нас cookie, с которой мы не показываем окно и если нет, запускаем показ
if (cookiecook != "no") {
   // показываем    
   cookiewin.style.display="block"; 
   // закрываем по клику
   document.getElementById("cookie_close").addEventListener("click", function(){
       cookiewin.style.display="none";    
       // записываем cookie на 2 дня, с которой мы не показываем окно
       let date = new Date;
       date.setDate(date.getDate() + 2);    
       document.cookie = "cookiecook=no; path=/; expires=" + date.toUTCString();               
   });
}

