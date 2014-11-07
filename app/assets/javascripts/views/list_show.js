FinalProject.Views.ListShow = Backbone.CompositeView.extend({

  initialize: function (options) {
    this.user = options.user;
    this.collection = this.model.items();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addItem.bind(this));
    this.listenTo(this.user, "clickStub", this.renderList);
    this.listenTo(this.collection, 'change', function(){
      console.log("Items changed");
      setTimeout(this.render.bind(this), 500)
    }.bind(this));
  },

  events: {
    'click .item': 'showItem',
    'submit .new-item': "addItemToList"
  },

  tagName: "section",
  className: "listbar",

  template: JST["list/show"],

  addItemToList: function (event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON();
    var newItem = new FinalProject.Models.Item({content: params["item-text"]});
    newItem.save({list_id: this.model.id}, {
      success: (function () {
        console.log("saved!");
        this.collection.add(newItem);
      }).bind(this),
      error: function () {
        console.log(newItem.errors)
      }
    });
    $(".new-item-input").val('');
  },

  addItem: function (item) {
    var view = new FinalProject.Views.ItemStub({
      model: item
    });
    if (item.get("completed")) {
      this.addSubview('.completed-items', view);
    } else {
      this.addSubview('.list-items', view);
    }

  },

  render: function () {
    console.log("rendering ListShow with list", this.model);
    var content = this.template({
      list: this.model
    });

    this.$el.html(content);

    this.collection.each(this.addItem.bind(this));

    if (this.subviews(".completed-items").length > 0) {
      this.$(".completed-button").addClass("active");
    }

    return this;
  },

  showItem: function (event) {

    var content = $(event.currentTarget).data("content");
    console.log(content);

    clickedItem = this.collection.find(function (item) {
      return item.get("content") === content;
    });

    var modal = new FinalProject.Views.ItemShow({
      model: clickedItem
    });

    this.addSubview('.item-modal-container', modal);

    setTimeout(function(){
      this.$("#item-modal").addClass("is-active");
      this.$("#item-modal-content").addClass("is-active");
    }.bind(this), 0.5);
  }
})
