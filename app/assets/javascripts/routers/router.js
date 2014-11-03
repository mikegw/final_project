FinalProject.Routers.Router = Backbone.Router.extend({

  routes: {
    '': 'fetchCurrentUser',
    'home': "currentUserShow",
    'users/:id': 'userShow',
    'users/:user_id/lists/:id': 'listShow'
  },

  initialize: function (options) {
    console.log("Router starting up...")
    this.$el = $("body");

  },

  fetchCurrentUser: function () { //fix this - need to think about when to fetch
    this.currentUser = new FinalProject.Models.CurrentUser();
    this.currentUser.fetch({
      success: this.continue.bind(this)
    });
  },

  continue: function () {
    console.log("taking over with user ", this.currentUser);
    FinalProject.Collections.users.add(this.currentUser);
    this.$el.html(JST['home']);
    this.currentUserShow();
  },

  currentUserShow: function () {
    console.log("calling current_user_show with", this);
    if (this.currentUser) {
      var view = new FinalProject.Views.UserShow({
        model: this.currentUser
      });
      this._swapView(view);
    } else {
      this.fetchCurrentUser();
    }
  },

  userShow: function (id) {
    console.log("UserShow for user", id);
    var user = FinalProject.Collections.users.getOrFetch(id)
    var view = new FinalProject.Views.UserShow({
      model: user
    });
    this._swapView(view);
  },

  listShow: function(user_id, id) {
    var list = FinalProject.Collections.users.get(user_id).lists().getOrFetch(id);

    var mainView = new FinalProject.Views.ListShow({
      model: list
    });

    this._swapMainView(mainView)
  },

  _swapView: function (newView) {
    this.currentView && this.currentView.remove();
    this.currentView = newView;
    console.log("swapping view");
    this.$el.html(newView.render().$el);
  }




})