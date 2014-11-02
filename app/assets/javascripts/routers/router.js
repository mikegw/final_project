FinalProject.Routers.Router = Backbone.Router.extend({

  routes: {
    '': 'currentUserShow',
    'users/:id': 'userShow',
    'users/:user_id/lists/:id': 'listShow'
  },

  initialize: function (options) {
    console.log("Router starting up...")
    // var id = $("#user-id").data("id");
    // console.log(id);
//     this.currentUser = new FinalProject.Models.User({id: id});
//     console.log("Current user:", this.currentUser);

    this.$el = $("main");
    this.$navbarEl = $(".user-class-container");


    // this.currentUser.fetch(/*{
//       success: this.currentUserShow.bind(this)
//     }*/);
  },

  fetchCurrentUser: function () { //fix this - need to think about when to fetch
    this.currentUser = new FinalProject.Models.CurrentUser();
    this.currentUser.fetch({
      success: this.takeOver.bind(this)
    })
  },

  takeOver: function () {
    console.log("taking over with user ", this.currentUser);
    FinalProject.Collections.users.add(this.currentUser);
    this.$el.html(JST['home']);
    this.$mainEl = $(".listbar");
    this.$sidebarEl = $(".sidebar");
    this.userShow(this.currentUser.id);
  },

  currentUserShow: function () {
    console.log("calling current_user_show with", this);
    if (this.currentUser) {
      this.userShow(this.currentUser.id);
    } else {
      this.fetchCurrentUser();
    }
  },

  userShow: function (id) {
    console.log("UserShow for user", id);
    var user = FinalProject.Collections.users.getOrFetch(id)

    var navView = new FinalProject.Views.UserShow({
      model: user
    });

    var sideView = new FinalProject.Views.ListIndex({
      model: user
    });

    this._swapNavView(navView);
    this._swapSideView(sideView);
    debugger
    this.listShow(id, user.lists().first().id);
  },

  listShow: function(user_id, id) {
    var list = FinalProject.Collections.users.get(user_id).lists().getOrFetch(id);

    var mainView = new FinalProject.Views.ListShow({
      model: list
    });

    this._swapMainView(mainView)
  },

  _swapNavView: function (newView) {
    this.currentNavView && this.currentNavView.remove();
    this.currentNavView = newView;
    console.log("swapping nav");
    this.$navbarEl.html(newView.render().$el);
  },

  _swapSideView: function (newView) {
    this.currentSideView && this.currentSideView.remove();
    this.currentSideView = newView;
    console.log("swapping side");
    this.$sidebarEl.html(newView.render().$el);
  },

  _swapMainView: function (newView, $viewEl) {
    this.currentMainView && this.currentMainView.remove();
    this.currentMainView = newView;
    console.log("swapping main");
    this.$mainEl.html(newView.render().$el);
  }



})