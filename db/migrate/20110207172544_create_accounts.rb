class CreateAccounts < ActiveRecord::Migration
  def self.up
    create_table :accounts do |t|
      t.integer :user_id
      t.integer :point_id
      t.integer :card_number
      t.date :date_valid
      t.string :cvv
      t.decimal :balance, :precision => 8, :scale => 2, :default => 0

      t.timestamps
    end
  end

  def self.down
    drop_table :accounts
  end
end
