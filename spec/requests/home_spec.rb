require 'rails_helper'

RSpec.describe "Home", type: :request do
  it "returns success response" do
    get "/"
    expect(response.status).to eq(200)
  end
end