namespace :db do
  desc "Fill database with sample data"
  task populate: :environment do
    make_memos
    make_places
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

def make_places
  Place.create(title: "Nagoya",
              address: "Nagoya",
              latitude: 35.1814464,
              longitude: 136.906398)

  Place.create(title: "Hamamatsu",
              address: "Hamamatsu",
              latitude: 34.7108344,
              longitude: 137.7261258)
end
