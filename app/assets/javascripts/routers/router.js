FinalProject.Routers.Router = Backbone.Router.extend({

  routes: {
    '': "currentUserShow",
    'users/:user_id/lists/:id': "listShow"
  },

  initialize: function (options) {
    console.log("Router starting up...")
    var id = $("#user-id").data("id");
    console.log(id);
    this.currentUser = new FinalProject.Models.User({id: id});
    console.log(this.currentUser);

    this.$mainEl = $(".listbar");
    this.$sidebarEl = $(".sidebar");
    this.$navbarEl = $(".user-class-container");

    this.currentUser.fetch({
      success: this.currentUserShow.bind(this)
       // function(){
//         console.log("fetched current user")
//         Backbone.history.navigate("")
//       }
    });
  },

  currentUserShow: function () {
    console.log("calling current_user_show with", this)

    var navView = new FinalProject.Views.UserShow({
      model: this.currentUser
    });

    var sideView = new FinalProject.Views.ListIndex({
      model: this.currentUser
    })

    this._swapNavView(navView);
    this._swapSideView(sideView);
  },

  userShow: function (id) {
    console.log("UserShow for user", id);
    var user = FinalProject.Collections.users.getOrFetch(id)

    var navView = new FinalProject.Views.UserShow({
      model: user
    });

    var sideView = new FinalProject.Views.ListIndex({
      model: user
    })

    this._swapNavView(navView);
    this._swapSideView(sideView);
  },

  listShow: function(user_id, id) {
    var list = FinalProject.Collections.users.getOrFetch(user_id).lists.getOrFetch(id);

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