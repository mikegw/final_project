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

  resources :lists, only: [:create, :update, :destroy] do
    resources :list_items, as: :items, only: [:create, :update, :destroy]
  end

  resource :session, only: [:new, :create, :destroy]

  namespace :api do
    resources :users, only: :show do

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

    resources :lists, only: [:create, :update, :destroy] do
      resources :list_items, as: :items, only: [:create, :update, :destroy]
    end

  end
end
