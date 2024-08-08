$(function () {
  const animals = [
    "🐵",
    "🐶",
    "🐺",
    "🐱",
    "🦁",
    "🐮",
    "🐭",
    "🐻",
    "🐼",
    "🦄",
    "🐔",
    "🐯",
    "🦊",
    "🐷",
  ];
  let startBtn = $(".starter-box button");
  let userInput = $("#username-input");
  let gameLevel = $(".game-container").data("level");
  let selectedCards = [];
  // starting process
  userInput.on("input", function () {
    let inputValue = $(this).val().trim();
    if (inputValue.length > 3) {
      startBtn.removeClass("button-disable");
      startBtn.removeAttr("disabled");
    } else {
      startBtn.addClass("button-disable");
      startBtn.attr("disabled", "true");
    }
  });
  startBtn.click(() => {
    if (!userInput.val().trim().length > 3) return;
    localStorage.setItem("player", userInput.val());
    $(".starter-box").fadeOut(500, () => {
      $(".game-box").fadeIn(500);
      $(".username").text(localStorage.getItem("player"));
    });
  });

  const selectRandomItems = (array, countOfItems) => {
    const cloneArray = [...array];
    const randomItems = [];
    for (let i = 0; i < countOfItems; i++) {
      const randomIndex = Math.floor(Math.random() * cloneArray.length);
      randomItems.push(cloneArray[randomIndex]);
      cloneArray.splice(randomIndex, 1);
    }
    return randomItems;
  };
  const shuffle = (array) => {
    const cloneArray = [...array];
    // for (let i = 0; i < cloneArray.length - 1; i++) {
    //   const randomIndex = Math.floor(Math.random() * (i + 1));
    //   const randomItem = cloneArray[i];
    //   cloneArray[i] = cloneArray[randomIndex];
    //   cloneArray[randomIndex] = randomItem;
    // }
    for (let i of cloneArray.keys()) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [cloneArray[i], cloneArray[randomIndex]] = [
        cloneArray[randomIndex],
        cloneArray[i],
      ];
    }
    return cloneArray;
  };
  const randomItems = selectRandomItems(animals, (gameLevel * gameLevel) / 2);
  let items = shuffle([...randomItems, ...randomItems]);
  // Assuming you have a variable `numberOfRows` that determines how many rows you want
  var numberOfRows = 3; // Change this value to adjust the number of rows
  const itemsArray = [...items];

  // Get the game-container element
  var $gameContainer = $(".game-container");

  // Calculate the number of rows based on the length of the items array
  var numberOfRows = Math.ceil(itemsArray.length / 4);

  // Loop through the number of rows
  for (var i = 0; i < numberOfRows; i++) {
    // Create a new row element
    var $row = $("<div>").addClass("row").appendTo($gameContainer);

    // Create 4 item-box elements within the row
    for (let j = 0; j < 4; j++) {
      var index = i * 4 + j;
      if (index < itemsArray.length) {
        $("<div>")
          .addClass("col-3")
          .append(
            $("<div>")
              .click(function () {
                if ($(this).hasClass("matched")) return;
                if (!selectedCards.length && !selectedCards[0]) {
                  $(this).addClass("flipped");
                  selectedCards[0] = $(this).data("identifier");
                } else if (selectedCards[0] && !selectedCards[1]) {
                  selectedCards[1] = $(this).data("identifier");
                  $(this).addClass("flipped");

                  if (selectedCards[0] === selectedCards[1]) {
                    $(".item-back").filter(function () {
                      if ($(this).text() === selectedCards[0]) {
                        console.log($(this).text() === selectedCards[0]);
                        $(this).parent("div").addClass("matched");
                      }
                    });
                  } else if (selectedCards[0] !== selectedCards[1]) {
                    selectedCards = [];
                    $(".item-back").filter(function () {
                      if (!$(this).parent().hasClass("matched"))
                        setTimeout(() => {
                          $(this).parent("div").removeClass("flipped");
                        }, 500);
                    });
                  }

                  selectedCards = [];
                  // $(".item-box").each(function (event) {
                  //   if (
                  //     $(this).find(".item-back").text() ===
                  //     $(this).find(".item-back").text()
                  //   ) {
                  //     //   $(this).addClass("flipped");
                  //     console.log(event);
                  //   }
                  // });
                  if (selectedCards[0] === selectedCards[1]) {
                  }
                }
              })
              .data("identifier", itemsArray[index])
              .addClass("item-box")
              .append($("<span>").addClass("item item-front").text("?"))
              .append(
                $("<span>").addClass("item item-back").text(itemsArray[index])
              )
          )
          .appendTo($row);
      }
    }
  }
});
