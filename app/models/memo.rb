class Memo < ActiveRecord::Base
  has_many :places, dependent: :destroy
  accepts_nested_attributes_for :places, allow_destroy: true

  validates :name,  presence: true, length: { maximum: 50 }
end
