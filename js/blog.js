const filterPostsBtn = document.querySelector('.blog-filter-btn'),
      filterPosts = document.querySelector('.blog__filter');

filterPostsBtn.addEventListener('click', function() {
   this.classList.toggle('active');
   filterPosts.classList.toggle('active');
});