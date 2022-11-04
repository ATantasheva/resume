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
	//получаем всю форму в константу по id
   const form = document.getElementById('form');
	//вешаем событие submit и функцию formSend
   form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault(); //запрещаем стандартн поведение 'submit'

		let error = formValidate(form);
     let formData = new FormData(form);


//проверка  перед отправкой формы
if (error === 0) { 
   form.classList.add('_sending'); //доб класс - идет отправка формы
    let response = await fetch('sendmail.php', {
      method: 'POST',
      body: formData
   });
   if (response.ok) { //если все ок
      let result = await response.json(); //возвращается как ответ response.json
      alert(result.message);
      // formPreview.innerHTML = ''; очитска формы при отправке
      form.reset(); // очищаем поля формы 
      form.classList.remove('_sending');  //убираем класс отправки формы после того как отправилась
   } else {
      alert("Ошибка");
   form.classList.remove('_sending');
   } 
} else {
   alert('Заполните обязательные поля');
}

        //валидация (проверка заполненности полей)
      function formValidate(form) {
         let error = 0;
         //всем обязательным полям класс _req
         let formReq = document.querySelectorAll('._req');
   //цикл - будем проверять заполнено ли поле
   //бегаем по всем этим полям и получаем в конст кажд инпут
         for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            //изначлаьно удаляем класс Error
            formRemoveError(input);
   
            //проверка e-mail
            if (input.classList.contains('_email')) {
                     //проверка по функции теста email
               if (emailTest(input)) {
                  //если true то вешаем класс Error
                  formAddError(input); //вешаем ошибку
                  error++; // хз зачем увеличив на 1 let error = 0;
               }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
               formAddError(input); //вешаем ошибку
               error++;
            } else { //если пустое поле
               if (input.value === '') {
                  formAddError(input); //вешаем ошибку
                  error++;
               }
            }
         }
         return error; //возврашаем занчение 
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

