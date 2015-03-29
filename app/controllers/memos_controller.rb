class MemosController < ApplicationController
  def index
    @memo_items = Memo.all
  end

  def new 
  end
end
