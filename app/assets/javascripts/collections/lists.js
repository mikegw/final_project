FinalProject.Collections.Lists = Backbone.Collection.extend({
  model: FinalProject.Models.List,
  url: 'api/lists',

  initialize: function (models, options) {
    this.user = options.user;
  },

  getOrFetch: function (id) {
    var list = this.get(id);
    if (!list) {
      list = new FinalProject.Models.List({id: id});
      list.fetch({
        success: (function () {
          this.add(list)
        }).bind(this)
      });
    } else {
      list.fetch();
    }
    return list;
  }

});
