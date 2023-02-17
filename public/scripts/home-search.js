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
          ${resource.title}
          <span class="fa fa-thumbs-up"></span>
          ${parseFloat(resource.rating).toFixed(2)}
            <span class="fa-solid fa-star"></span>
            ${resource.likes}
                <button class="btn" onclick="window.location.href='/review'">
                  <span class="fa fa-pen-to-square"></span>
                </button>
        </li>`
          resultsList.append(listItem)
        })
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
