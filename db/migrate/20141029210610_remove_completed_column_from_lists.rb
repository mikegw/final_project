class RemoveCompletedColumnFromLists < ActiveRecord::Migration
  def up
    remove_column :lists, :completed
  end

  def down
    add_column :lists, :completed, :boolean
  end
end
