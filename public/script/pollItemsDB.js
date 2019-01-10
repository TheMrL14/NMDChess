let items = 0;
let arrayOfPos = [];

let counterOfPoll = 0;

document.addEventListener("DOMContentLoaded", function() {

  setInterval(function() {
    doIt();
  }, 100);

  doIt();
  //--------------------------------------------------------------------------POST Items
  const testBtn = document.getElementById("chessBoard");
  testBtn.addEventListener("click", (e) => {
    doIt();
  });

  //------------------------------------------------------------------------------POST Votes <------OO
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
    doIt();
  });



  let pusher = new Pusher('5110e29e563becf91c35', {
    cluster: 'eu',
    forceTLS: true
  });
  let channel = pusher.subscribe('my-poll');
  channel.bind('my-vote', function(data) {
    doIt();
    dataPoints = dataPoints.map(i => {

      if (i.label == data.pos) {
        i.count++;

        return i;
      } else {
        return i;
      }

    })
  });

  let channel2 = pusher.subscribe('my-poll');
  channel2.bind('my-PollItem', function(data) {
    doIt();
  });
});



function doIt() {
  //------------------------------------------------------------------------------GET items
  fetch('./pollItems')
    .then(res => res.json())
    .then(data => {
      items = data.PollItems;
      if (items.length >= counterOfPoll) {
        counterOfPoll = items.length;
        console.log(counterOfPoll);
      } else {
        console.log("gereset");
        counterOfPoll = 0;
        locked = false;
      }
      document.getElementById('items').innerHTML = "";
      for (let i = 0; i < items.length; i++) {
        arrayOfPos.push(items[i].pos);

        //------------------------------------------------------------------------------ADD items to HTML

        let html = document.createElement('p');
        html.innerHTML = '<label><input type = "radio"' +
          'name = "pos" ' +
          'id="option' + i + '"' +
          'value="' + items[i].pos + '"' +
          ">" +
          "<span>" +
          items[i].pos + "</span>" +
          "</label>";
        document.getElementById('items').appendChild(html);
      }
    });
  //------------------------------------------------------------------------------GET Votes

  fetch('./poll')
    .then(res => res.json())
    .then(data => {
      const votes = data.votes;
      const totalVotes = votes.length;
      //------------------------------------------------------------------------------Count
      let voteCounts = {};
      arrayOfPos.forEach(function(i) {
        voteCounts[i] = 0;
      });

      voteCounts = votes.reduce((acc, vote) => (
        (acc[vote.pos] = (acc[vote.pos] || 0) + parseInt(vote.points)), acc), {});
    });
}