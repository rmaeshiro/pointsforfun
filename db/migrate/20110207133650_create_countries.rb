class CreateCountries < ActiveRecord::Migration
  def self.up
    create_table :countries do |t|
      t.integer :code
      t.string :iso_code2
      t.string :iso_code3
      t.string :name

      t.timestamps
    end
  end

  def self.down
    drop_table :countries
  end
end
