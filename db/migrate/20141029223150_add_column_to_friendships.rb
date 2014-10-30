class AddColumnToFriendships < ActiveRecord::Migration
  def change
    add_column :friendships, :status, :string, default: "PENDING"
  end
end
