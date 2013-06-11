class CreateGamePlayer < ActiveRecord::Migration
  def change
    create_table :game_players do |t|
      t.integer :player_id
      t.integer :game_id
    end
  end
end
