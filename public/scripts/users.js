// Client facing scripts here
// $(() => {
//   $('#fetch-users').on('click', () => {
//     $.ajax({
//       method: 'GET',
//       url: '/api/users'
//     })
//     .done((response) => {
//       const $usersList = $('#users');
//       $usersList.empty();

//       for(const user of response.users) {
//         $(`<li class="user">`).text(user.name).appendTo($usersList);
//       }
//     });
//   });
// });
// const bcrypt = require('bcrypt');

$(document).ready(function() {
  console.log("I'm ready");
  $(".messages").slideUp(0);
  $(".emailUpdater").submit(function(event) {
    $(".messages").slideUp(0);
    let $form = $(this);
    let $input = $form.find("input");
    event.preventDefault();
    console.log($input.val());
    if (!$input.val()) {
      $(".emailEmpty").slideDown(200);
    }
    if ($input.val()) {
      $(".emailSuccess").slideDown(200);
    }
    // pool.query(`
    // UPDATE users
    // SET email = ${req.body.params}
    // WHERE id = currentuser
    // `).then(() => {console.log("Update successful!")});

  });

  $(".passwordUpdater").submit(function(event) {
    event.preventDefault();
    $(".messages").slideUp(0);
    let $form = $(this);
    let $password = $form.find(".new_password");
    let $confirmation = $form.find(".confirm_new_password");
    if (newPassValidator($password.val(),$confirmation.val()) === "empty") {
      $(".passwordEmpty").slideDown(200);
    }
    // console.log(bcrypt.hashSync($password.val(), 12))
    // console.log($confirmation.val());
    if (newPassValidator($password.val(),$confirmation.val()) === "mismatch") {
      $(".passwordNotMatch").slideDown(200);

    }
    if (newPassValidator($password.val(),$confirmation.val()) === "valid") {
      $(".passwordSuccess").slideDown(200);
    }
    $password.val("");
    $confirmation.val("");

    // pool.query(`
    // UPDATE users
    // SET password = bcrypt.hashSync($password.val(), 12);
    // WHERE id = currentuser
    // `).then(() => {console.log("Update successful!")});


  });




});

const newPassValidator = (password, confirmation) => {
  if (!password || !confirmation) {
    return "empty";
  }
  if (password !== confirmation) {
    return "mismatch";
  }
  return "valid";
}
