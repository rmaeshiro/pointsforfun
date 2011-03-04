require 'test_helper'

class OrderLogsControllerTest < ActionController::TestCase
  setup do
    @order_log = order_logs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:order_logs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create order_log" do
    assert_difference('OrderLog.count') do
      post :create, :order_log => @order_log.attributes
    end

    assert_redirected_to order_log_path(assigns(:order_log))
  end

  test "should show order_log" do
    get :show, :id => @order_log.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @order_log.to_param
    assert_response :success
  end

  test "should update order_log" do
    put :update, :id => @order_log.to_param, :order_log => @order_log.attributes
    assert_redirected_to order_log_path(assigns(:order_log))
  end

  test "should destroy order_log" do
    assert_difference('OrderLog.count', -1) do
      delete :destroy, :id => @order_log.to_param
    end

    assert_redirected_to order_logs_path
  end
end
