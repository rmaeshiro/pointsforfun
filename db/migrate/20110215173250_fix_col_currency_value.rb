class FixColCurrencyValue < ActiveRecord::Migration
  def self.up
		rename_column :products, :cuurency_value, :currency_value
  end

  def self.down
		rename_column :products, :currency_value, :cuurency_value
  end
end
