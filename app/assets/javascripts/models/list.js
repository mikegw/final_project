FinalProject.Models.List = Backbone.Model.extend({

  urlRoot: "/api/lists",

  items: function () {
    if(!this._items) {
      this._items = new FinalProject.Collections.Items([], { list: this });
    }

    return this._items;
  },

  collaborators: function () {
    if(!this._collaborators) {
      this._collaborators = new FinalProject.Collections.Users();
    }

    return this._collaborators;
  },

  parse: function (response) {
    if(response.items) {
      this.items().set(response.items, { parse: true });
      delete response.items;
    }

    if(response.collaborators) {
      this.collaborators().set(response.collaborators, { parse: true });
      delete response.collaborators;
    }



    return response;
  },

  toJSON: function (options) {
    var json = Backbone.Model.prototype.toJSON.call(this);
    if (this.collaborators().length > 0){
      json["collaborators"] = [];
      this.collaborators().each(function (coll) {
        json["collaborators"].push(coll.id);
      });
    }
    console.log("built json", json);
    return json;
  }



})
