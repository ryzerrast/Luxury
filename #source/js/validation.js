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