class Category < ActiveRecord::Base
  has_many :subcategory, :class_name => "Category", :foreign_key => "parent_id"
  belongs_to :parent_category, :class_name => "Category"
end
