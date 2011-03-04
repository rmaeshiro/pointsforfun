class PaymentType < ActiveRecord::Base
  has_one :order
end
