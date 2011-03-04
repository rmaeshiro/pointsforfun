class OrderLogsController < ApplicationController
  # GET /order_logs
  # GET /order_logs.xml
  def index
    @order_logs = OrderLog.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @order_logs }
    end
  end

  # GET /order_logs/1
  # GET /order_logs/1.xml
  def show
    @order_log = OrderLog.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @order_log }
    end
  end

  # GET /order_logs/new
  # GET /order_logs/new.xml
  def new
    @order_log = OrderLog.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @order_log }
    end
  end

  # GET /order_logs/1/edit
  def edit
    @order_log = OrderLog.find(params[:id])
  end

  # POST /order_logs
  # POST /order_logs.xml
  def create
    @order_log = OrderLog.new(params[:order_log])

    respond_to do |format|
      if @order_log.save
        format.html { redirect_to(@order_log, :notice => 'Order log was successfully created.') }
        format.xml  { render :xml => @order_log, :status => :created, :location => @order_log }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @order_log.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /order_logs/1
  # PUT /order_logs/1.xml
  def update
    @order_log = OrderLog.find(params[:id])

    respond_to do |format|
      if @order_log.update_attributes(params[:order_log])
        format.html { redirect_to(@order_log, :notice => 'Order log was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @order_log.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /order_logs/1
  # DELETE /order_logs/1.xml
  def destroy
    @order_log = OrderLog.find(params[:id])
    @order_log.destroy

    respond_to do |format|
      format.html { redirect_to(order_logs_url) }
      format.xml  { head :ok }
    end
  end
end
