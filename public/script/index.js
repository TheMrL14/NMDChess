$(document).on("click", ".split", function() {
  var clickedBtnID = $(this).attr('id'); // or var clickedBtnID = this.id

  let url = './chat?user=' + clickedBtnID;
  console.log(url);
  window.location.href = url;
});