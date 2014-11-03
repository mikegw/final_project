FinalProject.Models.SearchResult = Backbone.Model.extend({
  urlRoot: '/api/search',

  matchedfriends: function () {
    if(!this._matchedfriends) {
      this._matchedfriends = new FinalProject.Collections.Users([], { user: this });
      this._matchedfriends.model = FinalProject.Models.SearchResult
    }

    return this._matchedfriends;
  },

  matchedusers: function () {
    if(!this._matchedusers) {
      this._matchedusers = new FinalProject.Collections.Users([], { user: this });
      this._matchedusers.model = FinalProject.Models.SearchResult
    }

    return this._matchedusers;
  },

  parse: function (response) {

    if(response.matchedfriends) {
      this.matchedfriends().set(response.matchedfriends, { parse: true });
      delete response.matchedfriends;
    }

    if(response.matchedusers) {
      this.matchedusers().set(response.matchedusers, { parse: true });
      delete response.matchedusers;
    }

    return response;
  }

});