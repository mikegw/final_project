class Api::ListsController < ApplicationController

  def create
    @list = current_user.lists.new(list_params)
    unless @list.save
      # flash[:errors] = @list.errors.full_messages
      puts "FAILED TO UPDATE"
    end
    render json: @list
  end

  def edit

  end

  def update
    @list = current_user.lists.find(params[:id])
    # transaction do
    #   @list.update(list_params)
    #   @list.collaborations.
    #   flash[:errors] = @list.errors.full_messages
    # end
    unless @list.update(list_params)
      puts "FAILED TO UPDATE"
    end
    render json: @list
  end

  def destroy
    @list = current_user.lists.find(params[:id])
    unless @list.destroy()
      puts "OH NO DIDN'T DESTROY!"
    end
    render json: @list
  end

  private

  def list_params
    params.require(:list).permit(:title, :access, :completed)
  end

end
