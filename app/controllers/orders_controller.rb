class OrdersController < ApplicationController
  protect_from_forgery :except  => [:request_payment_status]
  skip_before_filter:authenticate_user!

  # GET /orders
  # GET /orders.xml
  def index
    @orders = Order.find_all_by_user_id(current_user.id)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @orders }
    end
  end

  # GET /orders/1
  # GET /orders/1.xml
  def show
    order_id = (params.nil?)? session[:current_order_id] : params[:id]

    @order = Order.find(params[:id])
    @order_details = OrderDetail.find_all_by_order_id(@order.id)
    session[:current_order_id] = @order.id
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @order }
    end
  end

  # GET /orders/new
  # GET /orders/new.xml
  def new
    @order = Order.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @order }
    end
  end

  # GET /orders/1/edit
  def edit
    @order = Order.find(params[:id])
  end

  # POST /orders
  # POST /orders.xml
  def create
    @order = Order.new(params[:order])

    respond_to do |format|
      if @order.save
        format.html { redirect_to(@order, :notice => 'Order was successfully created.') }
        format.xml  { render :xml => @order, :status => :created, :location => @order }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @order.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /orders/1
  # PUT /orders/1.xml
  def update
    @order = Order.find(params[:id])

    respond_to do |format|
      if @order.update_attributes(params[:order])
        format.html { redirect_to(@order, :notice => 'Order was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @order.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /orders/1
  # DELETE /orders/1.xml
  def destroy
    @order = Order.find(params[:id])
    @order.destroy

    respond_to do |format|
      format.html { redirect_to("/orders") }
      format.xml  { head :ok }
    end
  end

	def payment
    @order = Order.find(session[:current_order_id])
    render :layout => false
  end

  def request_payment_status
    order = {}
    order_logs ={}
    payment_type ={}
    payment_type["1"] = 9
    payment_type["2"] = 10
    payment_type["36"] = 0
    payment_type["14"] = 12
    payment_type["7"]  = 11
    payment_type["37"] = 0
    payment_type["8"] = 14
    payment_type["13"] = 15
    payment_type["15"] = 16

    @status = "ok"
    order_id = params[:codigo_pedido]
    codigo_status = params[:codigo_status]


    #find order
    order_record = Order.find(order_id)
    if !order_record.nil?
       order[:gateway_transaction_id] = params[:uid_pedido]
       order[:order_status_id] = codigo_status
       #if order status is Pendeting or paid
      if codigo_status == '2' || codigo_status == '3'
        order[:payment_type_id] = payment_type[params[:codigo_pagamento]]
        order[:payment_method_id] = params[:forma_pagamento]
        #order[:currency_value] = params[:codigo_status]
        order[:payment_date] = DateTime.strptime(params[:data_pagamento] + " " +params[:hora_pagamento],"%d%m%Y %H%M%S")
        #if payment type =credit card
        if params[:codigo_pagamento] == '1' || params[:codigo_pagamento] == '2' ||
           params[:codigo_pagamento] == '36' || params[:codigo_pagamento] == '14' ||
           params[:codigo_pagamento] == '7'
          order[:cc_capturado ]  = params[:capturado]
          order[:cc_numero_autorizado] = params[:numero_autorizacao]
          order[:cc_numero_transacao] = params[:numero_transacao]
          order[:cc_numero_cv] = params[:numero_cv]
          order[:cc_nacionalidade_emissor]  = params[:nacionalidade_emissor]
          order[:cc_codigo_retorno] = params[:cc_codigo_retorno]
        else
          #if payment type = boleto
          if params[:codigo_pagamento] == '15'
            order[:boleto_nosso_numero] = params[:nosso_numero]
            order[:boleto_vencimento] = params[:vencimento]
          end
        end
      end
      order_record  = Order.update(order_id,order)
      if(order_record.save)
        #recodord log of order
        order_logs[:date_status] = DateTime.strptime(params[:data_status] + " " +params[:hora_status],"%d%m%Y %H%M%S")
        order_logs[:order_id]  =  order_id
        order_logs[:order_status_id] = params[:codigo_status]
        OrderLog.create(order_logs)

        order_details = OrderDetail.find_all_by_order_id(order_record.id)

        total_points={}
        order_details.each do |item|
          if total_points[item.point_id].nil?
            total_points[item.point_id] = 0
          end
          total_points[item.point_id] +=  item.point_value

        end
        account_test ={}
        total_points.each do |point|
          #find account
          account_record = Account.find_by_user_id_and_point_id(order_record.user_id, point[0])
          if account_record.empty?
            account_test[point[0]]= false
          else
            account_test[point[0]]= true
          end
        end
      end
    end
         @status =  account_test
    render :layout => false
  end
end
