FinalProject.Models.CurrentUser = Backbone.Model.extend({
  urlRoot: '/api/current',

  lists: function () {
    if(!this._lists) {
      this._lists = new FinalProject.Collections.Lists([], { user: this });
    }

    return this._lists;
  },

  parse: function (response) {
    console.log("parsing")
    if(response.lists) {
      this.lists().set(response.lists, { parse: true });
      delete response.lists;
    }

    return response;
  }

});