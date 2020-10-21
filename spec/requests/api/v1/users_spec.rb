require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe "#index" do
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

    describe "Sort" do
      before do
        @a = User.create!(name: "AAA", email: "example1@example.com", phone: "123-456-7890")
        @b = User.create!(name: "BBB", email: "example2@example.com", phone: "222-456-7890")
        @c = User.create!(name: "CCC", email: "example3@example.com", phone: "333-456-7890")
      end

      it "returns success response" do
        get "/api/v1/users?sort=name"

        expect(response.status).to eq(200)
      end

      context "when sorting by name" do
        it "returns sorted asc data" do
          get "/api/v1/users?sort=name"
          user_names = response_body["users"].map { |user| user["name"] }

          expect(user_names).to eq [@a.name, @b.name, @c.name]
        end

        it "returns sorted desc data" do
          get "/api/v1/users?sort=-name"
          user_names = response_body["users"].map { |user| user["name"] }

          expect(user_names).to eq [@c.name, @b.name, @a.name]
        end
      end

      context "when sorting by email" do
        it "returns sorted asc data" do
          get "/api/v1/users?sort=email"
          user_names = response_body["users"].map { |user| user["email"] }

          expect(user_names).to eq [@a.email, @b.email, @c.email]
        end

        it "returns sorted desc data" do
          get "/api/v1/users?sort=-email"
          user_names = response_body["users"].map { |user| user["email"] }

          expect(user_names).to eq [@c.email, @b.email, @a.email]
        end
      end

      context "when sorting by phone" do
        it "returns sorted asc data" do
          get "/api/v1/users?sort=phone"
          user_names = response_body["users"].map { |user| user["phone"] }

          expect(user_names).to eq [@a.phone, @b.phone, @c.phone]
        end

        it "returns sorted desc data" do
          get "/api/v1/users?sort=-phone"
          user_names = response_body["users"].map { |user| user["phone"] }

          expect(user_names).to eq [@c.phone, @b.phone, @a.phone]
        end
      end
    end

    describe "Search" do
      before do
        @a = User.create!(name: "AAA", email: "example1@example.com", phone: "123-456-7890")
        @b = User.create!(name: "BBB", email: "example2@example.com", phone: "123-456-7890")
        @c = User.create!(name: "CCC", email: "example3@example.com", phone: "123-456-7890")
      end

      it "returns success response" do
        get "/api/v1/users?search=some-user"

        expect(response.status).to eq(200)
      end

      context "when searching by name" do
        it "returns search data" do
          get "/api/v1/users?search=aaa"

          expect(response_body["users"]).to include @a.as_json
        end
      end

      context "when searching by email" do
        it "returns search data" do
          get "/api/v1/users?search=example2"

          expect(response_body["users"]).to include @b.as_json
        end
      end

      context "when searching by phone" do
        it "returns search data" do
          get "/api/v1/users?search=123"

          expect(response_body["users"]).to include @a.as_json, @b.as_json, @c.as_json
        end
      end
    end
  end

  describe "#show" do
    before do
      @show_user = User.create!(name: Faker::Name.name, email: Faker::Internet.unique.email, phone: Faker::Base.numerify('###-###-####'))
    end

    it "returns success" do
      get "/api/v1/users/#{@show_user.id}"

      expect(response.status).to eq(200)
    end
  end

  describe "#create" do
    context "when successful" do
      it "returns success" do
        post "/api/v1/users", params: { user: { name: Faker::Name.name, email: Faker::Internet.unique.email, phone: Faker::Base.numerify('###-###-####') }}

        expect(response.status).to eq(200)
      end
    end

    context "when error" do
      before do
        @email = Faker::Internet.unique.email
        User.create!(name: Faker::Name.name, email: @email, phone: Faker::Base.numerify('###-###-####'))
      end

      it "returns error" do
        post "/api/v1/users", params: { user: { name: Faker::Name.name, email: @email, phone: Faker::Base.numerify('###-###-####') }}

        expect(response.status).to eq(422)
        expect(response_body["error"]).to include "email" => ["has already been taken"]
      end
    end
  end

  describe "#update" do
    before do
      @update_user = User.create!(name: Faker::Name.name, email: Faker::Internet.unique.email, phone: Faker::Base.numerify('###-###-####'))
    end

    context "when successful" do
      it "returns success" do
        put "/api/v1/users/#{@update_user.id}", params: { user: { name: Faker::Name.name, email: Faker::Internet.unique.email, phone: Faker::Base.numerify('###-###-####') }}

        expect(response.status).to eq(200)
      end
    end

    context "when error" do
      it "returns error" do
        put "/api/v1/users/#{@update_user.id}", params: { user: { name: Faker::Name.name, email: "bad_email", phone: Faker::Base.numerify('###-###-####') }}

        expect(response.status).to eq(422)
      end
    end
  end

  describe "#destroy" do
    before do
      @destroy_user = User.create!(name: Faker::Name.name, email: Faker::Internet.unique.email, phone: Faker::Base.numerify('###-###-####'))
    end

    it "returns no content" do
      delete "/api/v1/users/#{@destroy_user.id}"

      expect(response.status).to eq(204)
    end
  end

  def response_body
    JSON.parse(response.body)
  end
end