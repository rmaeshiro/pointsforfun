class CreatePoints < ActiveRecord::Migration
  def self.up
    create_table :points do |t|
      t.string :name
      t.integer :currency_id

      t.timestamps
    end
  end

  def self.down
    drop_table :points
  end
end
