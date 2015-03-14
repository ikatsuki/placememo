require 'spec_helper'

describe Memo do

  before do
    @memo= Memo.new(name: "Example Memo", explanation: "Example Explanation")
  end

  subject { @memo }

  it { should respond_to(:name) }
  it { should respond_to(:explanation) }

  it { should be_valid }

  describe "when name is not present" do
    before { @memo.name = " " }
    it { should_not be_valid }
  end
  
  describe "when name is too long" do
    before { @memo.name = "a" * 51 }
    it { should_not be_valid }
  end

end

