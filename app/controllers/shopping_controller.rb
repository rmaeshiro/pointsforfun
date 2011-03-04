class ShoppingController < ApplicationController
	skip_before_filter:authenticate_user!
	def index
		
		redirect_to :action => "category"
	end

	def category
		@shopping_path = "/shopping"
		id = params[:id] || 1
		@categories = Category.find(:all, :conditions => "parent_id = 0")
		@products = Product.find(:all, :conditions => "category_id = #{id} and active = 't'")
	  respond_to do |format|
	    format.html # index.html.erb
	    format.xml  { render :xml => @products }
	  end
	end

end
