class AddColumnCodeOrderStatuses < ActiveRecord::Migration
  def self.up
    add_column :order_statuses, :code,:integer
  end

  def self.down
    remove_column :order_statuses, :code,:integer
  end
end
