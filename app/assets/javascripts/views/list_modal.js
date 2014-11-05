FinalProject.Views.ListModal = Backbone.CompositeView.extend({

  initialize: function (options) {
    this.wrapper = options.wrapper;
  },

  template: JST["list/modal"],

  tagName: "section",
  className: "list modal",
  id: "list-modal",

  events: {
    "click .modal-screen": "back",
    "submit form": "save",
    "click .user-stub-button": "addUserStubToCollaborators"
  },

  render: function () {
    console.log("rendering listModal for list", this.model)
    var content = this.template({
      list: this.model
    });

    this.$el.html(content);

    var user = FinalProject.router.currentUser;



    var search = new FinalProject.Views.UserSearch({
      model: user,
      searchContainer: "list-modal",
      wrapper: "<button class=\"user-stub-button\">"
    });

    this.addSubview(".list-modal-searchbar-container", search);

    this.addCollaborators();

    return this;
  },

  addCollaborators: function () {

    this.model.collaborators().each((function (user) {

      var wrapper = "<input type=\"checkbox\" name=\"list[collaborator_ids][]\" id=\"list-collaborator-";
      wrapper += user.id + "\" value=\"" + user.id + "\">";
      wrapper += "<label for=\"list-collaborator-" + user.id + "\">";

      var stub = new FinalProject.Views.UserStub({
        model: user,
        wrapper: wrapper
      });

      this.addSubview(".list-modal-collaborators-container", stub);
    }).bind(this));

  },

  addUserStubToCollaborators: function (event) {
    event.preventDefault();
    var userId = event.currentTarget.children[1].dataset["id"];
    // user = FinalProject.Collections.users.getOrFetch(userId);
    var searchSub = this.subviews(".list-modal-searchbar-container")[0];
    var searchResultSubs = searchSub.subviews(".search-results")

    var viewToMove = _.find(searchResultSubs, function (view) {
      console.log(view.model.get("id"));
      return view.model.get("id") == userId;
    });
    console.log("view to move:", viewToMove);
    searchSub.removeSubview(".search-results", viewToMove);
    this.addSubview(".list-modal-collaborators-container", viewToMove);
    $.ajax({
      url: "/api/shares.json",
      type: "POST",
      data: {
        user_id: userId,
        list_id: this.model.get("id")
      },
      success: function() {console.log("Shared!")}
    })


  },

  back: function () {
    _(this.subviews(".searchbar-container")).each(function(sub){
      sub.remove();
    });
    this.remove();

  },

  save: function (event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON();
    console.log("Save called with", params);
  }


})
