class MemosController < ApplicationController
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
end
