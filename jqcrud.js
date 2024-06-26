$(function() {
  loadRecipies();
  $("#recipes").on("click", ".btn-danger", handleDelete);
  $("#recipes").on("click", ".btn-warning", handleUpdate);
  $("#addBtn").click(addRecipe);
  $("#updateSave").click(function() {
    var id = $("#updateId").val();
    var title = $("#updateTitle").val();
    var body = $("#updateBody").val();
    $.ajax({
      url: "https://retoolapi.dev/Nv8B0j/data/" + id,
      data: { title, body },
      method: "PUT",
      success: function(response) {
        console.log(response);
        loadRecipies();
        $("#updateModal").modal("hide");
      }
    });
  });
});

//Update Operation//
function handleUpdate() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  $.get("https://retoolapi.dev/Nv8B0j/data/" + id, function(
    response
  ) {
    $("#updateId").val(response.id);
    $("#updateTitle").val(response.title);
    $("#updateBody").val(response.body);
    $("#updateModal").modal("show");
  });
}

//Post Operation//
function addRecipe() {
  var title = $("#title").val();
  var body = $("#body").val();
  $.ajax({
    url: "https://retoolapi.dev/Nv8B0j/data",
    method: "POST",
    data: { title, body },
    success: function(response) {
      console.log(response);
      $("#title").val("");
      $("#body").val("");
      loadRecipies();
      $("#addModal").modal("hide");
    }
  });
}

//Delete Operation//
function handleDelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  console.log(id);
  $.ajax({
    url: "https://retoolapi.dev/Nv8B0j/data/" + id,
    method: "DELETE",
    success: function() {
      loadRecipies();
    }
  });
}

//Get Operation//
function loadRecipies() {
  $.ajax({
    url: "https://retoolapi.dev/Nv8B0j/data",
    method: "GET",
    error: function(response) {
      var recipes = $("#recipes");
      recipes.html("An Error has occured");
    },
    success: function(response) {
      console.log(response);
      var recipes = $("#recipes");
      recipes.empty();
      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        recipes.append(
          `<div class="recipe" data-id="${rec.id}"><h3>${rec.title}</h3><p><button class="btn btn-danger btn-sm float-right">delete</button><button class="btn btn-warning btn-sm float-right">Edit</button> ${rec.body}</p></div>`
        );
        // recipes.append("<div><h3>" + rec.title + "</h3></div>");
      }
    }
  });
}
