class Api::SharesController < ApplicationController

  def create
    @share = Share.new({user_id: params[:user_id],list_id: params[:list_id]})
    unless @share.save
      flash[:errors] = @share.errors.full_messages
    end

    render json: @share
  end

  def destroy
    @share = Share.find({user_id: params[:user_id],list_id: params[:list_id]})
    unless @share.destroy
      flash[:errors] = @share.errors.full_messages
    end

    render json: @share
  end

end
