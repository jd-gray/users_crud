require 'rails_helper'

RSpec.describe User, type: :model do
  describe "Validations" do
    subject { described_class.new(name: "Jared Gray", email: "jaredgray.dev@gmail.com", phone: "714-767-6304", status: 0) }

    it "is valid with required attributes" do
      expect(subject).to be_valid
    end

    it "is NOT valid without name" do
      subject.name = nil
      expect(subject).to_not be_valid
    end

    it "is NOT valid without email" do
      subject.email = nil
      expect(subject).to_not be_valid
    end

    it "is NOT valid without phone" do
      subject.phone = nil
      expect(subject).to_not be_valid
    end
  end
end
