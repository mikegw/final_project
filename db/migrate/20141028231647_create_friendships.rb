class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.integer :befriender, null: false
      t.integer :befriendee, null: false

      t.timestamps
    end
  end
end
