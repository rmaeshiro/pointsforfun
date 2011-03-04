  class CartController < ApplicationController

	def index
		@cart = my_cart

		@totals = calculate_total(@cart)
		#@quotations = Quotation.find(:all, :order => "date,currency_id DESC",:group => 'currency_id')

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @cart }
    end

	end

  def add
		Cart.create(:user_id => current_user.id,
								:product_id => params[:id]
								)
		redirect_to :action => "index"
  end

	def remove
		@cart = Cart.find(params[:id])
		@cart.destroy
		redirect_to :action => "index"
	end

	def remove_all
    clean_my_cart
		redirect_to :action => "index"
	end

	def update
    logger.debug "The object1 is #{params}"
    update_quantity params
		redirect_to :action => "index"
	end

	def checkout
    update_quantity params
    if !params[:products].nil?
      @cart = my_cart
      @totals =calculate_total(@cart)

      order_r = Order.create(:date => Time.now,
          :user_id => current_user.id,
          :currency_value => @totals[:geral]
      )

      @cart.each do |item|
        quotation = Quotation.find_by_currency_id(item.product.point.currency.id,
                                            :order => "date,currency_id DESC",
                                            :group => 'currency_id').value
        OrderDetail.create(:order_id => order_r.id,
          :product_id     =>   item.product_id,
          :point_id       =>   item.product.point_id,
          :point_value    =>   item.product.points_value ,
          :quantity       =>   item.quantity ,
          :currency_value =>   item.product.currency_value ,
          :quotation      =>   quotation
        )
      end


      clean_my_cart
      session[:current_order_id] = order_r.id
      redirect_to :controller => 'orders', :action => "show", :id => order_r.id
    else
      redirect_to :action => "index"
    end

	end

	def checkout_payment
			render :layout => false
	end

	private

  def my_cart
     Cart.joins(:product).where("user_id = #{current_user.id} and active = 't'").order("point_id")
  end

  def clean_my_cart
		@cart = Cart.where("user_id = #{current_user.id}")
		@cart.destroy_all
  end

  def update_quantity (params)
    logger.debug "The object is #{params}"
    if !params[:products].nil?
      @cart = Cart.where("user_id = #{current_user.id}")

      params[:products].each { |items| @cart.update(items[0], items[1]) }
    end
  end

	def calculate_total(product_list)
		total = {}
		totalizador ={}
		point_id = 0
		point_id_tmp = 0
		total_geral  = 0
    subtotal_real = 0
		product_list.each do |item|
			point_id = item.product.point_id
			quotation = Quotation.find_by_currency_id(item.product.point.currency.id,
																								:order => "date,currency_id DESC",
																								:group => 'currency_id').value
				sub_total_points = (item.product.points_value * item.quantity)
				sub_total_currency = (item.product.currency_value * item.quantity)
				subtotal_real = sub_total_currency * quotation
			if point_id != point_id_tmp

        total_geral += subtotal_real
				total[point_id] = {:pointName => item.product.point.name,
													 :currencyName => item.product.point.currency.abbreviation,
													 :subTotalPoints => sub_total_points,
													 :subTotalCurrency => sub_total_currency,
													 :quotation => quotation,
													 :subtotalReal => number_to_currency(subtotal_real)
													}
				point_id_tmp = point_id
      else
        total_geral += subtotal_real
				total[point_id][:subTotalPoints] += sub_total_points
				total[point_id][:subTotalCurrency] += sub_total_currency
				total[point_id][:subtotalReal] =  total[point_id][:subTotalCurrency] * quotation
			end

		end
		totalizador[:items] = total
		totalizador[:geral] = (total_geral == 0)?"" :total_geral.to_s("F")
		totalizador
	end
end
