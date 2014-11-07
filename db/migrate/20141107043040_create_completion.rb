class CreateCompletion < ActiveRecord::Migration
  def change
    create_table :completions do |t|
      t.integer :user_id, null: false
      t.integer :item_id, null: false

      t.timestamps
    end

    add_index :completions, [:user_id, :item_id]
  end
end
