class Profile < ActiveRecord::Base
	has_one :user
=begin
  #valida null
	validates_presence_of  :first_name,
		:last_name,
		:sex_id,
		:date_of_birth,
		:CPF,
		:RG,
		:street_address1,
		:street_number,
		:city,
		:zip_code,
		:state_id,
		:country_id,
		:phone_country_id,
		:phone_number,
    :message => "não pode ficar em branco."

    #valida unico
    validates_uniqueness_of :CPF, :RG,
    :on => :create,
    :allow_blank => true,
    :message => "já cadastrado em nossa base."

    #valida numericos
    validates_numericality_of :CPF,
    	:RG,
    	:zip_code,
    	:street_number,
    	:phone_number,
    	:phone_country_id,
    :only_integer => true,
    :allow_blank => true,
    :message => "deve ser digitado somente números."
=end
end
