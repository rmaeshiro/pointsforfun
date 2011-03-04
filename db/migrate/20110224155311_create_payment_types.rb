class CreatePaymentTypes < ActiveRecord::Migration
  def self.up
    create_table :payment_types do |t|
      t.integer :code
      t.string :name
      t.string :company
      t.string :institution

      t.timestamps
    end
  end

  def self.down
    drop_table :payment_types
  end
end
