# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :book do
    title "MyText"
    author "MyText"
    cover_image "MyString"
  end
end
