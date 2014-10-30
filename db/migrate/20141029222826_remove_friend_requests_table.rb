class RemoveFriendRequestsTable < ActiveRecord::Migration
  def up
    remove_index :friend_requests, [:sender_user_id, :receiver_user_id]
    drop_table :friend_requests
  end

  def down
    create_table :friend_requests do |t|
      t.integer :sender_user_id
      t.integer :receiver_user_id
      t.string :status, default: "PENDING"

      t.timestamps
    end

    add_index :friend_requests, [:sender_user_id, :receiver_user_id]
  end
end
