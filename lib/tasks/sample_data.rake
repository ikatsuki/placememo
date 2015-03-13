namespace :db do
  desc "Fill database with sample data"
  task populate: :environment do
    make_memos
  end
end

def make_memos
  20.times do |n|
    name  = Faker::Address.city
    explanation = Faker::Lorem.sentence
    Memo.create!(name: name,
                 explanation: explanation)
  end
end

