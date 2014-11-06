class Api::ListItemsController < ApplicationController

  def create
    list = List.find(params[:list_id])
    @list_item = list.list_items.new(list_item_params)
    unless @list_item.save
      flash[:errors] = @list_item.errors.full_messages
    end
    render json: @list_item
  end

  def update
    list = List.find(params[:list_id])
    @list_item = list.list_items.find(params[:id])
    unless @list_item.update(list_item_params)
      flash[:errors] = @list_item.errors.full_messages
      puts "FAILED"
    end
    render json: @list_item
  end

  def destroy
    list = List.find(params[:list_id])
    @list_item = list.list_items.find(params[:id])
    unless @list_item.destroy!
      flash[:errors] = @list_item.errors.full_messages
    end
    redirect_to user_url(current_user)
  end

  private

  def list_item_params
    params.require(:list_item).permit(:content, :details, :completed, :starred)
  end

end
