FinalProject.Models.CurrentUser = Backbone.Model.extend({
  urlRoot: '/api/current',

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

  friends: function () {
    if(!this._friends) {
      this._friends = new FinalProject.Collections.Users();
    }

    return this._friends;
  },

  potentialFriends: function () {
    if(!this._potentialFriends) {
      this._potentialFriends = new FinalProject.Collections.Users();
    }

    return this._potentialFriends;
  },

  pendingFriends: function () {
    if(!this._pendingFriends) {
      this._pendingFriends = new FinalProject.Collections.Users();
    }

    return this._pendingFriends;
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

    if(response.friends) {
      this.friends().set(response.friends, { parse: true });
      delete response.friends;
    }

    if(response.potential_friends) {
      this.potentialFriends().set(response.potential_friends, { parse: true });
      delete response.potential_friends;
    }

    if(response.pending_friends) {
      this.pendingFriends().set(response.pending_friends, { parse: true });
      delete response.pending_friends;
    }

    return response;
  }

});
