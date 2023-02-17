$(document).ready(function () {
  console.log("I'm ready to add new comments!");
  $(".messages").slideUp(0);


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
  let $twoStar = $form.find(".firstTwo");
  let $threeStar = $form.find(".firstThree");
  let $fourStar = $form.find(".firstFour");
  let $allStar = $form.find(".fa-star");
  let $thumb = $(".fa-thumbs-up");

  $thumb.on("mouseenter", () => {
    $thumb.addClass("fa-solid");
    $thumb.removeClass("fa-regular");
  });

  $thumb.on("mouseleave", () => {
    $thumb.addClass("fa-regular");
    $thumb.removeClass("fa-solid");
  });

  $thumb.on("click", () => {
    let parameter = $("body").find(".url").attr('id');
    $.post(`/resource/${parameter}/like`)
      .done(() => {
        alert("You have liked this resource")
      })
      .fail((err) => alert(err));
  })

  $star1.on("mouseenter", () => {
    $star1.addClass("yellow");
  });

  $star1.on("mouseleave", () => {
    $star1.removeClass("yellow");
  });

  $star2.on("mouseenter", () => {
    $twoStar.addClass("yellow");
  });

  $star2.on("mouseleave", () => {
    $twoStar.removeClass("yellow");
  });

  $star3.on("mouseenter", () => {
    $threeStar.addClass("yellow");
  });

  $star3.on("mouseleave", () => {
    $threeStar.removeClass("yellow");
  });

  $star4.on("mouseenter", () => {
    $fourStar.addClass("yellow");
  });

  $star4.on("mouseleave", () => {
    $fourStar.removeClass("yellow");
  });

  $star5.on("mouseenter", () => {
    $allStar.addClass("yellow")
  });

  $star5.on("mouseleave", () => {
    $allStar.removeClass("yellow");    
  });

  $star1.on("click", (event) => {
    event.preventDefault();
    let parameter = $("body").find(".url").attr('id');
    console.log(parameter);
    $(".messages").slideUp(0);

    let payload = $form.serialize() + '&rating=' + 1;
    submission(parameter, payload);

  });
  $star2.on("click", (event) => {
    event.preventDefault();
    let parameter = $("body").find(".url").attr('id');
    console.log(parameter);
    $(".messages").slideUp(0);

    let payload = $form.serialize() + '&rating=' + 2;
    submission(parameter, payload);

  });
  $star3.on("click", (event) => {
    event.preventDefault();
    let parameter = $("body").find(".url").attr('id');
    console.log(parameter);
    $(".messages").slideUp(0);

    let payload = $form.serialize() + '&rating=' + 3;
    submission(parameter, payload);

  });
  $star4.on("click", (event) => {
    event.preventDefault();
    let parameter = $("body").find(".url").attr('id');
    console.log(parameter);
    $(".messages").slideUp(0);

    let payload = $form.serialize() + '&rating=' + 4;
    submission(parameter, payload);

  });
  $star5.on("click", (event) => {
    event.preventDefault();
    let parameter = $("body").find(".url").attr('id');
    console.log(parameter);
    $(".messages").slideUp(0);

    let payload = $form.serialize() + '&rating=' + 5;
    submission(parameter, payload);

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

const submission = (route, data)=>{
  $.post(`/resource/${route}`, data).done(() => location.reload()).fail(() => alert("Something went wrong when posting your rating! Please refresh your page and try again."));
}

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