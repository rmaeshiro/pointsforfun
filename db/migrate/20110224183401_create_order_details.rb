  class CreateOrderDetails < ActiveRecord::Migration
  def self.up
    create_table :order_details do |t|
      t.float :order_id
      t.integer :product_id
      t.integer :point_id
      t.integer :point_value
      t.integer :quantity
      t.decimal :currency_value, :precision => 8, :scale => 2
      t.decimal :quotation, :precision => 8, :scale => 2

      t.timestamps
    end
  end

  def self.down
    drop_table :order_details
  end
end
