FinalProject.Views.UserSearch = Backbone.CompositeView.extend({

  initialize: function (options) {
    this.results = new FinalProject.Collections.SearchResults();
    this.searchContainer = options.searchContainer;
    this.wrapper = options.wrapper
  },

  template: JST["user/search"],

  events: {
    "submit": "submit"
  },

  tagName: "section",
  className: "searchbar group",

  render: function () {
    event.preventDefault();
    console.log("rendering UserSearch for", this.model.get("username"));

    var content = this.template({
      searchContainer: this.searchContainer
    });

    this.$el.html(content);
    return this;
  },

  addResult: function (user) {
    console.log("adding result", user, "with username", user.get("username"));
    realUser = new FinalProject.Models.User(user.attributes)
    FinalProject.Collections.users.add(realUser);
    var result = new FinalProject.Views.UserStub({
      model: user,
      tagName: "li",
      wrapper: this.wrapper
    });

    this.addSubview('.search-results', result);
  },

  filterResults: function (searchstring) {
    _(this.subviews('.search-results')).each(function (result) {
      if(!RegExp("%" + searchstring + "%").test(result.username)) {
        result.remove();
      }
    });
  },

  submit: function (){
    event.preventDefault();
    var selector = "." + this.searchContainer + "-search-input";
    var input = $("#" + this.searchContainer + "-search-input").val();
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
    console.log('results of fetch', this.results);

  }

});
