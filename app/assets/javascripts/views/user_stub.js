FinalProject.Views.UserStub = Backbone.View.extend({

  initialize: function (options) {
    this.menuShown = false;
    this.wrapper = options.wrapper;
    this.listenTo(this.model, 'sync', this.render);
    this.clicks = 0;
  },

  template: JST["user/stub"],

  events: {
    "mousedown .user-stub-button": "handleClick",
    "mousedown .add-friend-button": "sendFriendRequest",
    "mousedown .accept-friend-button": "acceptFriendRequest",
    "mousedown .reject-friend-button": "rejectFriendRequest",
    "mousedown .unfriend-button": "unfriend",
  },

  className: "user-stub",

  render: function () {
    console.log("rendering UserStub with user", this.model.get("username"));
    var content = this.template({
      user: this.model,
      wrapper: this.wrapper
    });

    this.$el.html(content);

    this.updateClass();

    return this;
  },

  addFriendButton: function () {
    this.$el.append("<button class=\"tool add-friend-button\">Add</button>");
  },

  addAcceptButton: function () {
    this.$el.append("<button class=\"tool accept-friend-button\">Accept</button>");
  },

  addRejectButton: function () {
    this.$el.append("<button class=\"tool reject-friend-button\">Reject</button>");
  },

  addUnfriendButton: function () {
    this.$el.append("<button class=\"tool unfriend-button\">Defriend</button>");
  },

  addPending: function () {
    this.$el.append("<h4>Pending</h4>");
  },

  sendFriendRequest: function () {
    var that = this;
    var current = FinalProject.router.currentUser;

    $.ajax({
      type: "POST",
      url: "api/users/" + this.model.get("id") + "/friendships",
      success: function () {
        current.pendingFriends().add(that.model);
        that.render();
      }
    });
  },

  unfriend: function () {
    var that = this;
    var current = FinalProject.router.currentUser;

    $.ajax({
      type: "DELETE",
      url: "api/users/" + this.model.get("id") + "/friendships",
      success: function () {
        current.friends().remove(that.model);
        that.render();
      }
    });
  },

  acceptFriendRequest: function () {
    var that = this;
    var current = FinalProject.router.currentUser;

    $.ajax({
      type: "GET",
      url: "api/users/" + this.model.get("id") + "/friendships/accept",
      success: function () {
        current.potentialFriends().remove(that.model);
        current.friends().add(that.model);
        that.render();
      }
    });
  },

  rejectFriendRequest: function () {
    var that = this;
    var current = FinalProject.router.currentUser;

    $.ajax({
      type: "GET",
      url: "api/users/" + this.model.get("id") + "/friendships/reject",
      success: function () {
        current.potentialFriends().remove(that.model);
        that.remove();
        that.render();
      }
    });
  },

  checkStatus: function () {
    var current = FinalProject.router.currentUser;
    if (current.friends().get(this.model.get("id"))){
      return "friend";
    } else if (current.potentialFriends().get(this.model.get("id"))){
      return "potential";
    } else if (current.pendingFriends().get(this.model.get("id"))){
      return "pending";
    } else {
      return null;
    }

  },

  updateClass: function () {
    switch (this.checkStatus()) {
    case "friend":
      console.log("friend!");
      this.$el.addClass("friend");
      break;
    case "potential":
      console.log("Potential friend!");
      this.$el.addClass("potential");
      break;
    case "pending":
      console.log("Pending friend!");
      this.$el.addClass("pending");
    }
  },

  showMenu: function () {
    this.menuShown = true;
    if(!(this.model.id === FinalProject.router.currentUser.id)) {
      switch (this.checkStatus()) {
      case "friend":
        this.addUnfriendButton();
        break;
      case "pending":
        this.addPending();
        break;
      case "potential":
        this.addAcceptButton();
        this.addRejectButton();
        break;
      default:
        this.addFriendButton();
      }
    }
  },

  toggleMenu: function () {
    console.log("toggling");
    if (this.menuShown) {
      this.hideMenu();
    } else {
      this.showMenu();
    }
  },

  hideMenu: function () {
    this.menuShown = false;
    this.render();
  },

  showUser: function () {
    event.preventDefault();
    var userId = this.model.get("id");
    if (this.model.get("id") === FinalProject.router.currentUser.get("id")){
      Backbone.history.navigate("", {trigger: true});
    } else {
      Backbone.history.navigate("users/" + userId, {trigger: true});
    }
  },

  handleClick: function () {
    this.clicks++;  //count clicks

    if(this.clicks === 1) {
      timer = setTimeout((function() {
        this.toggleMenu();
        this.clicks = 0;
      }).bind(this), 200);
    } else {
      clearTimeout(timer);
      this.showUser();
      this.clicks = 0;
    }
  }


});
