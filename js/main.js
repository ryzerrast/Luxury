
const menuLink = document.querySelectorAll('.food-menu__link'),
   menuItem = document.querySelectorAll('.food-menu__item');

for (let i = 0; i < menuLink.length; i++) {
   menuLink[i].addEventListener('click', function (event) {
      for (let k = 0; k < menuLink.length; k++) {
         menuLink[k].classList.remove('activeLink');
      }
      console.log(event.target.getAttribute('id'))
      menuLink[i].classList.add('activeLink');
      for (let j = 0; j < menuItem.length; j++) {
         if (menuItem[j].classList.contains(event.target.id)) {
            menuItem[j].style.display = 'flex';
         } else {
            menuItem[j].style.display = 'none';
         }
      }
   });
}

$(document).ready(function () {
   $("body").css("display", "none");

   $("body").fadeIn(1300);

   $("a.transition").click(function (event) {
      event.preventDefault();
      linkLocation = this.href;
      $("body").fadeOut(500, redirectPage);
   });

   function redirectPage() {
      window.location = linkLocation;
   }
});

function ibg(){
   let ibg = document.querySelectorAll(".ibg");
      for (let i = 0; i < ibg.length; i++) {
         if( ibg[i].querySelector('img') ) {
            ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
         }
      }
   }
   
ibg();
if( $('.special-slider').length > 0 ) {
   $('.special-slider').slick({
      autoplay: true,
      dots: true,
      arrows: false,
      accessibility: false,
      slidesToShow: 2,
      slidesToScroll: 2,
      adaptiveHeight: true,
      autoplaySpeed: 2000,
      responsive: [
         {
           breakpoint: 900,
           settings: {
             slidesToShow: 1,
             slidesToScroll: 1
           }
         }
       ]
    });
}

if( $('.client__body').length > 0 ) {
   $('.client__body').slick({
      autoplay: true,
      dots: true,
      accessibility: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      autoplaySpeed: 2000,
    });
}

if( $('.post-block__slider').length > 0 ) {
   $('.post-block__slider').slick({
      autoplay: false,
      dots: true,
      arrows: false,
      accessibility: false,
      slidesToShow: 1,
      slidesToScroll: 1,
    });
}

if( $('.resent-post__slider').length > 0 ) {
   $('.resent-post__slider').slick({
      autoplay: false,
      dots: true,
      arrows: false,
      accessibility: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      rows: 3,
    });
}
const iconMenu = document.querySelector('.header__icon'),
      menuBody = document.querySelector('.header__menu');

iconMenu.addEventListener('click', function() {
   iconMenu.classList.toggle('active');
   menuBody.classList.toggle('active');
   closeMenu();
   mediaFunc();
});

function closeMenu() {
   document.addEventListener('click', function(e) {
      if(!e.target.classList.contains('header__icon') && !e.target.classList.contains('header__menu')) {
         iconMenu.classList.remove('active');
         menuBody.classList.remove('active');
      }
   }) 
}

function mediaFunc() {
   if (window.innerWidth < 426 && iconMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
   } else {
      document.body.style.overflow = 'auto';
   }
 }
"use strict";

function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
'use strict'

document.addEventListener('DOMContentLoaded', function () {
   const form = document.querySelector('.form');
   form.addEventListener('submit', formSend);

   async function formSend(e) {
     e.preventDefault();

      let error = formValidate(form);

      if (error === 0) {

      } else {
         alert('Заполните обязательные поля');
      }
   }

   function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll('._req');

      for (let i = 0; i < formReq.length; i++) {
         const input = formReq[i];
         formRemoveError(input);

         if (input.classList.contains('_email')) {
            if (emailTest(input)) {
               formAddError(input);
               error++;
            }
         } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
            formAddError(input);
            error++;
         } else if (input.classList.contains('_date')) {
            if (dateTest(input)) {
               formAddError(input);
               error++;
            }
         } else if (input.classList.contains('_name')) {
            if (nameTest(input)) {
               formAddError(input);
               error++;
            }
         } else if (input.classList.contains('_time')) {
            if (timeTest(input)) {
               formAddError(input);
               error++;
            }
         } else if (input.classList.contains('_guests')) {
            if (guestsTest(input)) {
               formAddError(input);
               error++;
            }
         } else if (input.classList.contains('_phone')) {
            if (phoneTest(input)) {
               formAddError(input);
               error++;
            }
         } else {
            if (input.value === '') {
               formAddError(input);
               error++;
            }
         }
      }
      return error;
   }
   function formAddError(input) {
      input.parentElement.classList.add('_error');
      input.classList.add('_error');
   }
   function formRemoveError(input) {
      input.parentElement.classList.remove('_error');
      input.classList.remove('_error');
   }
   // Функция теста email
   function emailTest(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
   }
   function dateTest(input) {
      if(/\d\d\.\d\d.\d{4}/.test(input.value)) {
         let arr = input.value.split('.');
         let digit = arr[0],
             month = arr[1] - 1,
             year = arr[2];
         let date = new Date(year, month, digit);
         if(!(date.getFullYear() == year && date.getMonth() == month && date.getDate() == digit)) {
            return true;
         } 
      } else {
         return true;
      }
   }
   function nameTest(input) {
      if(/[A-Z][a-z]+\s[A-Z][a-z]+/.test(input.value)) {

      } else {
         return true;
      }
   }
   function timeTest(input) {
      if(/([01]\d|2[1-3]):[0-5]\d/.test(input.value)) {

      } else {
         return true;
      }
   }
   function guestsTest(input) {
      if(/\d\d?\d?/.test(input.value)) {
         if(!(input.value > 0 && input.value <= 100)) {
            return true;
         } 
      } else {
         return true;
      }
   }
   function phoneTest(input) {
      if(/\+380\d{9}$/.test(input.value)) {
      } else {
         return true;
      }
   }

   // Получаем input file в переменную
   const formImage = document.getElementById('formImage');

   // Слушаем изменения в инпуте file
   formImage.addEventListener('change', function () {
      uploadFile(formImage.files[0]);
   });

   function uploadFile(file) {
      // проверяем тип файла
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
         alert('Разрешены только изображения.');
         formImage.value = '';
         return;
      }
      // проверяем размер файла
      if (file.size > 2 * 1024 * 1024) {
         alert('Файл должен быть менее 2 МБ.');
         return;
      }
   }
});

document.addEventListener('click', function () {
   const formFooter = document.querySelector('.footer__form');
   const footerEmail = document.querySelector('._reqFooterEmail');
   formFooter.addEventListener('submit', formSendFooter);

   async function formSendFooter(e) {
      e.preventDefault();
 
      if (footerEmail.classList.contains('_email')) {
         if (emailTest(footerEmail)) {
            footerEmail.classList.add('_error');
         } else {
            footerEmail.classList.remove('_error');
         }
      } 
      function emailTest(input) {
         return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
      }
    }
});