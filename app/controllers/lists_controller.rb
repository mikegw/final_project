class ListsController < ApplicationController

  def create
    @list = current_user.lists.new(list_params)
    unless @list.save
      flash[:errors] = @list.errors.full_messages
    end
    redirect_to root_url
  end

  def edit

  end

  def update
    @list = current_user.lists.find(params[:id])
    unless @list.save
      flash[:errors] = @list.errors.full_messages
    end
    redirect_to root_url
  end

  def destroy
  end

  private

  def list_params
    params.require(:list).permit(:title, :access, :completed)
  end

end