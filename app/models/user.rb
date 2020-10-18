class User < ApplicationRecord
  validates_presence_of :name, :phone, :status
  validates :email, 
            presence: true, 
            format: { with: URI::MailTo::EMAIL_REGEXP, message: "Email invalid"  }, 
            uniqueness: { case_sensitive: false }
end
