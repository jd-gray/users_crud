require 'rails_helper'

RSpec.describe "Users", type: :request do
  it "returns success response" do
    get "/api/v1/users"
    expect(response.status).to eq(200)
  end

  describe "Pagination" do
    before do
      51.times do
        User.create!(name: Faker::Name.name, email: Faker::Internet.unique.email, phone: Faker::Base.numerify('###-###-####'))
      end
    end

    it "returns success response" do
      get "/api/v1/users?page=1"
      
      expect(response.status).to eq(200)
    end

    context "when requesting first page" do
      it "returns paginated data" do
        get "/api/v1/users?page=1"
      
        expect(response_body["total_pages"]).to eq 3
        expect(response_body["current_page"]).to eq 1
        expect(response_body["next_page"]).to eq 2
        expect(response_body["previous_page"]).to eq 1
        expect(response_body["total_users"]).to eq 51
      end
    end

    context "when requesting second page" do
      it "returns paginated data" do
        get "/api/v1/users?page=2"

        expect(response_body["total_pages"]).to eq 3
        expect(response_body["current_page"]).to eq 2
        expect(response_body["next_page"]).to eq 3
        expect(response_body["previous_page"]).to eq 1
        expect(response_body["total_users"]).to eq 51
      end
    end
  end

  def response_body
    JSON.parse(response.body)
  end
end