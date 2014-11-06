FinalProject.Views.UserSearch = Backbone.CompositeView.extend({

  initialize: function (options) {
    this.results = new FinalProject.Collections.SearchResults();
    this.searchContainer = options.searchContainer;
    this.wrapper = options.wrapper
    this.ids =  _([]);
  },

  template: JST["user/search"],

  events: {
    "keyup :input": "submit",
    "click .clear-search": "render"
  },

  tagName: "section",
  className: "searchbar group",

  render: function () {
    event.preventDefault();
    this.ids = _([]);
    console.log("rendering UserSearch for", this.model.get("username"));

    var content = this.template({
      searchContainer: this.searchContainer
    });

    this.$el.html(content);
    return this;
  },

  addResult: function (user) {
    if(this.ids.indexOf(user.get("id")) === -1) {
      console.log("adding result", user, "with username", user.get("username"));
      realUser = new FinalProject.Models.User(user.attributes)
      FinalProject.Collections.users.add(realUser);
      var result = new FinalProject.Views.UserStub({
        model: user,
        tagName: "li",
        wrapper: this.wrapper
      });

      this.addSubview('.search-results', result);
      this.ids.push(user.get("id"));
    } else {
      console.log("already part of search!");
    }
  },

  filterResults: function (searchstring) {
    _(this.subviews('.search-results')).each(function (result) {
      console.log(result.model.get("username"),RegExp(searchstring),  RegExp(searchstring).test(result.model.get("username")));
      if(!RegExp(searchstring).test(result.model.get("username"))) {
        result.remove();
        this.ids = _.without(this.ids, result.model.get("id"));
      }
    });
  },

  submit: function (){
    event.preventDefault();
    var selector = "." + this.searchContainer + "-search-input";
    var input = $("#" + this.searchContainer + "-search-input").val();
    if (input.length === 0) {
      this.render();
    } else {
      this.filterResults(input);
      this.results.fetch({
        data: {
          searchstring: input
        },
        success: (function() {
          this.results.matchedfriends().each((function (user) {
            this.addResult(user)
          }).bind(this));
          this.results.matchedusers().each((function (user) {
            this.addResult(user)
          }).bind(this));
        }).bind(this)
      });
      if ($(".clear-search").length === 0) {
        this.$el.append("<button class=\"clear-search\">x</button>")
      }
      console.log('results of fetch', this.results);
    }
  }

});
