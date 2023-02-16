$(document).ready(function () {
  console.log("I'm ready to add new comments!");
  $(".messages").slideUp(0);
  $(".hiddenValues").slideUp(0);


  // $(".addComment").submit(function(event) {
  //   event.preventDefault();
  //   let $form = $(this);
  //   let $commentBox = $form.find(".commentText");
  //   let $rating = $form.find("#rating");
  //   // let $parameter = $("body").find(".url")//.attr('href');
  //   let parameter = $("body").find(".url").attr('id');
  //   console.log(parameter);
  //   $(".messages").slideUp(0);
  //   // let $url = $form.find(".url");
  //   // if (!$commentBox.val()) {
  //   //   $(".fieldsEmpty").slideDown(200);
  //   // } else {
  //     console.log($form.serialize());
  //     // $(".addSuccess").slideDown(200);
  //     $.post(`/resource/${parameter}`, $form.serialize()).done(() => location.reload()).fail(() => alert("Something went wrong when posting your comment! Please refresh your page and try again."));
  //   // }  
  // });
  let $form = $(".addComment");
  let $star1 = $form.find(".star1");
  let $star2 = $form.find(".star2");
  let $star3 = $form.find(".star3");
  let $star4 = $form.find(".star4");
  let $star5 = $form.find(".star5");

  $star1.on("mouseenter", () => {
    $star1.addClass("yellow");
  });

  $star1.on("mouseleave", () => {
    $star1.removeClass("yellow");
  });

  $star2.on("mouseenter", () => {
    $star1.addClass("yellow");
    $star2.addClass("yellow");
  });

  $star2.on("mouseleave", () => {
    $star1.removeClass("yellow");
    $star2.removeClass("yellow");
  });

  $star3.on("mouseenter", () => {
    $star1.addClass("yellow");
    $star2.addClass("yellow");
    $star3.addClass("yellow");
  });

  $star3.on("mouseleave", () => {
    $star1.removeClass("yellow");
    $star2.removeClass("yellow");
    $star3.removeClass("yellow");
  });

  $star4.on("mouseenter", () => {
    $star1.addClass("yellow");
    $star2.addClass("yellow");
    $star3.addClass("yellow");
    $star4.addClass("yellow");
  });

  $star4.on("mouseleave", () => {
    $star1.removeClass("yellow");
    $star2.removeClass("yellow");
    $star3.removeClass("yellow");
    $star4.removeClass("yellow");
  });

  $star5.on("mouseenter", () => {
    $star1.addClass("yellow");
    $star2.addClass("yellow");
    $star3.addClass("yellow");
    $star4.addClass("yellow");
    $star5.addClass("yellow");
  });

  $star5.on("mouseleave", () => {
    $star1.removeClass("yellow");
    $star2.removeClass("yellow");
    $star3.removeClass("yellow");
    $star4.removeClass("yellow");
    $star5.removeClass("yellow");
  });

  $star1.on("click", (event) => {
    event.preventDefault();
    let $commentBox = $form.find(".commentText");
    let $rating = $form.find("#rating");
    let parameter = $("body").find(".url").attr('id');
    console.log(parameter);
    $(".messages").slideUp(0);

    let payload = $form.serialize() + '&rating=' + 1;
    console.log(payload);
    $.post(`/resource/${parameter}`, payload).done(() => location.reload()).fail(() => alert("Something went wrong when posting your comment! Please refresh your page and try again."));

  });
  $star2.on("click", (event) => {
    event.preventDefault();
    let $commentBox = $form.find(".commentText");
    let $rating = $form.find("#rating");
    let parameter = $("body").find(".url").attr('id');
    console.log(parameter);
    $(".messages").slideUp(0);

    let payload = $form.serialize() + '&rating=' + 2;
    console.log(payload);
    $.post(`/resource/${parameter}`, payload).done(() => location.reload()).fail(() => alert("Something went wrong when posting your comment! Please refresh your page and try again."));

  });
  $star3.on("click", (event) => {
    event.preventDefault();
    let $commentBox = $form.find(".commentText");
    let $rating = $form.find("#rating");
    let parameter = $("body").find(".url").attr('id');
    console.log(parameter);
    $(".messages").slideUp(0);

    let payload = $form.serialize() + '&rating=' + 3;
    console.log(payload);
    $.post(`/resource/${parameter}`, payload).done(() => location.reload()).fail(() => alert("Something went wrong when posting your comment! Please refresh your page and try again."));

  });
  $star4.on("click", (event) => {
    event.preventDefault();
    let $commentBox = $form.find(".commentText");
    let $rating = $form.find("#rating");
    let parameter = $("body").find(".url").attr('id');
    console.log(parameter);
    $(".messages").slideUp(0);

    let payload = $form.serialize() + '&rating=' + 4;
    console.log(payload);
    $.post(`/resource/${parameter}`, payload).done(() => location.reload()).fail(() => alert("Something went wrong when posting your comment! Please refresh your page and try again."));

  });
  $star5.on("click", (event) => {
    event.preventDefault();
    let $commentBox = $form.find(".commentText");
    let $rating = $form.find("#rating");
    let parameter = $("body").find(".url").attr('id');
    console.log(parameter);
    $(".messages").slideUp(0);

    let payload = $form.serialize() + '&rating=' + 5;
    console.log(payload);
    $.post(`/resource/${parameter}`, payload).done(() => location.reload()).fail(() => alert("Something went wrong when posting your comment! Please refresh your page and try again."));

  });

  // $(".addComment").submit(function (event) {
  //   event.preventDefault();
  //   let $commentBox = $form.find(".commentText");
  //   let $rating = $form.find("#rating");
  //   // let $parameter = $("body").find(".url")//.attr('href');
  //   let parameter = $("body").find(".url").attr('id');
  //   console.log(parameter);
  //   $(".messages").slideUp(0);
  //   // let $url = $form.find(".url");
  //   // if (!$commentBox.val()) {
  //   //   $(".fieldsEmpty").slideDown(200);
  //   // } else {
  //   let payload = $form.serialize();
  //   console.log(payload);
  //   // $(".addSuccess").slideDown(200);
  //   $.post(`/resource/${parameter}`, $form.serialize()).done(() => location.reload()).fail(() => alert("Something went wrong when posting your comment! Please refresh your page and try again."));
  //   // }  
  // });


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
  for (comment of array) {
    return `
    ${comment}

  `
  }
}