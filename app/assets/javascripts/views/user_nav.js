FinalProject.Views.UserNav = Backbone.CompositeView.extend({

  initialize: function () {

  },

  events: {
    "blur .user-stub-button": "hideMenu",
    "click .signout-button": "signOut",
    "mouseenter #chat-button": "toggleNotifications",
    "mouseleave #chat-button": "toggleNotifications"
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

    var notes = new FinalProject.Views.NotificationsIndex();
    console.log("notes:", notes);

    this.addSubview(".notifications-container", notes);

    return this;

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


  },

  signOut: function () {
    $.ajax({
      url: "api/session",
      type: "DELETE",
      success: function () {
        window.location = "/"
      },
      error: function () {
        console.log("Drat!")
      }
    });
  },

  toggleNotifications: function () {
    console.log("toggling");
    var notifications = this.subviews(".notifications-container")[0];
    notifications.toggleDisplay();
  }

});
