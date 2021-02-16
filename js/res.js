const filterList = document.querySelector('.filter-recipies__list'),
      filterIcon = document.querySelector('.filter-recipies__icon'),
      filterColumns = document.querySelectorAll('.filter-recipies__column');

filterIcon.addEventListener('click', function() {
   this.classList.toggle('listActive');
   filterList.classList.toggle('listActive');
});

const filterListItems = document.querySelectorAll('.filter-recipies__btn'),
      filterFoodItems = document.querySelectorAll('.item-recipies'),
      recipiesItem = document.querySelectorAll('.recipies__item'),
      recipiesContent = document.querySelectorAll('.item-recipies__content');

for (let i = 0; i < filterListItems.length; i++) {
   filterListItems[i].addEventListener('click', function (e) {
      console.log(e.target.id);
      for (let j = 0; j < filterFoodItems.length; j++) {
         if (filterFoodItems[j].classList.contains(e.target.id)) {
            filterFoodItems[j].style.display = 'block';
         } else {
            filterFoodItems[j].style.display = 'none';
         }
      }
   });
}

let index = 0;

for(let i = 0; i < filterColumns.length; i++) {
   filterColumns[i].addEventListener('click', function() {
      for(let j = 0; j < filterColumns.length; j++) {
         filterColumns[j].classList.remove('columnActive');
      }
      if(i == 2) {
         index = 0;
         filterColumns[index].classList.add('columnActive');
      } else {
         filterColumns[++index].classList.add('columnActive');
      }
      checkCurrentElem();
   });
}

function checkCurrentElem() {
   if(index == 0) {
      for(let k = 0; k < recipiesItem.length; k++) {
         recipiesItem[k].style.flex = '0 1 100%';
         recipiesContent[k].style.display = 'flex';
      }
   } else if(index == 1) {
      for(let k = 0; k < recipiesItem.length; k++) {
         recipiesItem[k].style.flex = '0 1 50%';
         recipiesContent[k].style.display = 'flex';
      }
   } else if(index == 2) {
      for(let k = 0; k < recipiesItem.length; k++) {
         recipiesItem[k].style.flex = '0 1 33.333%';
         recipiesContent[k].style.display = 'block';
      }
   }
}

function mediaFunc() {
   if (window.innerWidth < 1024) {
      for(let k = 0; k < recipiesItem.length; k++) {
         recipiesItem[k].style.flex = '0 1 50%';
         recipiesContent[k].style.display = 'block';
      } 
   } else {
      for(let i = 0; i < filterColumns.length; i++) {
         if(filterColumns[i].classList.contains('columnActive')) {
            index = i;
            checkCurrentElem();
         }
      }
   }
   if (window.innerWidth < 700) {
      for(let k = 0; k < recipiesItem.length; k++) {
         recipiesItem[k].style.flex = '0 1 100%';
         recipiesContent[k].style.display = 'block';
      }
   }
 }
 window.addEventListener('resize', mediaFunc);