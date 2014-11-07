class CompletionsController < ApplicationController

  def create
    @completion = Completion.new({user_id: params[:user_id], item_id: params[:item_id]})
    unless @completion.save
      flash[:errors] = @completion.errors.full_messages
    end

    render json: @completion
  end

  def destroy
    @completion = Completion.find({user_id: params[:user_id], item_id: params[:item_id]})
    unless @completion.destroy
      flash[:errors] = @completion.errors.full_messages
    end

    render json: @completion
  end

end
