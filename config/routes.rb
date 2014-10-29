Rails.application.routes.draw do
  root 'sessions#new'

  resources :users, only: [:new, :create, :show] do
    resources :friend_requests, only: :create
    resources :friendships, only: :create

    member do
      get 'search'
    end

  end

  resources :lists, only: [:create, :update, :destroy]
  resource :session, only: [:new, :create, :destroy]

  delete "/users/:user_id/friend_requests/delete", as: "delete_user_friend_request", to: "friend_requests#destroy"
  delete "/users/:user_id/friendships/delete", as: "delete_user_friendship", to: "friendships#destroy"
end
