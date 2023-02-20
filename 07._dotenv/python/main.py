from dotenv import load_dotenv, dotenv_values

dotenv_values = dotenv_values()
print(dotenv_values.get("MY_VARIABLE"))

load_dotenv()
import os
print(os.getenv("MY_VARIABLE"))