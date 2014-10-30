Rails.application.routes.draw do
  root 'sessions#new'

  resources :users, only: [:new, :create, :show] do
    resources :friendships, only: :create do
      collection do
        get "accept"
        get "reject"
        delete "", to: "friendships#destroy"
      end
    end
    member do
      get 'search'
    end
  end
  #patch "/users/:user_id/friendship/update", as: "update_user_friendship", to: "friendships#update"
  #delete "/users/:user_id/friendship/delete", as: "delete_user_friendship", to: "friendships#destroy"

  resources :lists, only: [:create, :update, :destroy] do
    resources :list_items, as: :items, only: [:create, :update, :destroy]
  end

  resource :session, only: [:new, :create, :destroy]

end
