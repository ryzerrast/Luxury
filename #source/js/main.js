//@prepros-append ibg.js
//@prepros-append slider.js
//@prepros-append burger.js
//@prepros-append dynamicAdapt.js
//@prepros-append validation.js

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
