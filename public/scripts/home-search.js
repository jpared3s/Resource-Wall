
console.log("abc")
$(".search-results").on('submit', function(e) {
  e.preventDefault()
  console.log("abc")
  $.ajax({
    method:"POST",
    url: "http://localhost:8080/home/search",
    type: "application/json",
    data: $(this).serialize(),
    success: function(res){
      console.log(res)
      console.log(1,2,3)
      const resultsList= $("#submissions")
      resultsList.empty()
        res.forEach((resource) => {
          const listItem = `<li class="recent-submissions">
          <div id="user-info">
        <span class="user-icon"><i class="fa-sharp fa-solid fa-user"></i></span>
         ${resource.username}
      </div>
      <div id="submission-url">
        ${resource.title}
      </div>
      <div id="stats">
      <span class="fa fa-thumbs-up" id="${resource.id}"></span>
       ${resource.likes}
        <span class="fa-solid fa-star" onclick="window.location.href='/resource/${resource.id}'"></span>
        ${parseFloat(resource.rating).toFixed(0)}
              <span class="fa fa-pen-to-square" title="Submit A Review" onclick="window.location.href='/resource/${resource.id}'"></span>
            </button>
          </div>
        </li>`
          resultsList.append(listItem)
          $(".fa-thumbs-up").on('click', function(e) {
            const resourceId = $(this).attr("id");
            $.ajax({
              method: "POST",
              url: `http://localhost:8080/users/likes/${resourceId}`,
              type: "application/json",
              success: function(res){
                console.log(res)
              }
            })
          })
        })
    }
  })
})

$(".fa-thumbs-up").on('click', function(e) {
  const resourceId = $(this).attr("id");
  $.ajax({
    method: "POST",
    url: `http://localhost:8080/users/likes/${resourceId}`,
    type: "application/json",
    success: function(res){
      console.log(res)
    }
  })
})
// $(".search-results").on('submit', function(e) {
//   e.preventDefault()
//   $.ajax({
//     method:"POST",
//     url: "http://localhost:8080/home/search",
//     type: "application/json",
//     data: $(this).serialize(),
//     success: function(res){
//       console.log(res)
//       // Update the search results element with the response data
//       const resultsList = $(".search-results ul")
//       resultsList.empty()
//       res.forEach((resource) => {
//         const listItem = $("<li>").addClass("recent-submissions")
//         listItem.text(resource.title)
//         resultsList.append(listItem)
//       })
//     },
//     error: function(err){
//       console.log(err)
//     }
//   })
// })
