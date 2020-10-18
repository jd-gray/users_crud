require 'faker'

def coin_flip(weight = 50)
  rand <= weight / 100.0
end

users = []

5_000.times do |i|
  title = coin_flip ? Faker::Name.prefix : nil
  status = coin_flip ? 0 : 1

  users << User.new(name: Faker::Name.name, email: Faker::Internet.unique.email, phone: Faker::Base.numerify('###-###-####'), status: status, title: title)
end

User.import users