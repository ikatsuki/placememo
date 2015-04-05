class AddMemoIdToPlaces < ActiveRecord::Migration
  def change
    add_column :places, :memo_id, :string
    add_index :places, :memo_id
  end
end
