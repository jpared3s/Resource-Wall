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
  

});