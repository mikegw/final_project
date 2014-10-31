FinalProject.Collections.Users = Backbone.Collection.extend({
  model: FinalProject.Models.User,
  url: 'api/users',

  getOrFetch: function (id) {
    var user = this.get(id);
    if (!user) {
      user = new FinalProject.Models.User({id: id});
      user.fetch({
        success: (function () {
          this.add(user)
        }).bind(this)
      });
    } else {
      user.fetch();
    }
    return user;
  }

});

FinalProject.Collections.users = new FinalProject.Collections.Users();