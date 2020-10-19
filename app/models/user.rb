class User < ApplicationRecord
  include PgSearch::Model
  pg_search_scope :filter_by_fields, 
                  against: [:name, :email, :phone, :status, :title], 
                  using: {
                    tsearch: { prefix: true }
                  }

  enum status: { active: 0, inactive: 1 }

  validates_presence_of :name, :email, :phone, :status
  validates :email,  
            format: { with: URI::MailTo::EMAIL_REGEXP, message: "Email invalid"  }, 
            uniqueness: { case_sensitive: false }
  validates :phone, format: { with: /\A\d{3}-\d{3}-\d{4}\z/, message: "Phone must be format ###-###-####" }

  scope :sort_by_fields, -> (column_name) {
    is_valid = column_names.include?(column_name.tr('-', ''))
    return order(created_at: :desc) if !is_valid

    sortable_column = column_name.tr('-', '').to_sym
    column_name.start_with?("-") ? order(sortable_column => :desc) : order(sortable_column => :asc)
  }
end
