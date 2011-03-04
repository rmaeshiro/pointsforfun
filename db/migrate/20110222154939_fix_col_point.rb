class FixColPoint < ActiveRecord::Migration
  def self.up
		rename_column :products, :points_id, :point_id
  end

  def self.down
		rename_column :products, :point_id, :points_id
  end
end
