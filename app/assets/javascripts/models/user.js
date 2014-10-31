FinalProject.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  lists: function () {
    if(!this._lists) {
      this._lists = new TrelloClone.Collections.Lists([], { user: this });
    }

    return this._lists;
  },

  parse: function (response) {
    if(response.lists) {
      this.lists().set(response.lists, { parse: true });
      delete response.lists;
    }

    return response;
  }

});