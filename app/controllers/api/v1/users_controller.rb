module Api
  module V1
    class UsersController < ApiController
      def index
        users = Filterable::Users.new(params: params).response

        render json: users
      end
    end
  end
end