Rails.application.routes.draw do
  root 'users#show'

  resources :users, only: [:new, :create, :show] do
    member do:
      get 'search'
    end
  end

  resources :lists, only: [:create, :update, :destroy]
  resource :session, only: [:new, :create, :destroy]
  resources :friendships, only: [:create]

end
