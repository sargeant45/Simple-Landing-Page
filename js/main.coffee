window.onload = ->
  # email obfuscator
  obfuscated = [5, 20, 8, 1, 14, 1, 18, 20, 5, 18, 2, 5, 18, 18, 25, "@", 7, 13, 1, 9, 12, ".", 3, 15, 13]
  numberletters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
  email = []

  for item in obfuscated
    if !isNaN(item)
      email.push numberletters[item - 1]
    else
      email.push item
    console?.log item

  $("#email").attr("href", "mailto:#{email.join("")}")
