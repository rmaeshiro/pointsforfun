class Currency < ActiveRecord::Base
	has_one :point
	has_one :product, :through =>:point 
	has_one :quotation

end
