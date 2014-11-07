FinalProject.Collections.Items = Backbone.Collection.extend({
  model: FinalProject.Models.Item,

  url: "/api/lists/" + this.list_id + "/list_items",

  initialize: function (models, options) {
    this.list = options.list;
  }
});
