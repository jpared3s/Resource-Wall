$(document).ready(function() {
  console.log("I'm ready to add new comments!");
  $(".messages").slideUp(0);

    $(".addComment").submit(function(event) {
      event.preventDefault();
      let $form = $(this);
      let $commentBox = $form.find(".commentText");
      let $rating = $form.find("#rating");
      // let $parameter = $("body").find(".url")//.attr('href');
      let parameter = $("body").find(".url").attr('id');

      console.log(parameter);
      $(".messages").slideUp(0);
      // let $url = $form.find(".url");
      if (!$commentBox.val()) {
        $(".fieldsEmpty").slideDown(200);
      } else {
        console.log($form.serialize());
        // $(".addSuccess").slideDown(200);
        $.post(`/resource/${parameter}`, $form.serialize()).done(() => console.log("posting success")).fail(() => alert("Something went wrong when posting your comment! Please refresh your page and try again."));
      }  
    });

  
});

const renderResources = (array, section) => {
  for (let resource of array) {
    section.prepend(`
    <article class="resources">
  <header class="resource-header">
  <p>
  ${resource.title}
  </p>
  </header>
  <p class="resources-description">${resource.description}</p>

  <footer>
    <div class = "comments_for_${resource.id}">
     ${renderComments([123])}
    </div>
    <div class="footer-icons">
      <i class="fa-regular fa-thumbs-up"></i>
      <i class="fa-regular fa-heart hovericon1"></i>
    </div>
  </footer>
</article>
    `);
  }
}

const renderComments = (array) => {
  for (comment of array)  {
    return `
    ${comment}

  `
  }
}