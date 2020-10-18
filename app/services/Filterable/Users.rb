module Filterable
  PAGE_LIMIT = 25

  class Users
    attr_reader :params

    def initialize(params:)
      @params = params
    end

    def response
      users = User.where(nil)
      users = users.filter_all_fields(params[:search]) if params[:search].present?
      
      @paginated_users = users.paginate(page: current_page, per_page: PAGE_LIMIT)

      { 
        total_pages: total_pages,
        next_page: next_page,
        previous_page: previous_page,
        users: @paginated_users
      }
    end

    private

    def total_pages
      @paginated_users.total_pages
    end

    def current_page
      page_number = params[:page].to_i
      page_number > 0 ? page_number : 1
    end

    def next_page
      [current_page + 1, total_pages].min
    end

    def previous_page
      [current_page - 1, 1].max
    end
  end
end