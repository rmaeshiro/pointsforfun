class CreateTransactions < ActiveRecord::Migration
  def self.up
    create_table :transactions do |t|
      t.datetime :date
      t.integer :account_id
      t.integer :transaction_type_code
      t.decimal :points_value, :precision => 8, :scale => 2
      t.integer :account_from_id

      t.timestamps
    end
  end

  def self.down
    drop_table :transactions
  end
end
