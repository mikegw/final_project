FinalProject.Models.List = Backbone.Model.extend({

  urlRoot: "/api/lists",

  items: function () {
    if(!this._items) {
      this._items = new FinalProject.Collections.Items([], { list: this });
    }

    return this._items;
  },

  parse: function (response) {
    if(response.items) {
      this.items().set(response.items, { parse: true });
      delete response.items;
    }

    return response;
  }

})