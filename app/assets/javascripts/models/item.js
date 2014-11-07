FinalProject.Models.Item = Backbone.Model.extend({

  urlRoot: function () {
    return "/api/lists/" + this.get("list_id") + "/list_items";
  },

  toJSON: function () {
    var json = Backbone.Model.prototype.toJSON.call(this);

    delete json.id;
    delete json.list_id;
    delete json.list;

    return json;
  }

})
