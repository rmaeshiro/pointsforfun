class CreateOrderLogs < ActiveRecord::Migration
  def self.up
    create_table :order_logs do |t|
      t.float :order_id
      t.datetime :date_status
      t.integer :order_status_id

      t.timestamps
    end
  end

  def self.down
    drop_table :order_logs
  end
end
