get '/' do
  erb :index
end

post '/' do
  @players = []
  game = Game.create()
  params[:players].each do |player|
    player = Player.find_or_create_by_name(name: player)
    @players << player
    GamePlayer.create(game_id: game.id, player_id: player.id)
  end
  @game_id = game.id
  erb :_game, :layout => false
end

post '/save_game' do
  @game = Game.find(params[:game])
  @game.winner = params[:winner]
  @game.duration = params[:duration]
  @game.save
  200
end
