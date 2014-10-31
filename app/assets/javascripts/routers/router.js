FinalProject.Routers.Router = Backbone.Router.extend({

  routes: {
    '/api': "currentUserShow"
  },

  initialize: function (options) {
    console.log("Router starting up...")
    var id = $("#user-id").data("id");
    console.log(id);
    this.currentUser = new FinalProject.Models.User({id: id});
    console.log(this.currentUser);
    this.currentUser.fetch();
    this.$mainEl = $(".listbar");
    this.$sidebarEl = $(".sidebar");
    this.$navbarEl = $(".user-class-container");
    this.currentUserShow();
  },

  currentUserShow: function () {
    console.log("currentUserShow");
    var view = new FinalProject.Views.UserShow({
      model: this.currentUser
    });
    this._swapView(view, this.$navbarEl);
  },

  userShow: function (id) {
    console.log("UserShow for user", id);
    var user = FinalProject.Collections.users.getOrFetch(id)
    var view = new FinalProject.Views.UserShow({
      model: user
    });
    this._swapView(view, this.$navbarEl);
  },


  _swapView: function (newView, $el) {
    this.current_view && this.current_view.remove();
    this.current_view = newView;
    console.log("swapping");
    $el.html(newView.render().$el);
  }



})