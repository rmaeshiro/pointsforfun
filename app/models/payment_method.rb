class PaymentMethod < ActiveRecord::Base
  has_many :orders
end
