FinalProject.Views.ItemStub = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.model, 'remove', this.remove);
  },

  tagName: 'li',

  template: JST["item/stub"],

  className: "item group",

  events: {
    "click .item-checkbox": "toggleCheck"
  },

  attributes: function () {
    return {
      "data-content": this.model.get("content")
    };
  },

  render: function () {

    var content = this.template({
      item: this.model
    });

    this.$el.html(content);
    if (this.model.get("completed")) {
      this.$(".item-checkbox").addClass("checked");
    }
    return this;
  },

  toggleCheck: function (event) {
    console.log(this.model.get("completed"));
    this.model.save({
      "completed": !this.model.get("completed")}, {
        success: function() {          
          console.log("Saved item", this.model)
        }.bind(this)
      }
    )
    this.render();
  }

})
