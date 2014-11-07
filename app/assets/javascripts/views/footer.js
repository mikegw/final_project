FinalProject.Views.Footer = Backbone.CompositeView.extend({

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.friends(), "add remove", this.render);
    this.listenTo(this.model.potentialFriends(), "add remove", this.render);
    this.listenTo(this.model.pendingFriends(), "add remove", this.render);
  },

  events: {
    "click .tab": "activateTab",
    "dblclick .user-stub": function () {
      Backbone.history.navigate("", {trigger: true});
    }
  },

  template: JST["user/footer"],

  tagName: "footer",

  render: function () {
    var footer = this;

    console.log("rendering footer", this, "with user", this.model);
    var content = this.template();
    this.$el.html(content);

    var userStub = new FinalProject.Views.UserStub({
      model: this.model,
      wrapper: "<button class=\"user-stub-button\">"
    });

    this.addSubview(".user-stub-container", userStub);

    this.model.friends().each(function (user){
      var friendStub = new FinalProject.Views.UserStub({
        model: user,
        wrapper: "<button class=\"user-stub-button\">"
      });
      friendStub.$el.addClass("friend");
      footer.addSubview(".friend-stubs", friendStub);
    });

    this.model.pendingFriends().each(function (user){
      var friendStub = new FinalProject.Views.UserStub({
        model: user,
        wrapper: "<button class=\"user-stub-button\">"
      });
      friendStub.$el.addClass("pending");
      footer.addSubview(".pending-friend-stubs", friendStub);
    });

    this.model.potentialFriends().each(function (user){
      console.log("A wild potentialFriend appeared!")
      var friendStub = new FinalProject.Views.UserStub({
        model: user,
        wrapper: "<button class=\"user-stub-button\">"
      });
      friendStub.$el.addClass("potential");
      footer.addSubview(".potential-friend-stubs", friendStub);
    });

    return this;
  },

  showUser: function (event) {
    event.preventDefault();
    var userId = event.currentTarget.children[1].dataset["id"];
    Backbone.history.navigate("users/" + userId, {trigger: true});
  },

  showPotentialOptions: function (event) {
    event.preventDefault();
    var userId = event.currentTarget.children[1].dataset["id"];
    var potentialSubs = this.subviews(".potential-friend-stubs");
    console.log(potentialSubs);

    var viewToChange = _.find(potentialSubs, function (view) {
      return view.model.get("id") == userId;
    });

    viewToChange.addAcceptButton();
    viewToChange.addRejectButton();
  },

  activateTab: function (event) {
    event.preventDefault();
    console.log("clicked", event)

    var content = $(event.currentTarget).data("content");
    console.log(content);
    console.log(this.$(".tab"));
    this.$(".tab-content.active").removeClass("active");
    this.$(".tab.active").removeClass("active");

    $(event.currentTarget).addClass("active")
    this.$("#" + content).addClass("active");
  }



});
