class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.integer :befriender_id, null: false
      t.integer :befriendee_id, null: false

      t.timestamps
    end
  end
end
