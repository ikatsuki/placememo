class MemosController < ApplicationController
  def index
    @memo_items = Memo.all
  end
end
