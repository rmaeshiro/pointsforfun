class CreateProducts < ActiveRecord::Migration
  def self.up
    create_table :products do |t|
      t.string :name
      t.text :description
      t.string :image
      t.integer :points_id
      t.decimal :points_value, :precision => 8, :scale => 2
      t.decimal :cuurency_value, :precision => 8, :scale => 2
      t.integer :category_id
      t.boolean :active

      t.timestamps
    end
  end

  def self.down
    drop_table :products
  end
end
