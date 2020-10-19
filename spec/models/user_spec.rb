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

  describe "Scopes" do
    before do
      @brooklyn = User.create!(name: "Brooklyn", email: "bigdog@yahoo.com", phone: "123-999-9999", status: 1, created_at: DateTime.now)
      @shrimp = User.create!(name: "Shrimp", email: "crazydog@aol.com", phone: "890-999-9999", created_at: DateTime.now - 2.days)
      @moses = User.create!(name: "Moses", email: "shydog@gmail.com", phone: "234-999-9999", created_at: DateTime.now - 1.day)
    end

    describe "filter_by_fields" do
      it "filters by name" do
        expect(User.filter_by_fields("shrimp")).to include(@shrimp)
        expect(User.filter_by_fields("shrimp")).to_not include(@brooklyn, @moses)
      end

      it "filters by email" do
        expect(User.filter_by_fields("shydog")).to include(@moses)
        expect(User.filter_by_fields("shydog")).to_not include(@brooklyn, @shrimp)
      end

      it "filters by phone" do
        expect(User.filter_by_fields("890-999-9999")).to include(@shrimp)
        expect(User.filter_by_fields("890-999-9999")).to_not include(@brooklyn, @moses)
      end

      it "filters by status enum" do
        expect(User.filter_by_fields(0)).to include(@shrimp, @moses)
        expect(User.filter_by_fields(0)).to_not include(@brooklyn)
      end

      it "returns empty array if no results" do
        expect(User.filter_by_fields("something doesnt make sense")).to eq []
      end
    end
 
    describe "sort_by_fields" do
      it "sorts by name" do
        expect(User.sort_by_fields("name")).to eq [@brooklyn, @moses, @shrimp]
        expect(User.sort_by_fields("-name")).to eq [@brooklyn, @moses, @shrimp].reverse
      end

      it "sorts by email" do
        expect(User.sort_by_fields("email")).to eq [@brooklyn, @shrimp, @moses]
        expect(User.sort_by_fields("-email")).to eq [@brooklyn, @shrimp, @moses].reverse
      end

      it "sorts by phone" do
        expect(User.sort_by_fields("phone")).to eq [@brooklyn, @moses, @shrimp]
        expect(User.sort_by_fields("-phone")).to eq [@brooklyn, @moses, @shrimp].reverse
      end

      it "sorts by status" do
        expect(User.sort_by_fields("status")).to eq [@shrimp, @moses, @brooklyn]
      end

      it "sorts by created_at desc when column is invalid" do
        expect(User.sort_by_fields("bad_column")).to eq [@brooklyn, @moses, @shrimp]
      end
    end
  end
end
