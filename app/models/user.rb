class User < ApplicationRecord
  validates_presence_of :name, :email, :phone, :status
  validates :email,  
            format: { with: URI::MailTo::EMAIL_REGEXP, message: "Email invalid"  }, 
            uniqueness: { case_sensitive: false }
  validates :phone, format: { with: /\A\d{3}-\d{3}-\d{4}\z/, message: "Phone must be format ###-###-####" }

  scope :filter_by_fields, -> (search) {
    where("#{column_names.join(' || ')} like ?", "%#{search}%")
  }
  scope :sort_by_fields, -> (column_name) {
    is_valid = column_names.include?(column_name)
    return order(created_at: :desc) if !is_valid

    column_name.start_with?("-") ? order(column_name.to_sym => :desc) : order(column_name.to_sym => :asc)
  }
end
