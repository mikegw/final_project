FinalProject.Models.Item = Backbone.Model.extend({

  urlRoot: function () {
    return "/api/lists/" + this.get("list_id") + "/list_items";
  }



})
