class CreateQuotations < ActiveRecord::Migration
  def self.up
    create_table :quotations do |t|
      t.datetime :date
      t.integer :currency_id
      t.decimal :value, :precision => 8, :scale => 2

      t.timestamps
    end
  end

  def self.down
    drop_table :quotations
  end
end
