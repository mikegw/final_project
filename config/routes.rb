Rails.application.routes.draw do
  root 'sessions#blank'

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

  resource :root, only: :show

  resource :session, only: [:new, :create, :destroy]

  namespace :api do

    resource :session, only: [:new, :create, :destroy]

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

    resources :shares, only: [:create, :destroy]
    resources :notifications, only: [:index, :show]

    get 'current', to: "users#current"
    get 'search', to: "users#search"
  end
end
