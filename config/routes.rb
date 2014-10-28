Rails.application.routes.draw do
  root 'users#show'
  resources :users, only: [:new, :create, :show]
  resources :lists, only: [:create, :update, :destroy]
  resource :session, only: [:new, :create, :destroy]
end
