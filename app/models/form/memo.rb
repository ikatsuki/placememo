class Form::Memo < Memo
  REGISTRABLE_ATTRIBUTES = %i(name)
  has_many :places, class_name: 'Form::Place'

  after_initialize { places.build unless self.persisted? || places.present? }

end
