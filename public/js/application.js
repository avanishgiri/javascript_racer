$(document).ready(function(){
  $('.player_names').on("submit", function(e){
    e.preventDefault();
    $.ajax({
      method: "POST",
      data: $(this).serialize(),
      url: "/"
    }).done(function(response){
      $('.player_names').remove();
      $('#instructions').show().hide(2000);
      $('#racetrack').html(response);
      bindKeyUps();
    });
  });
});

function moveForward(rowID, className){
  $('#' + rowID + ' ' + '.' + className).next()
  .addClass(className)
  .prev()
  .removeClass(className);
}

function bindKeyUps(){
  var startTime = $.now();
  $(document).keyup(function(event) {
    if(event.which == 'Q'.charCodeAt()){
      moveForward('player1','active');
    }
    else if(event.which == 'P'.charCodeAt()) {
      moveForward('player2','active');
    }
    var winning_player_id = checkGameOver();
    if(winning_player_id)
    {
      $(document).off("keyup");
      var game_id = $('table').data('id');
      var gameDuration = ($.now() - startTime)/1000;
      var winner_name = $(".active:last-child").parent().data("name")
      $("#winner_name").html(winner_name);
      $("#duration").html(gameDuration);
      $("#winner_message").slideDown();
      $('#endgame').show();
      $.ajax({
        method: "POST",
        data: "winner=" + winning_player_id + "&game=" + game_id + "&duration=" + gameDuration,
        url: "/save_game"
      });
    }
  });
}

function showEndGameOptions(){

}

function checkGameOver(){
  var done = false;
  $('td:last-child').each(function(){
    if($(this).attr('class') == 'active')
      done = $(this).parent().data('id');
  });
  return done;
}

function resetBoard(){
  $('.active').removeClass('active');
  $('td:first-child').addClass('active');
}

// later: add a JS validation to prevent folks from playing themselves
