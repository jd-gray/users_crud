module Api
  module V1
    class UsersController < ApiController
      def index
        users = Filterable::Users.new(params: params).response

        render json: users
      end

      def show
        user = User.find_by(id: params[:id])

        render json: user
      end
      
      def create
        user = User.new(user_params)
        
        if user.save
          render json: user
        else
          render json: { error: user.errors.messages }, status: 422
        end
      end

      def update
        user = User.find_by(id: params[:id])
        
        if user.update(user_params  )
          render json: user
        else
          render json: { error: user.errors.messages }, status: 422
        end
      end

      def destroy
        user = User.find_by(id: params[:id])

        if user.destroy
          head :no_content
        else
          render json: { error: user.errors }, status: 422
        end
      end

      private

      def user_params
        params.require(:user).permit(:name, :email, :phone, :title, :status)
      end
    end
  end
end