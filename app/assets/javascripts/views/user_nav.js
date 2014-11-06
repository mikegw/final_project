FinalProject.Views.UserNav = Backbone.CompositeView.extend({

  initialize: function () {

  },

  events: {
    "dblclick .user-stub-button": "showUser",
    "blur .user-stub-button": "hideMenu"
  },

  template: JST["user/nav"],

  tagName: "header",
  className: "navbar group",

  render: function () {
    var content = this.template()
    this.$el.html(content);


    var stub = new FinalProject.Views.UserStub({
      model: this.model
    });

    var search = new FinalProject.Views.UserSearch({
      model: this.model,
      searchContainer: "user-nav",
      wrapper: "<button class=\"user-stub-button\">"
    });

    this.addSubview(".user-nav-container", stub);
    this.addSubview(".searchbar-container", search);

    return this;

  },

  showUser: function (event) {
    event.preventDefault();
    var userId = event.currentTarget.children[1].dataset["id"];
    Backbone.history.navigate("users/" + userId, {trigger: true});
  },

  toggleMenu: function (event) {
    var userId = event.currentTarget.children[1].dataset["id"];
    var searchSub = this.subviews(".searchbar-container")[0];
    var searchResultSubs = searchSub.subviews(".search-results");

    var viewToChange = _.find(searchResultSubs, function (view) {
      return view.model.get("id") == userId;
    });

    viewToChange.toggleMenu();


  },

  hideMenu: function (event) {
    var userId = event.currentTarget.children[1].dataset["id"];
    var searchSub = this.subviews(".searchbar-container")[0];
    var searchResultSubs = searchSub.subviews(".search-results");

    var viewToChange = _.find(searchResultSubs, function (view) {
      return view.model.get("id") == userId;
    });

    viewToChange.hideMenu();


  }

});
