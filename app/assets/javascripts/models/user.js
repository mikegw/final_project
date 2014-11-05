FinalProject.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  lists: function () {
    if(!this._lists) {
      this._lists = new FinalProject.Collections.Lists([], { user: this });
    }

    return this._lists;
  },

  sharedLists: function () {
    if(!this._sharedLists) {
      this._sharedLists = new FinalProject.Collections.Lists([], { user: this }); //???
    }

    return this._sharedLists;
  },

  parse: function (response) {
    console.log("parsing user", response)
    if(response.lists) {
      this.lists().set(response.lists, { parse: true });
      delete response.lists;
    }

    if(response.shared_lists) {
      this.sharedLists().set(response.shared_lists, { parse: true });
      delete response.shared_lists;
    }

    return response;
  }

});
