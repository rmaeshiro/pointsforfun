class FixDefaultValueStatusOrder < ActiveRecord::Migration
  def self.up
    change_column_default(:orders, :order_status_id, 1)
  end

  def self.down
    change_column_default(:orders, :order_status_id, 0)
  end
end
