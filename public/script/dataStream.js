document.addEventListener("DOMContentLoaded", function() {

  //------------------------------------------------------------------------CODE
  const form = document.getElementById("vote-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const choice = document.querySelector("input[name=pos]:checked").value;


    const data = {
      pos: choice
    };

    fetch('./poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => res.json())
      .catch(err => console.log(err));


  });

  fetch('http://localhost:3000/poll')
    .then(res => res.json())
    .then(data => {
      const votes = data.votes;
      const totalVotes = votes.length;
      //Count

      let voteCounts = {
        option1: 0,
        option2: 0,
        option3: 0
      };

      voteCounts = votes.reduce((acc, vote) => (
        (acc[vote.pos] = (acc[vote.pos] || 0) + parseInt(vote.points)), acc), {});

      let dataPoints = [{
          label: 'option1',
          count: voteCounts.option1
        },
        {
          label: 'option2',
          count: voteCounts.option2
        },
        {
          label: 'option3',
          count: voteCounts.option3
        }
      ];
      var pusher = new Pusher('5110e29e563becf91c35', {
        cluster: 'eu',
        forceTLS: true
      });
      var channel = pusher.subscribe('my-poll');
      channel.bind('my-vote', function(data) {

        //alert(JSON.stringify(data));
        // console.log(data);
        console.log(dataPoints);
        dataPoints = dataPoints.map(i => {

          if (i.label == data.pos) {
            i.count++;
            return i;
          } else {
            return i;
          }

        })
      });
    })
  //----------------------------------------------------------------------------


  // Enable pusher logging - don't include this in production
  Pusher.logToConsole = true;


  //----------------------------------------------------------------------------
});

function calc() {

}