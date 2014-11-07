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
    completed = @list_item.completed
    ActiveRecord::Base.transaction do
      begin
        @list_item.update(list_item_params)
        p @list_item
        puts "item updated"
        if !completed && list_item_params[:completed]
          puts "trying to create user #{current_user.id}, item #{params[:id]}"
          Completion.create!({user_id: current_user.id, item_id: params[:id]})
          puts "Completed #{@list_item.content}"
        end
      rescue
        flash[:errors] = @list_item.errors.full_messages
        puts @list_item.errors.full_messages
        puts "FAILED"
        return render json: []
      end
    end
    render json: @list_item
  end

  def destroy
    list = List.find(params[:list_id])
    @list_item = list.list_items.find(params[:id])
    unless @list_item.destroy!
      flash[:errors] = @list_item.errors.full_messages
    end
    render json: @list_item
  end

  private

  def list_item_params
    params.require(:list_item).permit(:content, :details, :completed, :starred)
  end

end
