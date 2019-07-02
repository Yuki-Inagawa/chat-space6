class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    @messages = @group.messages.includes(:user).where("group_id", params[:group_id]).where("id >?", params[:last_id])
  end
end