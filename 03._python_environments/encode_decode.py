randString = "This is a random string"

# Encode the string
utf8Str = randString.encode('utf-8')
asciiStr = randString.encode("ascii")

print("utf-8 String: ", utf8Str)
print("ascii String: ", asciiStr)
