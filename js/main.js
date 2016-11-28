// email obfuscator and stuff
// this code is absolutely horrid because it's a mix of coffee and raw js so
// forgive me please

window.onload = function() {
  var email, i, item, len, numberletters, obfuscated;

  obfuscated = [5, 20, 8, 1, 14, 1, 18, 20, 5, 18, 2, 5, 18, 18, 25, "@", 7, 13, 1, 9, 12, ".", 3, 15, 13];
  numberletters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  email = [];
  for (i = 0, len = obfuscated.length; i < len; i++) {
    item = obfuscated[i];
    if (!isNaN(item)) {
      email.push(numberletters[item - 1]);
    } else {
      email.push(item);
    }
    if (typeof console !== "undefined" && console !== null) {
      console.log(item);
    }
  }
  $("#email").attr("href", "mailto:" + (email.join("")));

  $.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=soodologica&api_key=67bc224ceb7cea73cf835a56d247d15a&limit=2&format=json&callback=?", function(data) {
    var song = data.recenttracks.track[0]
    var ref;

    if (((ref = song["@attr"]) != null ? ref.nowplaying : void 0) != null && song["@attr"].nowplaying === "true") {
      $("#music").html("I'm currently listening to " + "<a class='music' href='" + song["url"] + "'>" + song.name + " by " + song.artist["#text"] + "</a>.")
    } else {
      $("#music").html("The last song I listened to was " + "<a class='music' href='" + song["url"] + "'>" + song.name + " by " + song.artist["#text"] + "</a>.")
    }

    console.log(song["image"][2]["#text"])

    if (song["image"][2]["#text"] !== "") {
      $('.music').tooltip({
        html: true,
        title: "<img src='" + song["image"][2]["#text"] + "'><div id='album-name-parent'><span id='album-name'>" + song["album"]["#text"] + "</span></div>",
        placement: "auto top",
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>',
        delay: 20
      })
    } else {
      $('.music').tooltip({
        html: true,
        title: "<div id='album-name-parent' class='no-art'><span id='album-name'>" + song["album"]["#text"] + "</span></div>",
        placement: "auto top",
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>',
        delay: 20
      })
    }
  });

  var codes = [{
    language: "JavaScript",
    code: "\/\/ Ethan Arterberry\'s website\r\n\/\/ language: JavaScript\r\n\r\nvar site = new Object()\r\nsite.author = \'Ethan Arterberry\'\r\nsite.sourceCode = \'<a title=\"view the source code of this website\" href=\"http:\/\/github.com\/soops\/soops.github.io\">soops\/soops.github.io<\/a>\'\r\nsite.license = \'<a title=\"view the MIT license\" href=\"http:\/\/github.com\/soops\/soops.github.io\/blob\/master\/license.txt\">MIT<\/a>\'\r\nsite.builtWith = \'<span id=\"heart\" class=\"fa fa-heart\"><\/span>\'"
  }, {
    language: "Ruby",
    code: "# Ethan Arterberry\'s website\r\n# language: Ruby\r\n\r\nsite = Hash.new(nil)\r\nsite[\'author\'] = \'Ethan Arterberry\'\r\nsite[\'sourceCode\'] = \'<a title=\"view the source code of this website\" href=\"http:\/\/github.com\/soops\/soops.github.io\">soops\/soops.github.io<\/a>\'\r\nsite[\'license\'] = \'<a title=\"view the MIT license\" href=\"http:\/\/github.com\/soops\/soops.github.io\/blob\/master\/license.txt\">MIT<\/a>\'\r\nsite[\'builtWith\'] = \'<span id=\"heart\" class=\"fa fa-heart\"><\/span>\'"
  }, {
    language: "Python",
    code: "# Ethan Arterberry\'s website\r\n# language: Python\r\n\r\nsite = {}\r\nsite[\"author\"] = \'Ethan Arterberry\'\r\nsite[\"sourceCode\"] = \'<a title=\"view the source code of this website\" href=\"http:\/\/github.com\/soops\/soops.github.io\">soops\/soops.github.io<\/a>\'\r\nsite[\"license\"] = \'<a title=\"view the MIT license\" href=\"http:\/\/github.com\/soops\/soops.github.io\/blob\/master\/license.txt\">MIT<\/a>\'\r\nsite[\"builtWith\"] = \'<span id=\"heart\" class=\"fa fa-heart\"><\/span>\'"
  }, {
    language: "CSharp",
    code: "using System;\r\nusing System.Collections.Generic;\r\n \r\npublic class EthanArterberry\r\n{\r\n    public static void Main()\r\n    {\r\n        Dictionary<string, string> site = new Dictionary<string, string>();\r\n        site.Add(\"author\", \"Ethan Arterberry\");\r\n        site.Add(\"sourceCode\", \"<a title=\"view the source code of this website\" href=\"http:\/\/github.com\/soops\/soops.github.io\">soops\/soops.github.io<\/a>\");\r\n        site.Add(\"license\", \"<a title=\"view the MIT license\" href=\"http:\/\/github.com\/soops\/soops.github.io\/blob\/master\/license.txt\">MIT<\/a>\");\r\n        site.Add(\"madeWith\", \"<span id=\"heart\" class=\"fa fa-heart\"><\/span>\");\r\n    }\r\n}"
  }];

  var arrayIndex = Math.floor(Math.random() * codes.length)
  $("#code").html(codes[arrayIndex].code).attr("class", codes[arrayIndex].language)

  // highlight
  hljs.highlightBlock(document.getElementById("code"))

  setInterval(function() {
    var arrayIndex = Math.floor(Math.random() * codes.length)
    $("#code").html(codes[arrayIndex].code).attr("class", codes[arrayIndex].language)

    // highlight
    hljs.highlightBlock(document.getElementById("code"))
  }, 20000);
};