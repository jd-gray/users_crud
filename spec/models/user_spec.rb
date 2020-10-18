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

    describe "Email" do
      it "is valid with valid format" do
        subject.email = "good@email.com"
        expect(subject).to be_valid
      end

      it "is NOT valid with invalid format" do
        subject.email = "bademail"
        expect(subject).to_not be_valid
        expect(subject.errors.messages[:email]).to eq ["Email invalid"]
      end

      it "is NOT valid with duplicate email" do
        subject.save!
        duplicate_user = described_class.new(name: "Jared Gray", email: "jaredgray.dev@gmail.com", phone: "714-767-6304")
        expect(duplicate_user).to_not be_valid
      end

      it "is NOT valid with case insensitive duplicate email" do
        subject.save!
        duplicate_user = described_class.new(name: "Jared Gray", email: "JarEdgRay.dEv@Gmail.com", phone: "714-767-6304")
        expect(duplicate_user).to_not be_valid
      end
    end

    describe "Phone" do
      it "is valid with valid format" do
        subject.phone = "714-767-6304"
        expect(subject).to be_valid
      end

      it "is NOT valid with invalid format" do
        subject.phone = "(714)-767-6304"
        expect(subject).to_not be_valid

        subject.phone = "1-714-767-6304"
        expect(subject).to_not be_valid

        subject.phone = "714 767 6304"
        expect(subject).to_not be_valid
        expect(subject.errors.messages[:phone]).to eq ["Phone must be format ###-###-####"]
      end
    end
  end
end
