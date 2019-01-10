document.addEventListener("DOMContentLoaded", function() {
  push();

  const testBtn = document.getElementById("reset");
  testBtn.addEventListener("click", (e) => {
    fetch('./pollItems')
      .then(res => res.json())
      .then(data => {
        console.log(data.PollItems[0]);
        for (var i = 0; i < data.PollItems.length; i++) {

          fetch('./pollItems/' + data.PollItems[i]._id, {
            method: "delete"
          }).then(console.log());
        }
      });

    fetch('./poll')
      .then(res => res.json())
      .then(data => {
        console.log(data.votes);
        for (var i = 0; i < data.votes.length; i++) {

          fetch('./poll/' + data.votes[i]._id, {
            method: "delete"
          }).then(console.log());
        }
      });

  });
});

var push = () => {
  var pusher = new Pusher('5110e29e563becf91c35', {
    cluster: 'eu',
    forceTLS: true
  });
  var channel = pusher.subscribe('my-poll');
  channel.bind('my-vote', function(data) {

  });
}