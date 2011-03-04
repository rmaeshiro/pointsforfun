class CreateProfiles < ActiveRecord::Migration
  def self.up
    create_table :profiles do |t|
      t.string :first_name
      t.string :last_name
      t.string :sex_id
      t.date :date_of_birth
      t.string :CPF
      t.string :RG
      t.string :street_address1
      t.string :street_address2
      t.string :street_number
      t.string :city
      t.integer :zip_code
      t.string :state_id
      t.integer :country_id
      t.integer :phone_country_id
      t.integer :phone_number
      t.integer :mobile_country_id
      t.integer :mobile_number

      t.timestamps
    end
  end

  def self.down
    drop_table :profiles
  end
end
