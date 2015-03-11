class CreateMemos < ActiveRecord::Migration
  def change
    create_table :memos do |t|
      t.string :name
      t.string :explanation

      t.timestamps null: false
    end
  end
end
