class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :winner
      t.float :duration
    end
  end
end
