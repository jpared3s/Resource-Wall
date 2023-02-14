$(document).ready(function() {
  console.log("I'm ready to add new resources!");
  $(".messages").slideUp(0);

    $(".addNewResource").submit(function(event) {
      $(".messages").slideUp(0);
      let $form = $(this);
      let $url = $form.find(".url");
      let $description = $form.find(".description");
      let $tags = $form.find(".tags");
      event.preventDefault();
      if (!$url.val() || !$description.val() || !$tags.val()) {
        $(".fieldsEmpty").slideDown(200);
      } else {
        $(".addSuccess").slideDown(200);
        $.post("/addResource", $form.serialize()).done().fail(() => alert("Something went wrong when posting your resource! Please refresh your page and try again."));
      }  
    });
    // code below is for testing, delete later
    // $(".testbtn").on("click", (function() {
    //   $.get("/addResource/123").then((rows)=>{
    //     console.log(rows);
    //     renderResources(rows, $(".rjtest"));
    //   });

      
    // }));
  

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