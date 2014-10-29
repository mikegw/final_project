class CreateShares < ActiveRecord::Migration
  def change
    create_table :shares do |t|
      t.integer :user_id, null: false
      t.integer :list_id, null: false
    end

    add_index :shares, [:user_id, :list_id], unique: true
  end
end
