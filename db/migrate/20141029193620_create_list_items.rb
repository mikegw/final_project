class CreateListItems < ActiveRecord::Migration
  def change
    create_table :list_items do |t|
      t.integer :list_id, null: false
      t.string :content, null: false
      t.text :details
      t.boolean :completed, default: false
      t.boolean :starred, default: false
    end

    add_index :list_items, :list_id
  end
end
