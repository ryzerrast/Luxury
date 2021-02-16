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