class MemosController < ApplicationController
  before_action :correct_memo,    only: [:edit, :update] 

  def index
    @memo_items = Memo.all
  end

  def new
    @memo = Form::Memo.new
  end

  def create
    @memo = Form::Memo.new(memo_params)
    if @memo.save
      redirect_to memos_path, notice: "Created #{@memo.name} "
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @memo.update_attributes(memo_params)
      redirect_to memos_path, notice: "Updated #{@memo.name} "
    else
      render :edit
    end
  end

  def destroy

  end

  private

  def memo_params
    params
    .require(:form_memo)
    .permit(
      Form::Memo::REGISTRABLE_ATTRIBUTES +
      [places_attributes: Form::Place::REGISTRABLE_ATTRIBUTES]
    )
  end

  def correct_memo
    @memo = Form::Memo.find(params[:id])
  end

end
