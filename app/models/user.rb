class User < ApplicationRecord
  validates_presence_of :name, :email, :phone, :status
  validates :email,  
            format: { with: URI::MailTo::EMAIL_REGEXP, message: "Email invalid"  }, 
            uniqueness: { case_sensitive: false }
  validates :phone, format: { with: /\A\d{3}-\d{3}-\d{4}\z/, message: "Phone must be format ###-###-####" }
end
